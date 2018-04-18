;(function() {
  angular.module('odin.group').component('groupAutoAttendantSubmenu', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/submenus/submenu.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Alert,
    GroupAutoAttendantSubmenuService,
    Route,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.submenuId = $routeParams.submenuId
    ctrl.open = open
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
      var renamed = menu.newSubmenuId && menu.newSubmenuId !== ctrl.submenuId
      GroupAutoAttendantSubmenuService.update(
        ctrl.serviceUserId,
        ctrl.submenuId,
        menu
      )
        .then(function() {
          if (!renamed) return loadSubmenu()
        })
        .then(function() {
          Alert.notify.success('Submenu Updated')
          callback()
          if (renamed) open(ctrl.serviceUserId, 'submenus', menu.newSubmenuId)
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
          callback()
          open(ctrl.serviceUserId, 'submenus')
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function open(serviceUserId, menu, id) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'autoAttendants'
      )(serviceUserId, menu, id)
    }
  }
})()
