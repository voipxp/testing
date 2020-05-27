import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingResources', {
  template,
  controller,
  bindings: { hostnameId: '<' }
})

controller.$inject = [
  'BrandingResourceService',
  'SettingService',
  'Alert',
  '$q'
]
function controller(BrandingResourceService, SettingService, Alert, $q) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.imageSource = imageSource
  ctrl.onUpload = onUpload
  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadResources()])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onUpload(file) {
    console.log(file)
    ctrl.editResource.imageIcon = file.content
    // ctrl.editField.value = file.content
  }

  function loadResources() {
    return BrandingResourceService.index(ctrl.hostnameId).then(function(data) {
      ctrl.resources = data
    })
  }
  function imageSource(value) {
    if (!value) return
    return 'data:image/png;base64,' + value
  }

  function edit(resource) {
    var removeAction
    if (resource) {
      ctrl.modalAction = 'Edit'
      ctrl.editResource = angular.copy(resource)
      removeAction = function onDelete(close) {
        remove(ctrl.editResource, close)
      }
    } else {
      ctrl.modalAction = 'New'
      ctrl.editResource = { hostnameId: ctrl.hostnameId, window: 0 }
    }
    Alert.modal.open(
      'editBrandingResource',
      function(close) {
        update(ctrl.editResource, close)
      },
      removeAction
    )
  }

  function validateName(resource) {
    const other = ctrl.resources.find(app => app.name === resource.name)
    if (other && other.id !== resource.id) {
      Alert.notify.warning('Name is already taken')
      return false
    }
    return true
  }

  function update(resource, callback) {
    if (!validateName(resource)) return
    var method
    if (resource.id) {
      method = BrandingResourceService.update
    } else {
      method = BrandingResourceService.store
    }
    Alert.spinner.open()
    method(resource)
      .then(loadResources)
      .then(function() {
        Alert.notify.success('Resource Saved')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error.data)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function remove(resource, callback) {
    Alert.confirm
      .open('Are you sure you want to remove this Resource?')
      .then(function() {
        Alert.spinner.open()
        BrandingResourceService.destroy(resource.id)
          .then(loadResources)
          .then(function() {
            Alert.notify.warning('Resource Removed')
            callback()
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
  }
}
