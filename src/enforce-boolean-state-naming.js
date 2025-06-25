const BOOLEAN_PREFIXES = ['is', 'has', 'can', 'should', 'was', 'will', 'did'];
const booleanPrefixesHuman = BOOLEAN_PREFIXES.join(', ');

const prefixRegex = new RegExp(`^(${BOOLEAN_PREFIXES.join('|')})([A-Z].*)$`);

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: `Enforce useState variable naming with boolean prefix (${booleanPrefixesHuman}) when initialized with a boolean`,
        },
        messages: {
            invalidStateName: `useState variable with boolean initial value must start with a boolean prefix ${booleanPrefixesHuman}`,
            invalidSetterName: 'Setter must match the state name (e.g., setIsVisible for isVisible)',
        },
        schema: [],
    },
    create(context) {
        return {
            VariableDeclaration(node) {
                for (const decl of node.declarations) {
                    const init = decl.init;
                    const id = decl.id;

                    if (!init ||
                        init.type !== 'CallExpression' ||
                        init.callee.name !== 'useState' ||
                        !id ||
                        id.type !== 'ArrayPattern' ||
                        id.elements.length !== 2) {
                        continue;
                    }

                    const [stateVar, setterVar] = id.elements;

                    if (stateVar?.type !== 'Identifier' || setterVar?.type !== 'Identifier') {
                        continue;
                    }

                    const initArg = init.arguments[0];

                    if (!initArg ||
                        initArg.type !== 'Literal' ||
                        typeof initArg.value !== 'boolean') {
                        continue;
                    }

                    const stateName = stateVar.name;
                    const setterName = setterVar.name;

                    const match = stateName.match(prefixRegex);

                    if (!match) {
                        context.report({
                            node: stateVar,
                            messageId: 'invalidStateName',
                        });
                        continue;
                    }

                    const expectedSetter = 'set' + stateName[0].toUpperCase() + stateName.slice(1);

                    if (setterName !== expectedSetter) {
                        context.report({
                            node: setterVar,
                            messageId: 'invalidSetterName',
                        });
                    }
                }
            },
        };
    },
}
