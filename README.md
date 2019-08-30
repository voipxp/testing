# odin-web

## Usage

### Install Dependencies

```
yarn
```

### Start in Dev Mode

This will bundle all the files, open up a live instance in the browser, and watch for changes. When a change is detected, it will be re-bundled and the browser reloaded automatically.

```
yarn start
```

#### Dev Environmental variables

You can create a .env file with the following variables to point the API and EVENT calls to a local or remote instance.

For example, if you are developing locally and you have the API server listening on port 8000 and the event server on port 4000 you can set API_URL=http://localhost:8000 and EVENT_URL=http://localhost:4000.

If you are developing locally, but you want to point the API calls to a remote API instance, you can set API_URL=https://someurl.com. This will send all the API and EVENT calls to the remote **odin** instance at someurl.com.

```
#API_URL=http://localhost:8000
#EVENT_URL=http://localhost:4000
```

### Bundle for Production

```
yarn build
```

### Build for Docker

```
docker build -t odin-web .
```

## React

The application is running React with previous angular code inside it being render via the AngularComponent (**src/components/angular-component**). New components _should_ be written in React.

The preference for react components is to use functional components and utilize hooks (useState, useReducer) for local state management and lifecycle methods (useEffect). For global state management we are currently utilizing Redux.

### Directory structure

The current directory structure is as follows

```
├── angular        # stores angular code
├── api            # the API library (eventually extract to module)
├── components     # view components
├── store          # redux related files
└── utils          # libraries and helper functions
```

### Naming Convention

All components should be named with the left-most part being the most generic and increasing specificity on the right. Prefix the component or service with the BW higherarchy if it applies to that component. You are free to make sub-directories in order to combine related components. All files should be **kebab-case** to avoid capitalization issues with OSX and Windows file systems. For example, a component named **GroupAutoAttendants** should reside in a file named **group-auto-attendants.js**.

eg:

```
# BAD
components/AutoAttendant.js
components/create-hunt-group.js
components/details-auto-attendant.js
components/hunt-group.js

# GOOD
components/group-auto-attendant.js
components/group-auto-attendant-details.js
components/group-hunt-group.js
components/group-hunt-group-create.js

# ALSO GOOD
components/auto-attendant/group-auto-attendant.js
components/auto-attendant/group-auto-attendant-details.js
components/hunt-group/group-hunt-group.js
components/hunt-group/group-hunt-group-create.js
```

### Redux

We are using redux for global state management. In general, store temporary or ephemeral data locally in the component. For example, this may include form state, search results, error messages, etc. Anything else that can be shared and re-used in other components _should_ be stored in the redux store. The angular module **\$ngRedux** can be utilized to share state and dispatch actions with the angular components.

