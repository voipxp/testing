;(function() {
  angular.module('odin.app').component('myAccount', {
    templateUrl: 'app/components/account/index.component.html',
    controller: Controller
  })

  function Controller(Session) {
    var ctrl = this
    ctrl.$onInit = onInit
    function onInit() {
      Session.load().then(function() {
        ctrl.userId = Session.data('userId')
        ctrl.loginType = Session.data('loginType')
        ctrl.serviceProviderId = Session.data('serviceProviderId')
        ctrl.groupId = Session.data('groupId')
      })
    }
  }
})()
