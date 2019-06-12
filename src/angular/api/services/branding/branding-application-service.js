import angular from 'angular'
import { loadApplications } from '@/store/ui-applications'

angular
  .module('odin.api')
  .factory('BrandingApplicationService', BrandingApplicationService)

BrandingApplicationService.$inject = [
  '$http',
  'Route',
  '$rootScope',
  '$ngRedux'
]
function BrandingApplicationService($http, Route, $rootScope, $ngRedux) {
  var service = { index, store, show, update, destroy }
  var url = Route.api('/branding/applications')

  return service

  function index(hostnameId) {
    return $http
      .get(url(), { params: { hostnameId } })
      .then(response => response.data)
  }

  function store(application) {
    return $http.post(url(), application).then(response => {
      $ngRedux.dispatch(loadApplications())
      $rootScope.$emit('BrandingApplicationService:updated')
      return response.data
    })
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(response => response.data)
  }

  function update(application) {
    return $http.put(url(), application).then(response => {
      $ngRedux.dispatch(loadApplications())
      $rootScope.$emit('BrandingApplicationService:updated')
      return response.data
    })
  }

  function destroy(id) {
    return $http.delete(url(), { params: { id } }).then(response => {
      $ngRedux.dispatch(loadApplications())
      $rootScope.$emit('BrandingApplicationService:updated')
      return response.data
    })
  }
}
