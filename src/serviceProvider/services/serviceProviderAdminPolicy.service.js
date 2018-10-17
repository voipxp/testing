;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderAdminPolicyService', Service)

  function Service($http, Route) {
    var url = Route.api2('/service-providers/admins/policies')

    var service = {
      show: show,
      update: update
    }
    service.options = {
      policies: {
        profileAccess: ['Full', 'Read-Only', 'None'],
        groupAccess: [
          'Full',
          'Restricted from Adding or Removing Groups',
          'None'
        ],
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
        phoneNumberExtensionAccess: [
          'Full',
          'Assign To Services and Users',
          'None'
        ],
        callingLineIdNumberAccess: ['Full', 'Read-Only'],
        serviceAccess: ['Full', 'No Authorization', 'None'],
        servicePackAccess: ['Full', 'None'],
        sessionAdmissionControlAccess: ['Full', 'Read-Only', 'None'],
        webBrandingAccess: ['Full', 'None'],
        officeZoneAccess: ['Full', 'Read-Only'],
        communicationBarringAccess: ['Full', 'Read-Only'],
        networkPolicyAccess: ['Full', 'None'],
        numberActivationAccess: ['Full', 'Read-Only', 'None'],
        dialableCallerIDAccess: ['Full', 'Read-Only', 'None'],
        verifyTranslationAndRoutingAccess: ['Full', 'None']
      }
    }

    return service

    function show(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(res => res.data)
    }
  }
})()
