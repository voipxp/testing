;(function() {
  angular.module('odin.user').component('userSelectiveCallAcceptance', {
    templateUrl:
      'user/components/selectiveCallAcceptance/selectiveCallAcceptance.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
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
    ctrl.save = save
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
          console.log(' ctrl.fromDnCriteriaMax : ' + ctrl.fromDnCriteriaMax)
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
        console.log(data)
        ctrl.selectiveCallAcceptance = data
        console.log(ctrl.selectiveCallAcceptance)
        console.log('{ length : ' + ctrl.selectiveCallAcceptance.length + '}')
        return ctrl.selectiveCallAcceptance
      })
    }

    function loadUserSchedules() {
      return UserScheduleService.index(ctrl.userId).then(function(data) {
        ctrl.userTimeSchedules = data
        console.log('user schedules', data)
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
      ctrl.selectiveCallAcceptanceCriteria = {}
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
      Alert.spinner.open()
      var criteria = {}
      console.log('_addSelectiveCallAcceptanceCriteria')
      console.log('ctrl.selectiveCallAcceptanceCriteria')
      console.log(ctrl.selectiveCallAcceptanceCriteria)

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
              o.name ==
              ctrl.selectiveCallAcceptanceCriteria.holidaySchedule.name
            )
          }
        )
      }

      SelectiveCallAcceptanceService.post(
        ctrl.userId,
        ctrl.selectiveCallAcceptanceCriteria
      )
        .then(function() {
          ctrl.selectiveCallAcceptanceCriteria = sca
          criteria = {
            criteria: [
              { criteriaName: sca.criteriaName, isActive: sca.isActive }
            ]
          }
          Alert.notify.danger('Saving Selective Call Acceptance')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .then(function() {
          SelectiveCallAcceptanceService.criteriaactivation(
            ctrl.userId,
            criteria
          )
          if (_.isFunction(callback)) {
            callback()
          }
          return $q.all([
            loadSelectiveCallAcceptanceList(),
            loadUserSchedules(),
            loadHolidaySchedules()
          ])
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function saveSelectiveCallAcceptanceCriteria(sca, callback) {
      Alert.spinner.open()
      var criteria = {}
      console.log('saveSelectiveCallAcceptanceCriteria')
      console.log(sca)

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

      SelectiveCallAcceptanceService.update(ctrl.userId, sca.criteriaName, sca)
        .then(function() {
          ctrl.selectiveCallAcceptanceCriteria = sca
          criteria = {
            criteria: [
              { criteriaName: sca.criteriaName, isActive: sca.isActive }
            ]
          }
          Alert.notify.danger('Saving Selective Call Acceptance')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .then(function() {
          SelectiveCallAcceptanceService.criteriaactivation(
            ctrl.userId,
            criteria
          )
          if (_.isFunction(callback)) {
            callback()
          }
          return $q.all([
            loadSelectiveCallAcceptanceList(),
            loadUserSchedules(),
            loadHolidaySchedules()
          ])
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
        .then(function() {
          Alert.notify.success('Selective Call Acceptance deleted')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
          return $q.all([
            loadSelectiveCallAcceptanceList(),
            loadUserSchedules(),
            loadHolidaySchedules()
          ])
        })
    }

    function save() {
      return null
    }
  }
})()
