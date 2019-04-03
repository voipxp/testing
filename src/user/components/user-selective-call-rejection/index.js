import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userSelectiveCallRejection', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = [
  'Alert',
  '$q',
  'UserSelectiveCallRejectionService',
  'UserScheduleService',
  'Module'
]
function controller(
  Alert,
  $q,
  UserSelectiveCallRejectionService,
  UserScheduleService,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit

  ctrl.userTimeSchedules = []
  ctrl.holidaySchedules = []

  ctrl.selectiveCallRejectionCriteria = {}
  ctrl.editSelectCallRejectionCriteria = editSelectCallRejectionCriteria
  ctrl.fromDnCriteriaSelections =
    UserSelectiveCallRejectionService.options.fromDnCriteriaSelections
  ctrl.fromDnCriteriaMin =
    UserSelectiveCallRejectionService.options.fromDnCriteriaMin
  ctrl.fromDnCriteriaMax =
    UserSelectiveCallRejectionService.options.fromDnCriteriaMax
  ctrl.saveSelectiveCallRejectionCriteria = saveSelectiveCallRejectionCriteria
  ctrl.addSelectCallRejectionCriteria = addSelectCallRejectionCriteria

  function onInit() {
    ctrl.loading = true
    return $q
      .all([
        loadSelectiveCallRejectionList(),
        loadUserSchedules(),
        loadHolidaySchedules(),
        loadModule()
      ])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
        // list()
      })
  }

  function loadModule() {
    return Module.show('Selective Call Rejection').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSelectiveCallRejectionList() {
    return UserSelectiveCallRejectionService.index(ctrl.userId).then(function(
      data
    ) {
      ctrl.selectiveCallRejection = data
      return ctrl.selectiveCallRejection
    })
  }

  function loadUserSchedules() {
    return UserScheduleService.index(ctrl.userId).then(function(data) {
      ctrl.userTimeSchedules = data
      return data
    })
  }

  function loadHolidaySchedules() {
    return UserScheduleService.holidays(ctrl.userId).then(function(data) {
      ctrl.holidaySchedules = data
      return data
    })
  }
  function getSelectCallRejectionCriteria(userId, sca) {
    return UserSelectiveCallRejectionService.show(
      userId,
      sca.criteriaName
    ).then(function(data) {
      return data
    })
  }

  function addSelectCallRejectionCriteria() {
    ctrl.selectiveCallRejectionCriteria = { userId: ctrl.userId }
    Alert.modal.open('edit-selectiveCallRejectionCriteria', function(close) {
      _addSelectiveCallRejectionCriteria(
        ctrl.selectiveCallRejectionCriteria,
        close
      )
    })
  }

  function editSelectCallRejectionCriteria(sca) {
    if (!ctrl.module.permissions.update) return
    ctrl.selectiveCallRejectionCriteria = {}
    ctrl.sca = angular.copy(sca)
    ctrl.loadingCriteria = true
    getSelectCallRejectionCriteria(ctrl.userId, sca)
      .then(function(data) {
        ctrl.selectiveCallRejectionCriteria = data
        ctrl.selectiveCallRejectionCriteria.isActive = sca.isActive
        ctrl.selectiveCallRejectionCriteria.criteriaName = sca.criteriaName
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loadingCriteria = false
      })

    var onDelete
    if (ctrl.module.permissions.delete) {
      onDelete = function(close) {
        deleteSelectiveCallRejectionCriteria(
          ctrl.selectiveCallRejectionCriteria,
          close
        )
      }
    }

    Alert.modal.open(
      'edit-selectiveCallRejectionCriteria',
      function onSave(close) {
        saveSelectiveCallRejectionCriteria(
          ctrl.selectiveCallRejectionCriteria,
          close
        )
      },
      onDelete
    )
  }

  function _addSelectiveCallRejectionCriteria(sca, callback) {
    Alert.spinner.open()
    var criteria = {}
    if (
      typeof ctrl.selectiveCallRejectionCriteria.timeSchedule !== 'undefined'
    ) {
      ctrl.selectiveCallRejectionCriteria.timeSchedule = ctrl.userTimeSchedules.find(
        function(o) {
          return o.name == ctrl.selectiveCallRejectionCriteria.timeSchedule.name
        }
      )
    }

    if (
      typeof ctrl.selectiveCallRejectionCriteria.holidaySchedule !== 'undefined'
    ) {
      ctrl.selectiveCallRejectionCriteria.holidaySchedule = ctrl.holidaySchedules.find(
        function(o) {
          return (
            o.name == ctrl.selectiveCallRejectionCriteria.holidaySchedule.name
          )
        }
      )
    }

    UserSelectiveCallRejectionService.store(
      ctrl.userId,
      ctrl.selectiveCallRejectionCriteria
    )
      .then(function() {
        ctrl.selectiveCallRejectionCriteria = sca
        criteria = {
          userId: ctrl.userId,
          criteria: [{ criteriaName: sca.criteriaName, isActive: sca.isActive }]
        }
        return UserSelectiveCallRejectionService.activation(
          ctrl.userId,
          criteria
        )
      })
      .then(loadSelectiveCallRejectionList)
      .then(function() {
        Alert.notify.success('Criteria Created')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function saveSelectiveCallRejectionCriteria(sca, callback) {
    Alert.spinner.open()
    var criteria = {}
    if (typeof sca.timeSchedule !== 'undefined') {
      sca.timeSchedule = ctrl.userTimeSchedules.find(function(o) {
        return o.name == sca.timeSchedule.name
      })
    }

    if (typeof sca.holidaySchedule !== 'undefined') {
      sca.holidaySchedule = ctrl.holidaySchedules.find(function(o) {
        return o.name == sca.holidaySchedule.name
      })
    }

    UserSelectiveCallRejectionService.update(ctrl.userId, sca.criteriaName, sca)
      .then(function() {
        ctrl.selectiveCallRejectionCriteria = sca
        criteria = {
          userId: ctrl.userId,
          criteria: [{ criteriaName: sca.criteriaName, isActive: sca.isActive }]
        }
        return UserSelectiveCallRejectionService.activation(
          ctrl.userId,
          criteria
        )
      })
      .then(loadSelectiveCallRejectionList)
      .then(function() {
        Alert.notify.success('Criteria Updated')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function deleteSelectiveCallRejectionCriteria(sca, callback) {
    Alert.confirm
      .open('Are you sure you want to delete this Selective Call Acceptance?')
      .then(function() {
        doDeleteSelectiveCallRejectionCriteria(sca, callback)
      })
  }

  function doDeleteSelectiveCallRejectionCriteria(sca, callback) {
    Alert.spinner.open()
    UserSelectiveCallRejectionService.destroy(ctrl.userId, sca.criteriaName)
      .then(loadSelectiveCallRejectionList)
      .then(function() {
        Alert.notify.success('Criteria Removed')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
