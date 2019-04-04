import angular from 'angular'
import template from './index.html'

angular
  .module('odin.settings')
  .component('odinSettings', { template, controller })

controller.$inject = ['ACL']
function controller(ACL) {
  this.$onInit = function() {
    this.isProvisioning = ACL.has('Provisioning')
  }
}
