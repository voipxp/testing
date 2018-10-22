;(function() {
  angular
    .module('odin.group')
    .factory('GroupIncomingCallingPlanService', Service)

  function Service($http, Route) {
    var service = { show, update }
    var url = Route.api2('/groups/calling-plans/incoming')
    service.options = {
      allowFromOutsideGroup: [
        'Allow',
        'Allow Only If Redirected From Another User',
        'Disallow'
      ]
    }
    return service

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function update(serviceProviderId, groupId, obj) {
      return $http.put(url(), obj).then(res => res.data)
    }
  }
})()
