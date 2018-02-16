;(function() {
  angular
    .module('odin.trunkgroup')
    .factory('DepartmentsService', DepartmentsService)

  function DepartmentsService($http, $q) {
    var departments = []
    var service = { list: list }
    return service

    function list(serviceProviderId, groupId, includeEnterprise) {
      if (!_.isEmpty(departments)) {
        return $q.when(departments)
      }
      includeEnterprise = !!includeEnterprise
      return $http
        .get('/trunkgroup/group-departments/', {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            includeEnterprise: includeEnterprise
          }
        })
        .then(function(response) {
          var list = response.data.groupDepartmentGetListResponse || {}
          departments = list.departmentKey || []
          return departments
        })
    }
  }
})()
