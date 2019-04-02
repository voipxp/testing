import angular from 'angular'

angular.module('odin.group').factory('GroupEnterpriseTrunkUserService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = {
    index: index,
    store: store,
    update: update,
    destroy: destroy
  }
  var url = Route.api('/groups/enterprise-trunks/users')
  return service

  function index(serviceProviderId, groupId, enterpriseTrunkName) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          enterpriseTrunkName: enterpriseTrunkName
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function store(serviceProviderId, groupId, enterpriseTrunkName, object) {
    return $http.post(url(), object).then(function(response) {
      return response.data
    })
  }

  function update(serviceProviderId, groupId, enterpriseTrunkName, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }

  function destroy(serviceProviderId, groupId, enterpriseTrunkName) {
    return $http
      .delete(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          enterpriseTrunkName: enterpriseTrunkName
        }
      })
      .then(function(response) {
        return response.data
      })
  }
}
