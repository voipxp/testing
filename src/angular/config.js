import { store } from '@/store'

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
            return $q.reject(new Error('Connection Failed'))
          }
          // If a 401 or 403 from API remove local JWT Token
          if (status === 401 || status === 403) {
            await Session.clear()
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
  if (process.env.API_URL) {
    const a = document.createElement('a')
    a.href = process.env.API_URL
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

// idleConfig.$inject = ['IdleProvider', 'TitleProvider']
// export function idleConfig(IdleProvider, TitleProvider) {
//   IdleProvider.keepalive(false)
//   TitleProvider.enabled(false)
// }

rootScope.$inject = ['$rootScope']
export function rootScope($rootScope) {
  $rootScope.apiURL = '/api/v2'
  $rootScope.sessionKey = 'odin:session'
}

ngRedux.$inject = ['$ngReduxProvider']
export function ngRedux($ngReduxProvider) {
  $ngReduxProvider.provideStore(store)
}

reduxDevTools.$inject = ['$ngRedux', '$timeout', '$rootScope']
export function reduxDevTools($ngRedux, $timeout, $rootScope) {
  $ngRedux.subscribe(() => $timeout(() => $rootScope.$apply(() => {}), 100))
}
