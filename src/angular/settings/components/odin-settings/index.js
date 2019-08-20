import angular from 'angular'
import template from './index.html'

angular
  .module('odin.settings')
  .component('odinSettings', { template, controller })

controller.$inject = ['ACL', 'Session']
function controller(ACL, Session) {
  this.hideNav = Session.data('resellerId')
  this.$onInit = function() {
    this.isProvisioning = ACL.isPaasAdmin() && ACL.has('Reseller')
  }
}
