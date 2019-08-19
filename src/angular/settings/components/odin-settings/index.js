import angular from 'angular'
import template from './index.html'

angular
  .module('odin.settings')
  .component('odinSettings', { template, controller })

controller.$inject = ['ACL', '$location']
function controller(ACL, $location) {
  this.showNav = !/^\/resellers/.test($location.path())
  this.$onInit = function() {
    this.isProvisioning = ACL.has('Provisioning')
  }
}
