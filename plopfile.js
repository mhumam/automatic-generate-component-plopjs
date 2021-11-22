function capitalize(str) {
    return str.charAt(0)?.toUpperCase() + str?.slice(1);
}

module.exports = plop => {
    /** helper plop js */
    plop.setHelper('parseFolderName', function (text) {
        return text?.replace(/\s+/g, '-')?.toLowerCase();
    });
    plop.setHelper('parseComponentName', function (text) {
        return text.split(' ').map(capitalize).join('');
    });
    plop.setHelper('formatTitle', function (text) {
        return text?.split(' ')?.map(capitalize)?.join(' ');
    });
    plop.setHelper('generateUrl', function (text) {
        return text?.replace(/\s+/g, '-')?.toLowerCase();
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
                message: 'What is your page name?'
            },
            {
                type: 'input',
                name: 'accessCode',
                message: 'What is your page access code?'
            },
        ],
        actions: [
            /* generate page */
            {
                type: 'add',
                path: 'src/pages/{{parseFolderName pageName}}/index.js',
                templateFile: 'plop-templates/create-page/page/index.js',
            },
            {
                type: 'add',
                path: 'src/pages/{{parseFolderName pageName}}/form.js',
                templateFile: 'plop-templates/create-page/page/form.js',
            },
            {
                type: 'add',
                path: 'src/pages/{{parseFolderName pageName}}/detail.js',
                templateFile: 'plop-templates/create-page/page/detail.js',
            },
            {
                type: 'add',
                path: 'src/config/Route.js',
                templateFile: 'plop-templates/create-page/routes/index.js',
            },
            /* generate route config */
            {
                type: 'append',
                path: 'src/config/Route.js',
                pattern: `/* PAGE COMPONENT LIST */`,
                template: `const {{parseComponentName pageName}} = React.lazy(() => import('page/{{parseFolderName pageName}}'));`,
            },
            {
                type: 'append',
                path: 'src/config/Route.js',
                pattern: `/* PAGE COMPONENT LIST */`,
                template: `const {{parseComponentName pageName}}Form = React.lazy(() => import('page/{{parseFolderName pageName}}/create'));`,
            },
            {
                type: 'append',
                path: 'src/config/Route.js',
                pattern: `/* PRIVATE ROUTE LIST */`,
                template: `{ exact: true, path: '/{{generateUrl pageName}}', name: '{{formatTitle pageName}} List', component: {{parseComponentName pageName}}, access: '{{accessCode}}', action: 'read' },`,
            },
            {
                type: 'append',
                path: 'src/config/Route.js',
                pattern: `/* PRIVATE ROUTE LIST */`,
                template: `{ exact: true, path: '/{{generateUrl pageName}}/create', name: '{{formatTitle pageName}} Create', component: {{parseComponentName pageName}}Form, access: '{{accessCode}}', action: 'create' },`,
            }
        ]
    });
};