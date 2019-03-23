import angular from 'angular'

locationConfig.$inject = ['$locationProvider']
export function locationConfig($locationProvider) {
  $locationProvider.hashPrefix('!')
}

httpSyncConfig.$inject = ['$httpProvider']
export function httpSyncConfig($httpProvider) {
  $httpProvider.useApplyAsync(true)
}

deleteHttpConfig.$inject = ['$httpProvider']
export function deleteHttpConfig($httpProvider) {
  $httpProvider.defaults.headers.delete = {
    'Content-Type': 'application/json;charset=utf-8'
  }
}

authInterceptorConfig.$inject = ['$httpProvider']
export function authInterceptorConfig($httpProvider) {
  $httpProvider.interceptors.push([
    '$q',
    'Session',
    function($q, Session) {
      return {
        responseError: function(response) {
          const status = response.status
          if (status === -1) {
            return Session.clear().then(function() {
              return $q.reject('Connection Failed')
            })
          }
          // If a 401 or 403 from API remove local JWT Token
          if (status === 401 || status === 402 || status === 403) {
            return Session.clear().then(function() {
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

jwtInterceptorConfig.$inject = ['$httpProvider', 'jwtOptionsProvider', 'APP']
export function jwtInterceptorConfig($httpProvider, jwtOptionsProvider, APP) {
  // Set whiteListedDomains based on APP.apiURL
  const whiteListedDomains = []
  const parser = document.createElement('a')
  parser.href = APP.apiURL
  if (parser.hostname) {
    whiteListedDomains.push(parser.hostname)
  }
  jwtOptionsProvider.config({
    whiteListedDomains: whiteListedDomains,
    tokenGetter: [
      'options',
      'Session',
      function(options, Session) {
        const url = (options && options.url) || ''
        // Skip if we are requesting a templateCache page
        if (url.substr(url.length - 5) === '.html') return null
        // return the token from the session
        return Session.data('token')
      }
    ]
  })
  $httpProvider.interceptors.push('jwtInterceptor')
}

cacheFactoryConfig.$inject = ['CacheFactoryProvider']
export function cacheFactoryConfig(CacheFactoryProvider) {
  angular.extend(CacheFactoryProvider.defaults, {
    maxAge: 5 * 60 * 1000,
    deleteOnExpire: 'passive',
    onExpire: function(key) {
      console.log('expire', key)
    }
  })
}

idleConfig.$inject = ['IdleProvider', 'TitleProvider']
export function idleConfig(IdleProvider, TitleProvider) {
  IdleProvider.keepalive(false)
  TitleProvider.enabled(false)
}

run.$inject = ['$rootScope']
export function run($rootScope) {
  $rootScope.apiURL = process.env.API_URL || '/'
}

export const app = {
  apiURL: `${process.env.API_URL || ''}/api/v2`,
  eventURL: process.env.EVENT_URL || process.env.API_URL || '/',
  loginURL: '/login',
  sessionKey: 'odin:session'
}
