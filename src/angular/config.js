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
    ($q, Session) => {
      return {
        responseError: async response => {
          const status = response.status
          if (status === -1) {
            await Session.clear
            return $q.reject('Connection Failed')
          }
          // If a 401 or 403 from API remove local JWT Token
          if (status === 401 || status === 402 || status === 403) {
            await Session.clear()
            return $q.reject(response)
          }
          // Pass through the rejection
          return $q.reject(response)
        }
      }
    }
  ])
}

jwtInterceptorConfig.$inject = ['$httpProvider', 'jwtOptionsProvider']
export function jwtInterceptorConfig($httpProvider, jwtOptionsProvider) {
  const domains = new Set()
  domains.add('localhost')
  domains.add(window.location.hostname)
  if (process.env.API_BASE) {
    const a = document.createElement('a')
    a.href = process.env.API_BASE
    domains.add(a.hostname)
  }
  const whiteListedDomains = [...domains]
  jwtOptionsProvider.config({
    whiteListedDomains,
    tokenGetter: [
      'options',
      'Session',
      (options, Session) => {
        const url = (options && options.url) || ''
        // Skip if we are requesting an html page
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
    onExpire: key => console.log('expire', key)
  })
}

idleConfig.$inject = ['IdleProvider', 'TitleProvider']
export function idleConfig(IdleProvider, TitleProvider) {
  IdleProvider.keepalive(false)
  TitleProvider.enabled(false)
}

rootScope.$inject = ['$rootScope']
export function rootScope($rootScope) {
  $rootScope.eventURL = eventURL()
  $rootScope.apiURL = apiURL()
  $rootScope.loginURL = '/login'
  $rootScope.sessionKey = 'odin:session'
}

function getPrefix(port) {
  if (process.env.API_BASE) return process.env.API_BASE
  return port
    ? `${window.location.protocol}//${window.location.hostname}:${port}/`
    : '/'
}

function eventURL() {
  return getPrefix(process.env.EVENT_PORT)
}

function apiURL() {
  return `${getPrefix(process.env.API_PORT)}api/v2`
}
