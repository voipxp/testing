;(function() {
  angular.module('odin.group').component('groupAutoAttendantSubmenus', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/submenus/submenus.component.html',
    controller: Controller,
    bindings: {
      module: '<',
      serviceProviderId: '<',
      groupId: '<',
      serviceUserId: '<'
    }
  })

  function Controller(Alert, GroupAutoAttendantSubmenuService, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.add = add

    function onInit() {
      ctrl.loading = true
      return loadSubmenus()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSubmenus() {
      return GroupAutoAttendantSubmenuService.show(ctrl.serviceUserId).then(
        function(data) {
          ctrl.menus = data
          console.log('menus', data)
        }
      )
    }

    function add() {
      ctrl.newMenu = { announcementSelection: 'Default' }
      Alert.modal.open('createAutoAttendantSubmenuProfileModal', function(
        close
      ) {
        create(ctrl.newMenu, close)
      })
    }

    function create(menu, callback) {
      Alert.spinner.open()
      GroupAutoAttendantSubmenuService.store(ctrl.serviceUserId, menu)
        .then(function() {
          Alert.notify.success('Submenu Created')
          callback()
          open(menu)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function open(menu) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'autoAttendants',
        ctrl.serviceUserId,
        menu.submenuId
      )()
    }
  }
})()
