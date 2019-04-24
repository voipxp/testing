import angular from 'angular'
angular.module('odin.api').factory('GroupNumberService', GroupNumberService)

GroupNumberService.$inject = ['$http', 'Route']
function GroupNumberService($http, Route) {
  var url = Route.api('/groups/dns')
  var service = {
    index: index,
    assign: assign,
    unassign: unassign,
    update: update
  }
  return service

  // activated, summary, default
  function index(serviceProviderId, groupId, q) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, q } })
      .then(response => response.data.dns)
  }

  function assign(serviceProviderId, groupId, dns) {
    return $http
      .post(url(), { serviceProviderId, groupId, dns })
      .then(response => response.data)
  }

  function unassign(serviceProviderId, groupId, dns) {
    return $http
      .delete(url(), { data: { serviceProviderId, groupId, dns } })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, dns) {
    return $http
      .put(url(), { serviceProviderId, groupId, dns })
      .then(response => response.data)
  }
}
