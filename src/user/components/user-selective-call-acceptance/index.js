import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userSelectiveCallAcceptance', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = [
  'Alert',
  '$q',
  'SelectiveCallAcceptanceService',
  'UserScheduleService',
  'Module'
]
function controller(
  Alert,
  $q,
  SelectiveCallAcceptanceService,
  UserScheduleService,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.userTimeSchedules = []
  ctrl.holidaySchedules = []
  ctrl.selectiveCallAcceptanceCriteria = {}
  ctrl.editSelectCallAcceptanceCriteria = editSelectCallAcceptanceCriteria
  ctrl.fromDnCriteriaSelections =
    SelectiveCallAcceptanceService.options.fromDnCriteriaSelections
  ctrl.fromDnCriteriaMin =
    SelectiveCallAcceptanceService.options.fromDnCriteriaMin
  ctrl.fromDnCriteriaMax =
    SelectiveCallAcceptanceService.options.fromDnCriteriaMax
  ctrl.saveSelectiveCallAcceptanceCriteria = saveSelectiveCallAcceptanceCriteria
  ctrl.addSelectCallAcceptanceCriteria = addSelectCallAcceptanceCriteria

  function onInit() {
    ctrl.loading = true
    return $q
      .all([
        loadSelectiveCallAcceptanceList(),
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
    return Module.show('Selective Call Acceptance').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSelectiveCallAcceptanceList() {
    return SelectiveCallAcceptanceService.index(ctrl.userId).then(function(
      data
    ) {
      ctrl.selectiveCallAcceptance = data
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
  function getSelectCallAcceptanceCriteria(userId, sca) {
    return SelectiveCallAcceptanceService.show(userId, sca.criteriaName).then(
      function(data) {
        return data
      }
    )
  }

  function addSelectCallAcceptanceCriteria() {
    ctrl.selectiveCallAcceptanceCriteria = { userId: ctrl.userId }
    Alert.modal.open('edit-selectiveCallAcceptanceCriteria', function(close) {
      _addSelectiveCallAcceptanceCriteria(
        ctrl.selectiveCallAcceptanceCriteria,
        close
      )
    })
  }

  function editSelectCallAcceptanceCriteria(sca) {
    if (!ctrl.module.permissions.update) return
    ctrl.selectiveCallAcceptanceCriteria = {}
    ctrl.sca = angular.copy(sca)
    ctrl.loadingCriteria = true
    getSelectCallAcceptanceCriteria(ctrl.userId, sca)
      .then(function(data) {
        ctrl.selectiveCallAcceptanceCriteria = data
        ctrl.selectiveCallAcceptanceCriteria.isActive = sca.isActive
        ctrl.selectiveCallAcceptanceCriteria.criteriaName = sca.criteriaName
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
        deleteSelectiveCallAcceptanceCriteria(
          ctrl.selectiveCallAcceptanceCriteria,
          close
        )
      }
    }
    Alert.modal.open(
      'edit-selectiveCallAcceptanceCriteria',
      function onSave(close) {
        saveSelectiveCallAcceptanceCriteria(
          ctrl.selectiveCallAcceptanceCriteria,
          close
        )
      },
      onDelete
    )
  }

  function _addSelectiveCallAcceptanceCriteria(sca, callback) {
    var criteria = {}
    if (
      typeof ctrl.selectiveCallAcceptanceCriteria.timeSchedule !== 'undefined'
    ) {
      ctrl.selectiveCallAcceptanceCriteria.timeSchedule = ctrl.userTimeSchedules.find(
        function(o) {
          return (
            o.name == ctrl.selectiveCallAcceptanceCriteria.timeSchedule.name
          )
        }
      )
    }

    if (
      typeof ctrl.selectiveCallAcceptanceCriteria.holidaySchedule !==
      'undefined'
    ) {
      ctrl.selectiveCallAcceptanceCriteria.holidaySchedule = ctrl.holidaySchedules.find(
        function(o) {
          return (
            o.name == ctrl.selectiveCallAcceptanceCriteria.holidaySchedule.name
          )
        }
      )
    }

    Alert.spinner.open()
    SelectiveCallAcceptanceService.store(
      ctrl.userId,
      ctrl.selectiveCallAcceptanceCriteria
    )
      .then(function() {
        ctrl.selectiveCallAcceptanceCriteria = sca
        criteria = {
          userId: ctrl.userId,
          criteria: [{ criteriaName: sca.criteriaName, isActive: sca.isActive }]
        }
        return SelectiveCallAcceptanceService.activation(ctrl.userId, criteria)
      })
      .then(loadSelectiveCallAcceptanceList)
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

  function saveSelectiveCallAcceptanceCriteria(sca, callback) {
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

    Alert.spinner.open()
    SelectiveCallAcceptanceService.update(ctrl.userId, sca.criteriaName, sca)
      .then(function() {
        ctrl.selectiveCallAcceptanceCriteria = sca
        criteria = {
          userId: ctrl.userId,
          criteria: [{ criteriaName: sca.criteriaName, isActive: sca.isActive }]
        }
        return SelectiveCallAcceptanceService.activation(ctrl.userId, criteria)
      })
      .then(loadSelectiveCallAcceptanceList)
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

  function deleteSelectiveCallAcceptanceCriteria(sca, callback) {
    Alert.confirm
      .open('Are you sure you want to delete this Selective Call Acceptance?')
      .then(function() {
        doDeleteSelectiveCallAcceptanceCriteria(sca, callback)
      })
  }

  function doDeleteSelectiveCallAcceptanceCriteria(sca, callback) {
    Alert.spinner.open()
    SelectiveCallAcceptanceService.destroy(ctrl.userId, sca.criteriaName, sca)
      .then(loadSelectiveCallAcceptanceList)
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
