;(function() {
  angular.module('odin.group').component('groupAutoAttendantSubmenu', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/submenus/submenu.component.html',
    controller: Controller,
    bindings: {
      module: '<',
      serviceProviderId: '<',
      groupId: '<',
      serviceUserId: '<',
      submenuId: '<',
      onDestroy: '&'
    }
  })

  function Controller(Alert, GroupAutoAttendantSubmenuService, Route, $q) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.update = update
    ctrl.destroy = destroy

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadSubmenu(), loadUsage()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSubmenu() {
      return GroupAutoAttendantSubmenuService.show(
        ctrl.serviceUserId,
        ctrl.submenuId
      ).then(function(data) {
        ctrl.menu = data
        console.log('menu', data)
      })
    }

    function loadUsage() {
      return GroupAutoAttendantSubmenuService.usage(
        ctrl.serviceUserId,
        ctrl.submenuId
      ).then(function(data) {
        ctrl.usage = data
        console.log('usage', data)
      })
    }

    function update(menu, callback) {
      Alert.spinner.open()
      GroupAutoAttendantSubmenuService.update(
        ctrl.serviceUserId,
        ctrl.submenuId,
        menu
      )
        .then(loadSubmenu)
        .then(function() {
          Alert.notify.success('Submenu Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(callback) {
      Alert.spinner.open()
      GroupAutoAttendantSubmenuService.destroy(
        ctrl.serviceUserId,
        ctrl.submenuId
      )
        .then(function() {
          Alert.notify.warning('Submenu Removed')
          ctrl.onDestroy()
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()