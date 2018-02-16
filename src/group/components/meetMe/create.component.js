;(function() {
  angular.module('odin.group').component('groupMeetMeCreate', {
    templateUrl: 'group/components/meetMe/create.component.html',
    controller: Controller,
    require: { parent: '^groupMeetMe' }
  })

  function Controller(
    Alert,
    $scope,
    $q,
    GroupMeetMeConferencingUserService,
    GroupNumberService,
    GroupMeetMeConferencingBridgeService,
    GroupDomainService,
    GroupMeetMeConferencingPortService,
    GroupDepartmentService,
    SystemLanguageService,
    SystemTimeZoneService
  ) {
    var ctrl = this

    ctrl.create = create
    ctrl.cancel = cancel
    ctrl.setExtension = setExtension

    function activate() {
      Alert.spinner.open()
      return $q
        .all([
          loadPorts(),
          loadDepartments(),
          loadLanguages(),
          loadTimezones(),
          loadDomains(),
          loadAvailableUsers(),
          loadNumbers()
        ])
        .then(initBridge)
        .catch(function(error) {
          Alert.notify.danger(error)
          cancel()
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function initBridge() {
      var allocatedPorts = ctrl.ports.allocatedPorts || 0
      ctrl.bridge = {
        serviceUserIdSuffix: ctrl.domains.default || ctrl.domains[0],
        allocatedPorts: allocatedPorts,
        allowIndividualOutDial: true,
        securityPinLength: 6,
        conferenceEndWarningPromptMinutes: 10,
        maxConferenceDurationMinutes: { hours: 3, minutes: 0 },
        maxScheduledConferenceDurationMinutes: { hours: 23, minutes: 45 },
        serviceInstanceProfile: { aliases: [] },
        users: []
      }
    }

    function loadDepartments() {
      return GroupDepartmentService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.departments = data
        console.log('departments', ctrl.departments)
        return data
      })
    }

    function loadLanguages() {
      return SystemLanguageService.index().then(function(data) {
        ctrl.languages = data
        console.log('languages', ctrl.languages)
        return data
      })
    }

    function loadTimezones() {
      return SystemTimeZoneService.index().then(function(data) {
        ctrl.timezones = data
        console.log('timezones', ctrl.timezones)
        return data
      })
    }

    function loadDomains() {
      return GroupDomainService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.domains = data
        console.log('domains', data)
        return data
      })
    }

    function loadPorts() {
      return GroupMeetMeConferencingPortService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.ports = data
        console.log('ports', data)
        return data
      })
    }

    function loadAvailableUsers() {
      return GroupMeetMeConferencingUserService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.users = data
        console.log('availableUsers', data)
        return data
      })
    }

    function loadNumbers() {
      return GroupNumberService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId,
        'available'
      ).then(function(data) {
        console.log('numbers', data)
        ctrl.numbers = data
        return data
      })
    }

    function setExtension() {
      var ext = ctrl.bridge.serviceInstanceProfile.phoneNumber
        ? ctrl.bridge.serviceInstanceProfile.phoneNumber.slice(-4)
        : null
      ctrl.bridge.serviceInstanceProfile.extension = ext
    }

    function cancel() {
      ctrl.bridge = {}
      ctrl.parent.state = 'list'
    }

    function create() {
      if (
        ctrl.bridge.serviceInstanceProfile.password &&
        ctrl.bridge.serviceInstanceProfile.password !==
          ctrl.bridge.serviceInstanceProfile.password2
      ) {
        Alert.notify.danger('Profile Passwords Do Not Match')
        return
      }
      ctrl.bridge.serviceProviderId = ctrl.parent.serviceProviderId
      ctrl.bridge.groupId = ctrl.parent.groupId
      ctrl.bridge.serviceUserId =
        ctrl.bridge.serviceUserIdPrefix + '@' + ctrl.bridge.serviceUserIdSuffix
      Alert.spinner.open()
      GroupMeetMeConferencingBridgeService.store(ctrl.bridge)
        .then(function() {
          Alert.spinner.close()
          ctrl.parent.open(ctrl.parent.groupId, ctrl.bridge.serviceUserId)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    $scope.$watch('$ctrl.parent.state', function(newVal) {
      if (newVal === 'add') activate()
    })
  }
})()
