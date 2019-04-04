import angular from 'angular'
import template from './index.html'
import './index.css'

angular.module('odin.app').component('pbsFooter', { template, controller })

controller.$inject = ['UiTemplateService', 'Session', '$rootScope']
function controller(UiTemplateService, Session, $rootScope) {
  const ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    loadTemplate()
    loadSession()
  }

  function loadTemplate() {
    ctrl.template = UiTemplateService.data()
  }

  function loadSession() {
    ctrl.session = Session.data()
  }

  $rootScope.$on('Session:loaded', loadSession)
  $rootScope.$on('Template:updated', loadTemplate)
}
