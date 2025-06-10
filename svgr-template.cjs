const template = (variables, { tpl }) => {
  // eslint-disable-next-line no-param-reassign
  variables = {
    ...variables,
    componentName: variables.componentName.replace('Svg', ''),
    exports: variables.exports.map((ex) => ({
      ...ex,
      declaration: {
        ...ex.declaration,
        name: ex.declaration.name.replace('Svg', '')
      }
    }))
  };

  return tpl`
${variables.imports};

${variables.interfaces};

export const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);
`;
};

module.exports = template;
