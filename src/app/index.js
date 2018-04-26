;(function() {
  var moduleName = 'odin.app'
  var moduleID = 'pbs-app'

  angular.module(moduleName, [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'angular-jwt',
    'chart.js',
    'odin.config',
    'odin.common',
    'odin.branding',
    'odin.bulk',
    'odin.events',
    'odin.group',
    'odin.provisioning',
    'odin.serviceProvider',
    'odin.settings',
    'odin.system',
    'odin.tasks',
    'odin.user',
    'odin.vdm',
    'odin.UI'
  ])

  function locationConfig($locationProvider) {
    $locationProvider.hashPrefix('!')
  }

  function httpSyncConfig($httpProvider) {
    $httpProvider.useApplyAsync(true)
  }

  function xmlHttpInterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push(function() {
      return {
        request: function(config) {
          config.headers['x-requested-with'] = 'XMLHttpRequest'
          return config
        }
      }
    })
  }

  // Make the delete headers correct
  function deleteHttpConfig($httpProvider) {
    $httpProvider.defaults.headers.delete = {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  // Intercept 401/402/403 errors
  function authInterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push([
      '$q',
      'Route',
      'Session',
      function($q, Route, Session) {
        return {
          responseError: function(response) {
            var status = response.status
            // If a 401 or 403 from API remove local JWT Token
            if (status === 401 || status === 402 || status === 403) {
              return Session.clear().then(function() {
                Route.login()
                return $q.reject(response)
              })
            }
            // Pass through the rejection
            return $q.reject(response)
          }
        }
      }
    ])
  }

  // Add JWT Tokens to API requests
  function jwtInterceptorConfig($httpProvider, jwtOptionsProvider, APP) {
    // Set whiteListedDomains based on APP.apiURL
    var whiteListedDomains = []
    var parser = document.createElement('a')
    parser.href = APP.apiURL
    if (parser.hostname) {
      whiteListedDomains.push(parser.hostname)
    }
    jwtOptionsProvider.config({
      whiteListedDomains: whiteListedDomains,
      tokenGetter: [
        '$http',
        'options',
        'Session',
        function($http, options, Session) {
          var url = (options && options.url) || ''
          // Skip if we are requesting a templateCache page
          if (url.substr(url.length - 5) === '.html') return null
          // return the token from the session
          return Session.data('token')
        }
      ]
    })
    $httpProvider.interceptors.push('jwtInterceptor')
  }

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        template: '',
        controller: function(Route) {
          Route.dashboard()
        },
        resolve: {
          session: function(Session) {
            return Session.load()
          }
        }
      })
      .when('/account', {
        template: '<my-account></my-account>'
      })
      .when('/notfound', {
        templateUrl: 'app/layout/notfound.tpl.html'
      })
      .when('/login', {
        template: '<pbs-login></pbs-login>'
      })
      .when('/sso', {
        template: '<pbs-sso></pbs-sso>'
      })
      .otherwise({
        templateUrl: 'app/layout/notfound.tpl.html'
      })
  }

  // inject pageTitle into rootScope
  function addTemplateListener($rootScope, Template) {
    $rootScope.$on('Template:updated', function() {
      $rootScope.pageTitle = Template.data('pageTitle') || 'ODiN'
    })
  }

  function loaders($q, Module, Template) {
    return $q.all([Template.load(), Module.load()])
  }

  function clearCache(CacheFactory) {
    CacheFactory.clearAll()
  }

  // bootstrap angular application
  function bootstrap() {
    angular
      .module(moduleName)
      .config(locationConfig)
      .config(httpSyncConfig)
      .config(deleteHttpConfig)
      .config(xmlHttpInterceptorConfig)
      .config(authInterceptorConfig)
      .config(jwtInterceptorConfig)
      .config(routeConfig)
      .run(clearCache)
      .run(loaders)
      .run(addTemplateListener)

    angular.element(document.getElementById(moduleID)).ready(function() {
      angular.bootstrap(document, [moduleName])
    })
  }

  bootstrap()
})()
