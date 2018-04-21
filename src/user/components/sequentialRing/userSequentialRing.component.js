;(function() {
  angular.module('odin.user').component('userSequentialRing', {
    templateUrl:
      'user/components/sequentialRing/userSequentialRing.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    $q,
    Alert,
    UserSequentialRingService,
    UserSequentialRingServiceCriteria,
    ACL,
    $scope,
    UserScheduleService,
    UserHolidayScheduleService,
    Module
  ) {
    var ctrl = this
    ctrl.options = UserSequentialRingService.options
    ctrl.criteriaOptions = UserSequentialRingServiceCriteria.options
    ctrl.users = []
    ctrl.domains = []
    ctrl.hasPermission = ACL.has
    ctrl.criteria = []
    ctrl.criteriaName
    ctrl.schedules = []
    ctrl.editCriteria = []

    ctrl.eCriteria = eCriteria
    ctrl.edit = edit
    ctrl.$onInit = onInit
    ctrl.addCriteria = addCriteria

    function onInit() {
      ctrl.loading = true
      $q
        .all([
          loadSettings(),
          loadUserSchedules(),
          loadHolidaySchedules(),
          loadModule()
        ])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Sequential Ring').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserSequentialRingService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
        console.log('ctrl.settings', ctrl.settings)
        console.log('ctrl.settings.string', JSON.stringify(ctrl.settings))

        return data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserSequentialRing', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function eCriteria(criteriaName, isActive) {
      if (!ctrl.module.permissions.update) return
      ctrl.loadingCriteria = true
      loadCriteria(criteriaName)
        .then(function(criteria) {
          // ctrl.criteriaName = criteriaName;
          // ctrl.criteriaIsActive = isActive;
          ctrl.editCriteria = criteria
          ctrl.editCriteria.isActive = isActive
          ctrl.editCriteria.name = criteriaName
          ctrl.criteria = angular.copy(criteria)
          if (typeof ctrl.editCriteria.timeSchedule === 'undefined') {
            ctrl.editCriteria.timeSchedule = {}
            ctrl.editCriteria.timeSchedule.name = ''
          }
          if (
            ctrl.editCriteria.fromDnCriteria.includeAnonymousCallers === 'true'
          )
            ctrl.editCriteria.fromDnCriteria.includeAnonymousCallers = true
          else ctrl.editCriteria.fromDnCriteria.includeAnonymousCallers = false

          if (
            ctrl.editCriteria.fromDnCriteria.includeUnavailableCallers ===
            'true'
          )
            ctrl.editCriteria.fromDnCriteria.includeUnavailableCallers = true
          else
            ctrl.editCriteria.fromDnCriteria.includeUnavailableCallers = false
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
          destroyCriteria(ctrl.userId, criteriaName, close)
        }
      }

      Alert.modal.open(
        'editUserSequentialRingCriteria',
        function onSave(close) {
          updateCriteria(criteriaName, ctrl.editCriteria, close)
        },
        onDelete
      )
    }

    function loadCriteria(criteriaName) {
      return UserSequentialRingServiceCriteria.show(
        ctrl.userId,
        criteriaName
      ).then(function(data) {
        return data
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserSequentialRingService.update(ctrl.userId, settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
          if (_.isFunction(callback)) callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function updateCriteria(criteriaName, settings, callback) {
      Alert.spinner.open()
      console.log('criteriaName', criteriaName, ctrl.criteriaName)
      console.log('edit(criteriaName) ctrl.editCriteria', ctrl.editCriteria)
      ctrl.editCriteria.newCriteriaName = ctrl.editCriteria.name

      if (typeof settings.timeSchedule !== 'undefined') {
        settings.timeSchedule = ctrl.schedules.find(function(o) {
          return o.name == settings.timeSchedule.name
        })
      } else {
        console.log('create blank json object for settings.timeSchedule')
        settings.timeSchedule = {}
      }

      if (typeof settings.holidaySchedule !== 'undefined') {
        settings.holidaySchedule = ctrl.holidaySchedules.find(function(o) {
          return o.name == settings.holidaySchedule.name
        })
      } else {
        settings.holidaySchedule = {}
        settings.holidayScheduleName = null
      }
      var p = false
      var obj = {
        criteria: []
      }
      obj.criteria.push({
        criteriaName: ctrl.editCriteria.name,
        isActive: ctrl.editCriteria.isActive
      })
      console.log('obj.criteria', obj.criteria)
      if (
        typeof settings.fromDnCriteria.phoneNumbers == 'undefined' &&
        settings.fromDnCriteria.phoneNumbers == null
      ) {
        delete settings.fromDnCriteria.phoneNumbers
      } else {
        for (var i = 0; i < settings.fromDnCriteria.phoneNumbers.length; i++) {
          if (
            settings.fromDnCriteria.phoneNumbers != 'undefined' &&
            settings.fromDnCriteria.phoneNumbers != null &&
            settings.fromDnCriteria.phoneNumbers[i].length > 0
          ) {
            p = true
            break
          }
        }
      }
      if (p == false) {
        settings.fromDnCriteria.phoneNumbers = []
      }

      UserSequentialRingServiceCriteria.update(
        ctrl.userId,
        criteriaName,
        settings
      )
        .then(UserSequentialRingService.update(ctrl.userId, obj))
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
          if (_.isFunction(callback)) callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadHolidaySchedules() {
      return UserHolidayScheduleService.index(ctrl.userId).then(function(data) {
        ctrl.holidaySchedules = data
        return data
      })
    }
    function loadUserSchedules() {
      return UserScheduleService.index(ctrl.userId).then(function(data) {
        ctrl.schedules = data
        console.log('ctrl.schedules:', ctrl.schedules)
        return data
      })
    }

    function addCriteria() {
      ctrl.editCriteria = {}
      Alert.modal.open('editUserSequentialRingCriteria', function(close) {
        ctrl.editCriteria.criteriaName = ctrl.criteriaName
        doAddCriteria(ctrl.editCriteria, close)
      })
    }

    function doAddCriteria(settings, callback) {
      ctrl.editCriteria = angular.copy(settings)

      if (typeof settings.timeSchedule !== 'undefined') {
        settings.timeSchedule = ctrl.schedules.find(function(o) {
          return o.name == settings.timeSchedule.name
        })
      }
      if (typeof settings.holidaySchedule !== 'undefined') {
        settings.holidaySchedule = ctrl.holidaySchedules.find(function(o) {
          return o.name == settings.holidaySchedule.name
        })
      }
      var obj = {
        criteria: []
      }
      obj.criteria.push({
        criteriaName: ctrl.editCriteria.name,
        isActive: ctrl.editCriteria.isActive
      })
      console.log('obj.criteria', obj.criteria)

      ctrl.editCriteria.criteriaName = settings.name
      console.log('settings', settings)
      console.log('ctrl.editCriteria', ctrl.editCriteria)

      Alert.spinner.open()
      UserSequentialRingServiceCriteria.post(ctrl.userId, ctrl.editCriteria)
        // .then(UserSequentialRingService.update(ctrl.userId,obj))
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Added')
          if (_.isFunction(callback)) callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function destroyCriteria(userId, criteriaName, callback) {
      Alert.confirm
        .open('Are you sure you want to delete this criteria?')
        .then(function() {
          doDestroyPhoneNumber(userId, criteriaName, callback)
        })
    }

    function doDestroyPhoneNumber(userId, criteriaName, callback) {
      Alert.spinner.open()
      UserSequentialRingServiceCriteria.destroy(userId, criteriaName)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Criteria Deleted')
          if (_.isFunction(callback)) callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