There are several helpers from the [redux-starter-kit](https://redux-starter-kit.js.org/) package that we are using for our redux store. Check out the documentation there to get an understanding of **createAction** and **createReducer**. These are simple helpers that remove a lot of the typical boilerplate associated with creating a redux store.

For connecting the store to a component, we are using [react-redux](https://react-redux.js.org/next/api/hooks).

Below is an example of how one could use the **useAlerts** hook that is located in **src/store/alerts**.

```
const Example = () => {
  const { alerts, alertRemove } = useAlerts()
  return (
    <h1>Alerts</h1>
    <ul>
    {alerts.map(alert => (
      <li>{alert.name} <button onClick={() => alertRemove(alert)}></li>
    ))}
    </ul>
  )
}
```

### Documentation

Re-usable components should be documented using [storybook](https://storybook.js.org/). Examples exist in the **src/components/ui** directory. The documentation for a component should be included next to the component in a file with the same name as the component and a suffix of **.stories.(js|mdx)**.

You may run storybook in dev mode and it will hot-reload the documentation as you edit the components. This is a nice way to develop a UI component in isolation before you plug it into the app.

```
yarn storybook
```

You can also build a static version of the documentation.

```
yarn build-storybook
```

By default the files will be found in **./storybook-static**. You can view the files by running

```
yarn docs
```

## Angular

All the Angular code resides in the subdirectory **src/angular**. The intention is to eventually replace all that code with a react version. However, the general rule of thumb is:

- If simply injecting \$ngRedux into the component would solve the problem, then do that.
- If < 30% of the file has to be changed, then patch it and move on.
- If > 30% of the file has to be changed, then rewrite the component in react.

### Angular Modules

- All API related services reside in the **odin.api** module.
- Any top-level UI features not specific to broadworks (eg: bulma related components such as pbs-block) are located in the **odin.ui** module.
- Anything such as a helper component that can be re-used in multiple places resides in **odin.common**
- Anything else should be within the module related to the broadworks higherarchy (user, group, ...) or the particular functionality of those components. Feel free to break them out into sub-components if it gets cluttered. (eg: **odin.group**, **odin.group.trunking**)

### Naming Convention

All components and services should be named with the left-most part being the most generic and increasing specificity on the right. Prefix the component or service with the BW higherarchy if it applies to that component.

eg:

```
# BAD
components/auto-attendant
components/create-hunt-group
components/details-auto-attendant
components/hunt-group

# GOOD
components/group-auto-attendant
components/group-auto-attendant-details
components/group-hunt-group
components/group-hunt-group-create
```

### Module Layout

A module should be in its own directory with a subdirectory for the components, services, directives, filters, etc.. The index.js file will be the primary entrypoint for the module. An example directory structure is below.

Note: Components and Services file names should be the same as they are registered with angular, but converted to **kebab-case**. See the examples below, where the component **pbsCancel** resides in the subdirectory **pbs-cancel**.

```
.
├── components
│   ├── index.js
│   ├── pbs-cancel
│   │   └── index.js
│   ├── pbs-component
│   │   └── index.js
│   ├── pbs-confirm-modal
│   │   ├── index.html
│   │   └── index.js
│   ├── pbs-data-table
│   │   ├── index.css
│   │   ├── index.html
│   │   └── index.js
│   ├── pbs-dropdown-button
│   │   ├── index.html
│   │   └── index.js
│   ├── pbs-modal
│   │   ├── index.css
│   │   ├── index.html
│   │   └── index.js
│   ├── pbs-notifications
│   │   ├── index.css
│   │   ├── index.html
│   │   └── index.js
│   ├── pbs-spinner
│   │   ├── index.css
│   │   ├── index.html
│   │   └── index.js
│   └── pbs-spinner-modal
│       ├── index.html
│       └── index.js
├── index.js
├── module.js
└── services
    ├── alert.js
    ├── confirm.js
    ├── index.js
    ├── modal.js
    ├── notification.js
    └── spinner.js
```

### index.js

To create a module make a subdirectory with an index.js file that imports the module, components, directives, services, etc.. Each component and services directory should have an index.js that loads the corresponding components, directives, services, so you can simply import the directory name.

The module import **MUST** be first.

```
import './module'
import './services'
import './components'
```

### module.js

This file is in charge of initializing and registering the angular module with any dependencies, configurations, routes, run blocks, etc... Any css that needs to be imported for the module can be directly imported here.

```
import angular from 'angular'
import routes from './routes'
import 'some-angular-module-from-node-modules'
import './index.css'

angular
  .module('odin.module', ['angular.some-module'])
```

### routes.js

If the module contains routes, those should be a default export which is just an array of routes. They may include an acl and module parameter that indicates what loginType and Module.read permissions are required for the route.

```
export default [
  {
    path: '/groups/:serviceProviderId/:groupId',
    component: 'groupDashboard',
    acl: 'Group',
    module: 'SomeModule'
  }
]
```

### component/index.js

This file requires all the components that will be used in the module.

```
import './this-component'
import './that-component'
```

### services/index.js

This file requires all the services that will be used in the module.

```
import './this-service'
import './that-service'
```

### Component Structure

Components register themselves with angular. Any CSS created for this component can be imported directly. Templates can be imported from a file or created as a constant using template literals (``). Do not use templateUrl.

The directory the component resides in should be the same name that the component is registered with angular but converted to **kebab-case**. For example, **myComponent** should be located in **my-component/index.js** or **my-component.js** if not in a subdirectory.

Be sure to inject the DI dependencies using **\$inject**

```
import angular from 'angular'
import template from './index.html'
import './index.css'

// register component with angular
angular.module('odin.module').component('thisComponent', { template, controller })

controller.$inject = ['SomeDI']
function controller(SomeDI) {
  const ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    console.log(SomeDI.hello)
  }
}
```

### Service Structure

Services register themselves with angular. The file name should be the same name that is registered with angular but converted to **kebab-case**. For example, **MyService** should be located in **my-service.js**.

Be sure to inject the DI dependencies using \$inject.

```
import angular from 'angular'
import _ from 'lodash'

angular.module('odin.module').factory('MyService', MyService)

MyService.$inject = ['SomeDI']
function MyService(SomeDI) {
  return {
    hello: SomeDI.hello,
    goodbye: _.get(SomeDI, 'goodbye', 'Adios')
  }
}
```

### Tips

You can use the command-line to generate an index.js file to import all the services or components.

For example, to include all the service files in a directory.

```
for i in $(find . -type f | grep -v index.js | sort | awk -F '.js' '{print $1}'); do
  echo "import '$i'" >> index.js
done
```

That will create an index.js file with something like...

```
import './a-service.js'
import './b-service.js'
import './c-service.js'
```

To include all the component directories that are expected to contain an index.js file within.

```
for i in $(find . -type d | sort | grep -v '^.$'); do
  echo "import '$i'" >> index.js
done
```

That will create an index.js file with something like ...

```
import './a-component'
import './b-component'
```
