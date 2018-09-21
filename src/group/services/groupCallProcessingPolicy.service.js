;(function() {
  angular
    .module('odin.common')
    .factory('GroupCallProcessingPolicyService', Service)

  function Service($http, Route) {
    var url = Route.api2('services', 'groups', 'callprocessingpolicy')
    var service = { show: show, update: update }
    service.options = {
      clidPolicy: ['Use DN', 'Use Configurable CLID', 'Use Group CLID'],
      enterpriseCallsCLIDPolicy: [
        'Use Extension',
        'Use Location Code plus Extension',
        'Use External Calls Policy'
      ],
      groupCallsCLIDPolicy: [
        'Use Extension',
        'Use Location Code plus Extension',
        'Use External Calls Policy'
      ],
      emergencyClidPolicy: ['Use DN', 'Use Configurable CLID', 'Use Group CLID']
    }

    return service

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId
          }
        })
        .then(function(response) {
          return response.data
        })
    }
    function update(serviceProviderId, groupId, obj) {
      obj = _.assign(
        {
          serviceProviderId: serviceProviderId,
          groupId: groupId
        },
        obj
      )
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
