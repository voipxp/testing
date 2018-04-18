;(function() {
  angular.module('odin.group').component('autoAttendantCreate', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/create.component.html',
    controller: Controller,
    bindings: {
      groupId: '<',
      serviceProviderId: '<',
      onUpdate: '&'
    }
  })

  function Controller(
    Alert,
    HashService,
    $scope,
    EventEmitter,
    GroupAutoAttendantService,
    GroupScheduleService,
    GroupDepartmentService,
    SystemLanguageService,
    SystemTimeZoneService,
    $q,
    ACL
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.options = GroupAutoAttendantService.options
    ctrl.onSelectPhone = onSelectPhone
    ctrl.onSelectUserId = onSelectUserId
    ctrl.autoAttendant = {}
    ctrl.hasAnnouncements = ACL.hasVersion('20')

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function open() {
      Alert.spinner.open()
      $q
        .all([
          loadSchedules(),
          loadDepartments(),
          loadLanguages(),
          loadTimezones()
        ])
        .then(function() {
          ctrl.autoAttendant = {
            serviceProviderId: ctrl.serviceProviderId,
            groupId: ctrl.groupId,
            enableVideo: false,
            extensionDialingScope: ctrl.options.dialingScopes[0],
            nameDialingScope: ctrl.options.dialingScopes[0],
            nameDialingEntries: ctrl.options.dialingEntries[0],
            firstDigitTimeoutSeconds: 1
          }
          Alert.modal.open(ctrl.modalId, function(close) {
            create(ctrl.autoAttendant, close)
          })
        })
        .catch(function(error) {
          console.log(error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function create(autoAttendant, callback) {
      if (
        autoAttendant.password &&
        autoAttendant.password !== autoAttendant.password2
      ) {
        Alert.notify.danger('Passwords do not match')
        return
      }
      Alert.spinner.open()
      GroupAutoAttendantService.store(autoAttendant)
        .then(function() {
          Alert.notify.success('Auto Attendant Created')
          callback()
          sendUpdate(autoAttendant)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadSchedules() {
      return GroupScheduleService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.schedules = data
        console.log('schedules', data)
      })
    }

    function loadDepartments() {
      return GroupDepartmentService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.departments = data
        console.log('departments', ctrl.departments)
      })
    }

    function loadLanguages() {
      return SystemLanguageService.index().then(function(data) {
        ctrl.languages = data
        console.log('languages', ctrl.languages)
      })
    }

    function loadTimezones() {
      return SystemTimeZoneService.index().then(function(data) {
        ctrl.timezones = data
        console.log('timezones', ctrl.timezones)
      })
    }

    function onSelectPhone(event) {
      _.set(
        ctrl.autoAttendant,
        'serviceInstanceProfile.phoneNumber',
        event.phoneNumber
      )
    }

    function onSelectUserId(event) {
      ctrl.autoAttendant.serviceUserId = event.userId
    }

    function sendUpdate(autoAttendant) {
      return ctrl.onUpdate(EventEmitter({ autoAttendant: autoAttendant }))
    }

    $scope.$on('autoAttendantCreate:load', open)
  }
})()
