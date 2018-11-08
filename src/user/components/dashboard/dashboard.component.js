;(function() {
  angular.module('odin.user').component('userDashboard', {
    templateUrl: 'user/components/dashboard/dashboard.component.html',
    controller: Controller
  })

  function Controller(Alert, $routeParams, ACL) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.component = {
        name: 'userCallForwardingBusy',
        bindings: {
          something: 'else'
        }
      }
      ctrl.serviceProviderId = $routeParams.serviceProviderId
      ctrl.groupId = $routeParams.groupId
      ctrl.userId = $routeParams.userId
      ctrl.isAdmin = ACL.has('Group')
    }
  }
})()
