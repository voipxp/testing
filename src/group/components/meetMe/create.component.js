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
    SystemTimeZoneService,
    HashService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.setExtension = setExtension

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

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
        .then(function() {
          Alert.modal.open(ctrl.modalId, function(close) {
            create(ctrl.bridge, close)
          })
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
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
        return data
      })
    }

    function loadLanguages() {
      return SystemLanguageService.index().then(function(data) {
        ctrl.languages = data
        return data
      })
    }

    function loadTimezones() {
      return SystemTimeZoneService.index().then(function(data) {
        ctrl.timezones = data
        return data
      })
    }

    function loadDomains() {
      return GroupDomainService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.domains = data
        return data
      })
    }

    function loadPorts() {
      return GroupMeetMeConferencingPortService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.ports = data
        return data
      })
    }

    function loadAvailableUsers() {
      return GroupMeetMeConferencingUserService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.users = data
        return data
      })
    }

    function loadNumbers() {
      return GroupNumberService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId,
        'available'
      ).then(function(data) {
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

    function create(bridge, callback) {
      bridge.serviceProviderId = ctrl.parent.serviceProviderId
      bridge.groupId = ctrl.parent.groupId
      bridge.serviceUserId =
        bridge.serviceUserIdPrefix + '@' + bridge.serviceUserIdSuffix
      Alert.spinner.open()
      GroupMeetMeConferencingBridgeService.store(bridge)
        .then(function() {
          Alert.notify.success('Bridge Created')
          callback()
          ctrl.parent.open(ctrl.parent.groupId, ctrl.bridge.serviceUserId)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    $scope.$on('groupMeetMeCreate:load', activate)
  }
})()
