import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupAutoAttendantSubmenuDetails', {
  template,
  controller,
  require: { parent: '^^groupAutoAttendantSubmenu' }
})

controller.$inject = ['Alert']
function controller(Alert) {
  var ctrl = this
  this.edit = edit

  function edit() {
    ctrl.editMenu = angular.copy(ctrl.parent.menu)
    ctrl.editMenu.newSubmenuId = ctrl.parent.submenuId
    var deleteAction
    if (ctrl.parent.module.permissions.delete) {
      deleteAction = function(close) {
        if (_.isEmpty(ctrl.parent.usage)) {
          Alert.confirm.open('Are you sure you want to remove this submenu?').then(function() {
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
