import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupAutoAttendantSubmenus', {
  template,
  controller,
  bindings: {
    module: '<',
    serviceProviderId: '<',
    groupId: '<',
    serviceUserId: '<'
  }
})

controller.$inject = ['Alert', 'GroupAutoAttendantSubmenuService', '$timeout']
function controller(Alert, GroupAutoAttendantSubmenuService, $timeout) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.onDestroy = onDestroy
  ctrl.onUpdate = onUpdate

  function onInit() {
    ctrl.loading = true
    ctrl.submenuId = null
    return loadSubmenus()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSubmenus() {
    return GroupAutoAttendantSubmenuService.show(ctrl.serviceUserId).then(function(data) {
      ctrl.menus = data
    })
  }

  function add() {
    ctrl.newMenu = {
      serviceUserId: ctrl.serviceUserId,
      announcementSelection: 'Default',
      enableLevelExtensionDialing: false
    }
    Alert.modal.open('createAutoAttendantSubmenuProfileModal', function(close) {
      create(ctrl.newMenu, close)
    })
  }

  function create(menu, callback) {
    Alert.spinner.open()
    GroupAutoAttendantSubmenuService.store(menu)
      .then(function() {
        Alert.notify.success('Submenu Created')
        callback()
        ctrl.submenuId = menu.submenuId
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function onUpdate(event) {
    ctrl.submenuId = null
    $timeout(function() {
      ctrl.submenuId = event.newSubmenuId || event.submenuId
    }, 1)
  }

  function onDestroy() {
    ctrl.submenuId = null
    loadSubmenus()
  }
}
