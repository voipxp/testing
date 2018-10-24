;(function() {
  angular.module('odin.group').component('groupAutoAttendantSubmenuDetails', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/submenus/details.component.html',
    controller: Controller,
    require: { parent: '^^groupAutoAttendantSubmenu' }
  })

  function Controller(Alert) {
    var ctrl = this
    this.edit = edit

    function edit() {
      ctrl.editMenu = angular.copy(ctrl.parent.menu)
      ctrl.editMenu.newSubmenuId = ctrl.parent.submenuId
      var deleteAction
      if (ctrl.parent.module.permissions.delete) {
        deleteAction = function(close) {
          if (_.isEmpty(ctrl.parent.usage)) {
            Alert.confirm
              .open('Are you sure you want to remove this submenu?')
              .then(function() {
                ctrl.parent.destroy(close)
              })
          } else {
            Alert.notify.warning('This submenu is in use and cannot be deleted')
          }
        }
      }
      Alert.modal.open(
        'editAutoAttendantSubmenuProfileModal',
        function(close) {
          ctrl.parent.update(ctrl.editMenu, close)
        },
        deleteAction
      )
    }
  }
})()
