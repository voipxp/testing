import angular from 'angular'
import template from './index.html'

angular
  .module('odin.group')
  .component('groupVirtualOnNetEnterpriseExtensions', {
    template,
    controller,
    bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
  })

controller.$inject = [
  'Alert',
  'GroupVirtualOnNetEnterpriseExtensionsService',
  'SystemVirtualOnNetEnterpriseExtensionsService',
  '$q',
  'Module'
]
function controller(
  Alert,
  GroupVirtualOnNetEnterpriseExtensionsService,
  SystemVirtualOnNetEnterpriseExtensionsService,
  $q,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.add = add

  ctrl.options = GroupVirtualOnNetEnterpriseExtensionsService.options

  function loadModule() {
    return Module.show("Virtual On-Net Enterprise Extensions").then(function(data) {
      ctrl.module = data
    })
  }

  function onInit() {
    loadModule()
    ctrl.loading = true
    $q.all([load(), loadSystem()])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }
  function loadSystem() {
    return SystemVirtualOnNetEnterpriseExtensionsService.index().then(function(
      data
    ) {
      ctrl.callTypes = data
    })
  }
  function load() {
    return GroupVirtualOnNetEnterpriseExtensionsService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.users = data.users
    })
  }

  function add() {
    ctrl.editSettings = {}
    Alert.modal.open('editVirtualOnNetEnterpriseExtensionsModal', function(
      close
    ) {
      store(ctrl.editSettings, close)
    })
  }

  function edit(user) {
    Alert.spinner.open()
    loadUser(user)
      .then(function() {
        Alert.modal.open(
          'editVirtualOnNetEnterpriseExtensionsModal',
          function(close) {
            update(ctrl.editSettings, close)
          },
          function(close) {
            Alert.confirm
              .open('Are you sure you want to delete this User?')
              .then(function() {
                destroy(user, close)
              })
          }
        )
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        Alert.spinner.close()
      })
  }
  function loadUser(user) {
    ctrl.editSettings = {}
    ctrl.editSettings.phoneNumber = ''

    return GroupVirtualOnNetEnterpriseExtensionsService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      user.phoneNumber
    ).then(function(data) {
      ctrl.editSettings = data
      ctrl.editSettings.phoneNumber = user.phoneNumber
      return data
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    settings.serviceProviderId = ctrl.serviceProviderId
    settings.groupId = ctrl.groupId
    GroupVirtualOnNetEnterpriseExtensionsService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      settings
    )
      .then(load)
      .then(function() {
        Alert.notify.success('User Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
  function store(settings, callback) {
    Alert.spinner.open()
    settings.serviceProviderId = ctrl.serviceProviderId
    settings.groupId = ctrl.groupId
    GroupVirtualOnNetEnterpriseExtensionsService.store(
      ctrl.serviceProviderId,
      ctrl.groupId,
      settings
    )
      .then(load)
      .then(function() {
        Alert.notify.success('User Added')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
  function destroy(user, callback) {
    Alert.spinner.open()
    GroupVirtualOnNetEnterpriseExtensionsService.destroy(
      ctrl.serviceProviderId,
      ctrl.groupId,
      user.phoneNumber
    )
      .then(load)
      .then(function() {
        Alert.notify.success('User Deleted')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
