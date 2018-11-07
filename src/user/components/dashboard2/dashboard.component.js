;(function() {
  angular.module('odin.user').component('userDashboard2', {
    templateUrl: 'user/components/dashboard2/dashboard.component.html',
    controller: Controller
  })

  function Controller(Alert, $routeParams, ACL) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.serviceProviderId = $routeParams.serviceProviderId
      ctrl.groupId = $routeParams.groupId
      ctrl.userId = $routeParams.userId
      ctrl.isAdmin = ACL.has('Group')
    }
  }
})()
