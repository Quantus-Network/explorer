export const isInstanceOf = <InstanceOf extends NonNullable<unknown>>(
  type: unknown,
  property: keyof InstanceOf
): type is InstanceOf => {
  return (type as InstanceOf)?.[property] !== undefined;
};
