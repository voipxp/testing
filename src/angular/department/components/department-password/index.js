import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.department').component('departmentChangePassword', {
  template,
  controller,
  bindings: { userId: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupDepartmentAdminService', 'Module','Session', '$q']

function controller(Alert, GroupDepartmentAdminService, Module, Session, $q) {
  var ctrl      	= this
  ctrl.$onInit  	= onInit
  ctrl.edit     	= edit
  ctrl.permission 	= false

  function onInit() {
	  ctrl.loading = true
    return $q
      .all([loadSettings(), loadModule()])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
	}

  function loadModule() {
    return Module.show('Change Password').then(function(data) {
		  ctrl.permission 	= data.permissions.update
		  ctrl.module 		= data
	  })
  }

  function loadSettings() {
	  ctrl.settings = {
		  userId: Session.data('userId'),
      password: null
    }
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
	  ctrl.userId = Session.data('userId')
    Alert.modal.open('editDepartmentChangePassword', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    GroupDepartmentAdminService.update(settings)
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Password Changed')
        if (_.isFunction(callback)) callback()
        Session.logout()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
