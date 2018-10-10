;(function() {
  angular
    .module('odin.group')
    .factory('GroupEnterpriseTrunkUserService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      store: store,
      update: update,
      destroy: destroy
    }
    var url = Route.api2('/groups/enterprise-trunks/users')
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

    function store(serviceProviderId, groupId, enterpriseTrunkName, obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function update(serviceProviderId, groupId, enterpriseTrunkName, obj) {
      return $http.put(url(), obj).then(function(response) {
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
})()
