;(function() {
  angular.module('odin.common').component('userCallControlApplications', {
    templateUrl:
      'common/components/userCallControlApplications/userCallControlApplications.component.html',
    controller: Controller,
    bindings: { userId: '=' }
  })

  function Controller(Alert, UserOCICallControlApplicationService) {
    var ctrl = this

    ctrl.$onInit = activate

    function activate() {
      ctrl.applications = []
      loadApplications().catch(function(error) {
        Alert.notify.danger(error)
      })
    }

    function loadApplications() {
      return UserOCICallControlApplicationService.show(ctrl.userId).then(
        function(data) {
          ctrl.applications = data.applicationIdList
          return data
        }
      )
    }
  }
})()
