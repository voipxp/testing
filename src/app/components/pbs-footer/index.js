import angular from 'angular'
import template from './index.html'
import './index.css'

angular.module('odin.app').component('pbsFooter', { template, controller })

controller.$inject = ['Template', 'Session', '$rootScope']
function controller(Template, Session, $rootScope) {
  const ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    loadTemplate()
    loadSession()
  }

  function loadTemplate() {
    ctrl.template = Template.data()
  }

  function loadSession() {
    ctrl.session = Session.data()
  }

  $rootScope.$on('Session:loaded', loadSession)
  $rootScope.$on('Template:updated', loadTemplate)
}
