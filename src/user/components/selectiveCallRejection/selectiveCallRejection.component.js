;(function() {
  angular.module('odin.user').component('userSelectiveCallRejection', {
    templateUrl:
      'user/components/selectiveCallRejection/selectiveCallRejection.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    Alert,
    $q,
    SelectiveCallRejectionService,
    UserScheduleService,
    UserHolidayScheduleService,
    Module
  ) {
    var ctrl = this
    ctrl.$onInit = onInit

    ctrl.userTimeSchedules = []
    ctrl.holidaySchedules = []

    ctrl.selectiveCallRejectionCriteria = {}
    ctrl.editSelectCallRejectionCriteria = editSelectCallRejectionCriteria
    ctrl.save = save
    ctrl.fromDnCriteriaSelections =
      SelectiveCallRejectionService.options.fromDnCriteriaSelections
    ctrl.fromDnCriteriaMin =
      SelectiveCallRejectionService.options.fromDnCriteriaMin
    ctrl.fromDnCriteriaMax =
      SelectiveCallRejectionService.options.fromDnCriteriaMax
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
          console.log(' ctrl.fromDnCriteriaMax : ' + ctrl.fromDnCriteriaMax)
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
      return SelectiveCallRejectionService.index(ctrl.userId).then(function(
        data
      ) {
        console.log(data)
        ctrl.selectiveCallRejection = data
        console.log(ctrl.selectiveCallRejection)
        console.log('{ length : ' + ctrl.selectiveCallRejection.length + '}')
        return ctrl.selectiveCallRejection
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
      return UserHolidayScheduleService.index(ctrl.userId).then(function(data) {
        ctrl.holidaySchedules = data
        // var element = {}
        // element.level = "";
        // element.name = "";
        // ctrl.holidaySchedules.push(element);
        //
        // console.log('holiday schedules', ctrl.holidaySchedules)
        return data
      })
    }
    function getSelectCallRejectionCriteria(userId, sca) {
      return SelectiveCallRejectionService.show(userId, sca.criteriaName).then(
        function(data) {
          return data
        }
      )
    }

    function addSelectCallRejectionCriteria() {
      ctrl.selectiveCallRejectionCriteria = {}
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
      console.log('_addSelectiveCallRejectionCriteria')
      console.log('ctrl.selectiveCallRejectionCriteria')
      console.log(ctrl.selectiveCallRejectionCriteria)

      if (
        typeof ctrl.selectiveCallRejectionCriteria.timeSchedule !== 'undefined'
      ) {
        ctrl.selectiveCallRejectionCriteria.timeSchedule = ctrl.userTimeSchedules.find(
          function(o) {
            return (
              o.name == ctrl.selectiveCallRejectionCriteria.timeSchedule.name
            )
          }
        )
      }

      if (
        typeof ctrl.selectiveCallRejectionCriteria.holidaySchedule !==
        'undefined'
      ) {
        ctrl.selectiveCallRejectionCriteria.holidaySchedule = ctrl.holidaySchedules.find(
          function(o) {
            return (
              o.name == ctrl.selectiveCallRejectionCriteria.holidaySchedule.name
            )
          }
        )
      }

      SelectiveCallRejectionService.post(
        ctrl.userId,
        ctrl.selectiveCallRejectionCriteria
      )
        .then(function() {
          ctrl.selectiveCallRejectionCriteria = sca
          criteria = {
            criteria: [
              { criteriaName: sca.criteriaName, isActive: sca.isActive }
            ]
          }
          Alert.notify.danger('Saving Selective Call Rejection')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .then(function() {
          SelectiveCallRejectionService.criteriaactivation(
            ctrl.userId,
            criteria
          )
          if (_.isFunction(callback)) {
            callback()
          }
          return $q.all([
            loadSelectiveCallRejectionList(),
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

    function saveSelectiveCallRejectionCriteria(sca, callback) {
      Alert.spinner.open()
      var criteria = {}
      console.log('saveSelectiveCallRejectionCriteria')
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

      SelectiveCallRejectionService.update(ctrl.userId, sca.criteriaName, sca)
        .then(function() {
          ctrl.selectiveCallRejectionCriteria = sca
          criteria = {
            criteria: [
              { criteriaName: sca.criteriaName, isActive: sca.isActive }
            ]
          }
          Alert.notify.danger('Saving Selective Call Rejection')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .then(function() {
          SelectiveCallRejectionService.criteriaactivation(
            ctrl.userId,
            criteria
          )
          if (_.isFunction(callback)) {
            callback()
          }
          return $q.all([
            loadSelectiveCallRejectionList(),
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

    function deleteSelectiveCallRejectionCriteria(sca, callback) {
      Alert.confirm
        .open('Are you sure you want to delete this Selective Call Acceptance?')
        .then(function() {
          doDeleteSelectiveCallRejectionCriteria(sca, callback)
        })
    }

    function doDeleteSelectiveCallRejectionCriteria(sca, callback) {
      Alert.spinner.open()
      SelectiveCallRejectionService.destroy(ctrl.userId, sca.criteriaName, sca)
        .then(function() {
          Alert.notify.success('Selective Call Rejection deleted')
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
            loadSelectiveCallRejectionList(),
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
