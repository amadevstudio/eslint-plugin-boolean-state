const enforceBooleanStateNaming = require('./src/enforce-boolean-state-naming');

module.exports = {
    rules: {
        'enforce-boolean-state-naming': enforceBooleanStateNaming,
    },
    configs: {
        recommended: {
            rules: {
                'boolean-state/enforce-boolean-state-naming': 'error',
            },
        },
    },
};
