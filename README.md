# odin-web-2

## Usage

### Install

```
yarn
```

### Start in Dev Mode

```
yarn dev
```

### Bundle for Production

```
yarn build
```

## Bundles

The bundler (parcel) starts at index.html and then walks all import statements, href, src, etc... If a file is to be known to angular, it must be imported at some point. Any 3rd party deps (such as lodash) need to be included at the top of the file that will use it. The bundler is smart enough to know not to require it twice.

### Module Layout

A module should be in its own directory with a subdirectory for the components, services, etc.. The index.js file will be the primary entrypoint for the module. An example directory structure is below.

Note: Components and Services should be named the same as they are registered with angular, but converted to **kebab-case**. See the examples below, where the component **pbsCancel** resides in the subdirectory **pbs-cancel**.

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

To create a module make a subdirectory with an index.js file that initializes the module, components, directives, services, etc.. Each component and services directory may also have an index.js that loads the corresponding components, directives, services.

The module import **MUST** be first.

```
import './module'
import './services'
import './components'
```

### module.js

This file is in charge of initializing the module with any dependencies, configurations, routes, run blocks, etc... Any css that needs to be imported for the module can be directly imported.

```
import angular from 'angular'
import routes from './routes'
import 'angular-somedep'
import 'angular-somedep/css/style.css'

angular.module('odin.module', ['angular.somedep']).config(routes)
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

The directory the component is in should be the same name that is registered with angular but converted to **kebab-case**. For example, **myComponent** should be located in **my-component/index.js** or **my-component.js** if not in a subdirectory.

Be sure to inject the DI dependencies.

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

Be sure to inject the DI dependencies.

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

You can use the command-line to generate includes in services directories. For example, this will find all the files in the directory and add them to an index.js file

```
for i in $(find . -type f | grep -v index.js | sort); do
  echo "import '$i'" >> index.js
done
```

This will render a file with something like...

```
import './a-service.js'
import './b-service.js'
import './c-service.js'
```
