import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDevice', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', deviceName: '<' }
})

controller.$inject = ['ACL', 'Alert', 'Route', '$location']
function controller(ACL, Alert, Route, $location) {
  this.back = () => {
    if(ACL.is('Service Provider')){
      Route.open(
        'groups',
        this.serviceProviderId, 
         this.groupId,
         'Provisioning',
         'groupDevices'
      )
    }else  Route.open('groups', this.serviceProviderId, this.groupId, 'devices')
  }
}
