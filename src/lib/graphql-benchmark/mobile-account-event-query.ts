/**
 * Account-event documents shaped like quantus-apps main @ 11e035a3
 * `ChainHistoryService.buildAccountEventsQuery` and
 * `buildScheduledReversibleTransfersQuery`.
 *
 * One aliased `account_event` selection per wallet account, each filtered
 * with `account_id: {_eq}`. Hasura renders `_in` as `= ANY(array)`, which
 * Postgres will not walk as an ordered range on the composite index.
 * `order_by` leads with `account_id` and, for send / receive, the direction
 * column, so the sort matches that index prefix.
 */

export type AccountEventFilter = 'all' | 'send' | 'receive';

/**
 * Wallet sizes past a single account.
 * 2 is a new software wallet (primary account plus its encrypted companion)
 * and the count the SDK test builds. 8 is a larger wallet, enough aliased
 * selections for fan-out cost to show up in the timings.
 */
export const MOBILE_HISTORY_FANOUT_COUNTS = [2, 8] as const;

export const MOBILE_HISTORY_ACCOUNT_SAMPLE = Math.max(
  ...MOBILE_HISTORY_FANOUT_COUNTS
);

const CURSOR_VARIABLES = ', $cursorTimestamp: timestamptz!, $cursorId: String!';
const CURSOR_PREDICATE =
  '{timestamp: {_lte: $cursorTimestamp}}, {_not: {timestamp: {_eq: $cursorTimestamp}, id: {_gte: $cursorId}}}';

function requireAccountCount(accountCount: number) {
  if (!Number.isInteger(accountCount) || accountCount < 1) {
    throw new Error(
      `accountCount must query at least one account, got ${String(accountCount)}`
    );
  }
}

function accountVariables(accountCount: number) {
  requireAccountCount(accountCount);
  return Array.from(
    { length: accountCount },
    (_, index) => `$account${index}: String!`
  ).join(', ');
}

function directionOrder(filter: AccountEventFilter) {
  if (filter === 'send') return '{outgoing: desc}, ';
  if (filter === 'receive') return '{incoming: desc}, ';
  return '';
}

function directionPredicate(filter: AccountEventFilter) {
  if (filter === 'send') return ', {outgoing: {_eq: true}}';
  if (filter === 'receive') return ', {incoming: {_eq: true}}';
  return '';
}

export function accountEventOrder(filter: AccountEventFilter) {
  return `order_by: [{account_id: desc}, ${directionOrder(filter)}{timestamp: desc}, {id: desc}]`;
}

function accountEventDocument(options: {
  operationName: string;
  extraVariables: string;
  filter: AccountEventFilter;
  withCursor: boolean;
  accountCount: number;
  whereClause: (index: number) => string;
  selection: string;
}) {
  const variables = `${accountVariables(options.accountCount)}, $limit: Int!${options.extraVariables}${options.withCursor ? CURSOR_VARIABLES : ''}`;
  const selections = Array.from(
    { length: options.accountCount },
    (_, index) => {
      return `
  events${index}: account_event(limit: $limit, where: ${options.whereClause(index)}, ${accountEventOrder(options.filter)}) {
${options.selection}
  }`;
    }
  ).join('\n');

  return `
query ${options.operationName}(${variables}) {
${selections}
}
`;
}

export function buildAccountEventsQuery(options: {
  filter: AccountEventFilter;
  withCursor: boolean;
  accountCount: number;
  selection: string;
}) {
  const { filter, withCursor, accountCount, selection } = options;
  return accountEventDocument({
    operationName: 'AccountEvents',
    extraVariables: '',
    filter,
    withCursor,
    accountCount,
    selection,
    whereClause: (index) =>
      `{_and: [{account_id: {_eq: $account${index}}}, {scheduled_reversible_transfer_id: {_is_null: true}}${directionPredicate(filter)}${withCursor ? `, ${CURSOR_PREDICATE}` : ''}]}`
  });
}

export function buildScheduledReversibleTransfersQuery(options: {
  filter: AccountEventFilter;
  withCursor: boolean;
  accountCount: number;
  selection: string;
}) {
  const { filter, withCursor, accountCount, selection } = options;
  return accountEventDocument({
    operationName: 'ScheduledReversibleTransfersByAccounts',
    extraVariables: ', $after: timestamptz!',
    filter,
    withCursor,
    accountCount,
    selection,
    whereClause: (index) =>
      `{_and: [{account_id: {_eq: $account${index}}}, {scheduled_reversible_transfer_id: {_is_null: false}}${directionPredicate(filter)}, {scheduledReversibleTransfer: {scheduled_at: {_gt: $after}}}${withCursor ? `, ${CURSOR_PREDICATE}` : ''}]}`
  });
}

/** Variables for one page: `$account0`..`$accountN-1`, `$limit`, optional keyset. */
export function accountEventPageVariables(options: {
  accountIds: readonly string[];
  limit: number;
  cursor?: { timestamp: string; id: string };
}): Record<string, unknown> {
  if (options.accountIds.length < 1) {
    throw new Error('accountIds must not be empty');
  }
  const variables: Record<string, unknown> = {};
  options.accountIds.forEach((id, index) => {
    variables[`account${index}`] = id;
  });
  variables.limit = options.limit;
  if (options.cursor) {
    variables.cursorTimestamp = options.cursor.timestamp;
    variables.cursorId = options.cursor.id;
  }
  return variables;
}
