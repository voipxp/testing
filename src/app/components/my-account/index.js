import angular from 'angular'
import template from './index.html'

angular.module('odin.app').component('myAccount', { template, controller })

controller.$inject = ['Session']
function controller(Session) {
  const ctrl = this
  ctrl.$onInit = onInit
  function onInit() {
    ctrl.userId = Session.data('userId')
    ctrl.loginType = Session.data('loginType')
    ctrl.serviceProviderId = Session.data('serviceProviderId')
    ctrl.groupId = Session.data('groupId')
  }
}
