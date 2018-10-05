;(function() {
  angular.module('odin.user').component('userSimultaneousRingPersonal', {
    templateUrl:
      'user/components/simultaneousRingPersonal/userSimultaneousRingPersonal.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    $q,
    Alert,
    UserSimultaneousRingPersonalService,
    UserSimultaneousRingPersonalServiceCriteria,
    ACL,
    UserScheduleService,
    Module
  ) {
    var ctrl = this
    ctrl.options = UserSimultaneousRingPersonalService.options
    ctrl.criteriaOptions = UserSimultaneousRingPersonalServiceCriteria.options
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
      $q.all([
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
      return Module.show('Simultaneous Ring Personal').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserSimultaneousRingPersonalService.show(ctrl.userId).then(
        function(data) {
          ctrl.settings = data
          console.log('ctrl.settings', ctrl.settings)
          return data
        }
      )
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserSimultaneousRingPersonal', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    function eCriteria(criteriaName, isActive) {
      if (!ctrl.module.permissions.update) return
      ctrl.loadingCriteria = true
      loadCriteria(criteriaName)
        .then(function(criteria) {
          ctrl.editCriteria = angular.copy(criteria)
          ctrl.editCriteria.isActive = isActive
          ctrl.editCriteria.name = criteriaName
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
        'editUserSimultaneousRingPersonalCriteria',
        function onSave(close) {
          updateCriteria(
            criteriaName,
            ctrl.editCriteria,
            ctrl.editSettings,
            close
          )
        },
        onDelete
      )
    }

    function loadCriteria(criteriaName) {
      return UserSimultaneousRingPersonalServiceCriteria.show(
        ctrl.userId,
        criteriaName
      )
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserSimultaneousRingPersonalService.update(ctrl.userId, settings)
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

    function updateCriteria(
      criteriaName,
      editCriteria,
      editSettings,
      callback
    ) {
      Alert.spinner.open()
      ctrl.editCriteria.newCriteriaName = ctrl.editCriteria.name

      if (typeof editCriteria.timeSchedule !== 'undefined') {
        editCriteria.timeSchedule = ctrl.schedules.find(function(o) {
          return o.name == editCriteria.timeSchedule.name
        })
      } else {
        editCriteria.timeSchedule = {}
      }

      if (typeof editCriteria.holidaySchedule !== 'undefined') {
        editCriteria.holidaySchedule = ctrl.holidaySchedules.find(function(o) {
          return o.name == editCriteria.holidaySchedule.name
        })
      } else {
        editCriteria.holidaySchedule = {}
        editCriteria.holidayScheduleName = null
      }
      editSettings.criteria.push({
        criteriaName: ctrl.editCriteria.name,
        isActive: ctrl.editCriteria.isActive
      })

      var p = false
      if (
        typeof editCriteria.fromDnCriteria.phoneNumbers == 'undefined' &&
        editCriteria.fromDnCriteria.phoneNumbers == null
      ) {
        delete editCriteria.fromDnCriteria.phoneNumbers
      } else {
        for (
          var i = 0;
          i < editCriteria.fromDnCriteria.phoneNumbers.length;
          i++
        ) {
          if (
            editCriteria.fromDnCriteria.phoneNumbers != 'undefined' &&
            editCriteria.fromDnCriteria.phoneNumbers != null &&
            editCriteria.fromDnCriteria.phoneNumbers[i].length > 0
          ) {
            p = true
            break
          }
        }
      }
      if (p == false) {
        editCriteria.fromDnCriteria.phoneNumbers = []
      }

      return UserSimultaneousRingPersonalServiceCriteria.update(
        ctrl.userId,
        criteriaName,
        editCriteria
      )
        .then(function() {
          return UserSimultaneousRingPersonalService.update(
            ctrl.userId,
            editSettings
          )
        })
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
      return UserScheduleService.holidays(ctrl.userId).then(function(data) {
        ctrl.holidaySchedules = data
        return data
      })
    }
    function loadUserSchedules() {
      return UserScheduleService.index(ctrl.userId).then(function(data) {
        ctrl.schedules = data
        return data
      })
    }

    function addCriteria() {
      ctrl.editCriteria = { userId: ctrl.userId }
      Alert.modal.open(
        'editUserSimultaneousRingPersonalCriteria',
        function onSave(close) {
          ctrl.editCriteria.criteriaName = ctrl.criteriaName
          doAddCriteria(ctrl.editCriteria, close)
        }
      )
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

      ctrl.editCriteria.criteriaName = settings.name
      ctrl.editCriteria.timeSchedule = settings.timeSchedule
      ctrl.editCriteria.holidaySchedule = settings.holidaySchedule

      Alert.spinner.open()
      UserSimultaneousRingPersonalServiceCriteria.store(
        ctrl.userId,
        ctrl.editCriteria
      )
        // .then(UserSimultaneousRingPersonalService.update(ctrl.userId,obj))
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
      UserSimultaneousRingPersonalServiceCriteria.destroy(userId, criteriaName)
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
