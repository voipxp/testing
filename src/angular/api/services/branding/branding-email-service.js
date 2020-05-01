import angular from 'angular'
import { loadEmail } from '@/store/ui-email'

angular
  .module('odin.api')
  .factory('BrandingEmailService', BrandingEmailService)

BrandingEmailService.$inject = [
  '$http',
  'Route',
  '$rootScope',
  '$ngRedux'
]
function BrandingEmailService($http, Route, $rootScope, $ngRedux) {
  var service = { index, store, show, update, destroy }
  var url = Route.api('/branding/emails')

  return service

  function index(hostnameId) {
    return $http
      .get(url(), { params: { hostnameId } })
      .then(response => response.data)
  }

  function store(email) {
    return $http.post(url(), email).then(response => {
      $ngRedux.dispatch(loadEmail())
      $rootScope.$emit('BrandingEmailService:updated')
      return response.data
    })
  }

  function show(id) {
console.log('email serverice hostnameId', id);
    return $http.get(url(), { params: { id } }).then(response => response.data)
  }

  function update(email) {
    return $http.put(url(), email).then(response => {
      $ngRedux.dispatch(loadEmail())
      $rootScope.$emit('BrandingEmailService:updated')
      return response.data
    })
  }

  function destroy(id) {
    return $http.delete(url(), { params: { id } }).then(response => {
      $ngRedux.dispatch(loadEmail())
      $rootScope.$emit('BrandingEmailService:updated')
      return response.data
    })
  }
}
