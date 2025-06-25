import type { DocumentNode } from 'graphql';

export const getGqlString = (doc: DocumentNode) => {
  if (doc.loc) return doc.loc.source.body;

  return '';
};
