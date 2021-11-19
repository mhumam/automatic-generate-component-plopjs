module.exports = plop => {
    plop.setGenerator('component', {
        description: 'Create a component',
        // User input prompts provided as arguments to the template
        prompts: [
            {
                // Raw text input
                type: 'input',
                // Variable name for this input
                name: 'name',
                // Prompt to display on command line
                message: 'What is your component name?'
            },
        ],
        actions: [
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: 'src/components/{{pascalCase name}}.js',
                // Handlebars template used to generate content of new file
                templateFile: 'plop-templates/Component.js.hbs',
            },
        ],
    });

    plop.setGenerator('reduxAuth', {
        description: 'Create a redux auth',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?'
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/store/index.js',
                templateFile: 'plop-templates/redux-auth/store/index.js',
            },
            /* Actions Redux */
            {
                type: 'add',
                path: 'src/store/actions/authentication.js',
                templateFile: 'plop-templates/redux-auth/store/actions/authentication.js',
            },
            /* Epics Redux */
            {
                type: 'add',
                path: 'src/store/epics/epicAuthentication.js',
                templateFile: 'plop-templates/redux-auth/store/epics/epicAuthentication.js',
            },
            {
                type: 'add',
                path: 'src/store/epics/index.js',
                templateFile: 'plop-templates/redux-auth/store/epics/index.js',
            },
            /* Reducers Redux */
            {
                type: 'add',
                path: 'src/store/reducers/index.js',
                templateFile: 'plop-templates/redux-auth/store/reducers/index.js',
            },
            {
                type: 'add',
                path: 'src/store/reducers/auth.js',
                templateFile: 'plop-templates/redux-auth/store/reducers/auth.js',
            },
            {
                type: 'add',
                path: 'src/components/append.js',
                templateFile: 'plop-templates/injectable-index.js.hbs',
                skipIfExists: true,
            },
            {
                type: 'append',
                path: 'src/components/append.js',
                pattern: `/* IMPORT LIST */`,
                template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
            },
        ],
    });


    plop.setGenerator('page', {
        description: 'Create a page',
        prompts: [
            {
                type: 'input',
                name: 'pageName',
                message: 'What is your page name?',
                // validate: requireField('pageName')
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pages/{{pageName}}/index.js',
                templateFile: 'plop-templates/create-page/page/index.js',
            },
            {
                type: 'add',
                path: 'src/pages/{{pageName}}/form.js',
                templateFile: 'plop-templates/create-page/page/form.js',
            },
            {
                type: 'add',
                path: 'src/pages/{{pageName}}/detail.js',
                templateFile: 'plop-templates/create-page/page/detail.js',
            },
        ],
    });
};