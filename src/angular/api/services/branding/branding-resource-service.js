import angular from 'angular'
import { loadResources } from '@/store/ui-resources'

angular
  .module('odin.api')
  .factory('BrandingResourceService', BrandingResourceService)

BrandingResourceService.$inject = ['$http', 'Route', '$rootScope', '$ngRedux']
function BrandingResourceService($http, Route, $rootScope, $ngRedux) {
  var service = { index, store, show, update, destroy, hostname }
  var url = Route.api('/branding/resources')

  return service

  function index(hostnameId) {
    return $http
      .get(url(), { params: { hostnameId } })
      .then(response => response.data)
  }

  function store(resource) {
    return $http.post(url(), resource).then(response => {
      $ngRedux.dispatch(loadResources())
      $rootScope.$emit('BrandingResourceService:updated')
      return response.data
    })
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(response => response.data)
  }

  function update(resource) {
    return $http.put(url(), resource).then(response => {
      $ngRedux.dispatch(loadResources())
      $rootScope.$emit('BrandingResourceService:updated')
      return response.data
    })
  }

  function destroy(id) {
    return $http.delete(url(), { params: { id } }).then(response => {
      $ngRedux.dispatch(loadResources())
      $rootScope.$emit('BrandingResourceService:updated')
      return response.data
    })
  }

  function hostname(hostname) {
    return $http
      .get(url() + '/hostname', { params: { hostname } })
      .then(response => response.data)
  }
}
