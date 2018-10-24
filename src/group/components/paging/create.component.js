;(function() {
  angular.module('odin.group').component('groupPagingGroupCreate', {
    templateUrl: 'group/components/paging/create.component.html',
    controller: Controller,
    require: { parent: '^groupPagingGroups' }
  })

  function Controller(
    Alert,
    $q,
    GroupPagingGroupService,
    GroupDepartmentService,
    GroupNumberService,
    SystemLanguageService,
    SystemTimeZoneService,
    GroupDomainService,
    UserNumberService,
    $scope,
    HashService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.setExtension = setExtension
    ctrl.setDeliveryCLID = setDeliveryCLID

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function activate() {
      Alert.spinner.open()
      $q.all([
        loadDepartments(),
        loadLanguages(),
        loadTimezones(),
        loadDomains(),
        loadNumbers()
      ])
        .then(initGroup)
        .then(function() {
          Alert.modal.open(ctrl.modalId, function(close) {
            create(ctrl.group, close)
          })
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
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

    function setDeliveryCLID() {
      if (!ctrl.group.deliverOriginatorCLIDInstead) {
        ctrl.group.originatorCLIDPrefix = null
      }
    }

    function setExtension() {
      var ext = ctrl.group.serviceInstanceProfile.phoneNumber
        ? ctrl.group.serviceInstanceProfile.phoneNumber.slice(-4)
        : null
      ctrl.group.serviceInstanceProfile.extension = ext
    }

    function initGroup() {
      ctrl.group = {
        serviceUserIdSuffix: ctrl.domains.default || ctrl.domains[0],
        deliverOriginatorCLIDInstead: false,
        confirmationToneTimeoutSeconds: 1,
        serviceInstanceProfile: { aliases: [] }
      }
    }

    function create(group, callback) {
      group.serviceProviderId = ctrl.parent.serviceProviderId
      group.groupId = ctrl.parent.groupId
      group.serviceUserId =
        group.serviceUserIdPrefix + '@' + group.serviceUserIdSuffix
      Alert.spinner.open()
      GroupPagingGroupService.store(group)
        .then(function() {
          Alert.notify.success('Group Created')
          callback()
          ctrl.parent.open(ctrl.group.serviceUserIdPrefix)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    $scope.$on('groupPagingGroupCreate:load', activate)
  }
})()
