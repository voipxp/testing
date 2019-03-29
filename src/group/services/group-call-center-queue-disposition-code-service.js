import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupCallCenterQueueDispositionCodeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/disposition-codes/codes')
  var service = {
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy
  }

  return service

  function index(serviceUserId) {
    return $http
      .get(url(), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }

  function store(serviceUserId, obj) {
    return $http.post(url(), obj).then(function(response) {
      return response.data
    })
  }

  function show(serviceUserId, code) {
    return $http
      .get(url(), { params: { serviceUserId: serviceUserId, code: code } })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceUserId, code, obj) {
    return $http.put(url(), obj).then(function(response) {
      return response.data
    })
  }

  function destroy(serviceUserId, code) {
    return $http
      .delete(url(), { params: { serviceUserId: serviceUserId, code: code } })
      .then(function(response) {
        return response.data
      })
  }
}
