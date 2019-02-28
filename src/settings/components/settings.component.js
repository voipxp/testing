;(function() {
  angular.module('odin.settings').component('odinSettings', {
    templateUrl: 'settings/components/settings.component.html',
    controller: function(ACL) {
      this.$onInit = function() {
        this.isProvisioning = ACL.has('Provisioning')
      }
    }
  })
})()
