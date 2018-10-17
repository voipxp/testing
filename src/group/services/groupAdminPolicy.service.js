;(function() {
  angular
    .module('odin.group')
    .factory('GroupAdminPolicyService', GroupAdminPolicyService)

  function GroupAdminPolicyService($http, Route) {
    var url = Route.api2('/groups/admins/policies')
    var service = { show, update, bulk }
    service.options = {
      policies: {
        profileAccess: ['Full', 'Read-Only', 'None'],
        userAccess: [
          'Full',
          'Full Profile',
          'Read-Only Profile',
          'No Profile',
          'None'
        ],
        adminAccess: ['Full', 'Read-Only', 'None'],
        departmentAccess: ['Full', 'Read-Only', 'None'],
        accessDeviceAccess: ['Full', 'Associate User With Device', 'None'],
        featureAccessCodeAccess: ['Full', 'Read-Only'],
        enhancedServiceInstanceAccess: ['Full', 'Modify-Only'],
        phoneNumberExtensionAccess: ['Full', 'Read-Only'],
        callingLineIdNumberAccess: ['Full', 'Read-Only'],
        serviceAccess: ['Full', 'Read-Only'],
        trunkGroupAccess: [
          'Full',
          'Full Resources',
          'Read-Only Resources',
          'None'
        ],
        sessionAdmissionControlAccess: ['Full', 'Read-Only', 'None'],
        officeZoneAccess: ['Full', 'Read-Only'],
        dialableCallerIDAccess: ['Full', 'Read-Only', 'None'],
        numberActivationAccess: ['Full', 'Read-Only', 'None'],
        verifyTranslationAndRoutingAccess: ['Full', 'None'],
        communicationBarringUserProfileAccess: ['Full', 'None']
      }
    }

    return service

    function show(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(res => res.data)
    }

    function bulk(data) {
      return $http.post(url('bulk'), data).then(res => res.data)
    }
  }
})()
