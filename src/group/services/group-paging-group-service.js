import angular from 'angular'

angular.module('odin.group').factory('GroupPagingGroupService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/paging')

  var service = {
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy,
    status: status
  }
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function store(object) {
    return $http.post(url(), object).then(function(response) {
      return response.data
    })
  }

  function show(serviceUserId) {
    return $http
      .get(url(), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }

  function status(instance) {
    return $http
      .put(url('status'), { instances: [instance] })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceUserId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }

  function destroy(serviceUserId) {
    return $http
      .delete(url(), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }
}
