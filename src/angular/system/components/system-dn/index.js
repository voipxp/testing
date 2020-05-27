import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('systemDn', { template, controller })

controller.$inject = ['Session', 'ACL']
function controller(Session, ACL) {
  this.hideNav = Session.data('resellerId') || ACL.is('System')
}
