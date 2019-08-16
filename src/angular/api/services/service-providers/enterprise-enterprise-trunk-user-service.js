import angular from 'angular'

angular.module('odin.api').factory('EnterpriseEnterpriseTrunkUserService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = {
    index: index,
    store: store,
    update: update,
    destroy: destroy
  }
  var url = Route.api('/service-providers/enterprise-trunks/users')
  return service

  function index(serviceProviderId, enterpriseTrunkName) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          enterpriseTrunkName: enterpriseTrunkName
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function store(serviceProviderId, enterpriseTrunkName, object) {
    return $http.post(url(), object).then(function(response) {
      return response.data
    })
  }

  function update(serviceProviderId, enterpriseTrunkName, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }

  function destroy(serviceProviderId, enterpriseTrunkName) {
    return $http
      .delete(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          enterpriseTrunkName: enterpriseTrunkName
        }
      })
      .then(function(response) {
        return response.data
      })
  }
}
