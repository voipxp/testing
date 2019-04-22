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

## Bundles

The bundler (parcel) starts at index.html and then walks all import statements, href, src, etc... If a file is to be known to angular, it must be imported at some point. Any 3rd party deps (such as lodash) need to be included at the top of the file that will use it. The bundler is smart enough to know not to require it twice.

### Angular Modules

- All API related services should reside in the **odin.api** module.
- Any top-level UI features not specific to broadworks (eg: bulma related components such as pbs-block) should be in the **odin.ui** module.
- Anything such as a helper component that could be re-used in multiple places should reside in **odin.common**
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

If the module contains routes, those should be a default export which is just an array of routes.

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

For example, to include all the service files.

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

To include all the component directories

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
