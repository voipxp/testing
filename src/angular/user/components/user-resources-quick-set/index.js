import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userResourcesQuickSet', {
  template,
  controller,
  bindings: {
    userId: '<',
    serviceProviderId: '<',
    groupId: '<',
    resources: '<'
  },
  require: { parent: '^^userQuickSet' }
})

controller.$inject = ['Alert', 'BrandingResourceService', 'Session']
function controller(Alert, BrandingResourceService, Session) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.imageSource = imageSource
  ctrl.openResource = openResource
  function onInit() {
    console.log('onInit() ctrl.resources', ctrl.resources)
    if (ctrl.resources.length === 0) {
      ctrl.loading = true
      loadSettings()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }
  }

  function openResource(resource) {
    console.log('resource', resource)
  }

  function imageSource(value) {
    if (!value) return
    return 'data:image/png;base64,' + value
  }

  function loadSettings() {
    return BrandingResourceService.hostname(window.location.hostname).then(
      function(data) {
        ctrl.resources = data
        console.log('ctrl.resources', ctrl.resources)
      }
    )
  }
}
