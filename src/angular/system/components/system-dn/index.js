import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('systemDn', { template, controller })

controller.$inject = ['Session']
function controller(Session) {
  this.hideNav = Session.data('resellerId')
}
