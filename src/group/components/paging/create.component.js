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
    $scope
  ) {
    var ctrl = this
    ctrl.cancel = cancel
    ctrl.setExtension = setExtension
    ctrl.setDeliveryCLID = setDeliveryCLID
    ctrl.create = create

    function activate() {
      Alert.spinner.open()
      $q
        .all([
          loadDepartments(),
          loadLanguages(),
          loadTimezones(),
          loadDomains(),
          loadNumbers()
        ])
        .then(function() {
          initGroup()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
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

    function cancel() {
      ctrl.group = {}
      ctrl.parent.state = 'list'
    }

    function create() {
      if (
        ctrl.group.serviceInstanceProfile.password &&
        ctrl.group.serviceInstanceProfile.password !==
          ctrl.group.serviceInstanceProfile.password2
      ) {
        Alert.notify.danger('Profile Passwords Do Not Match')
        return
      }
      ctrl.group.serviceProviderId = ctrl.parent.serviceProviderId
      ctrl.group.groupId = ctrl.parent.groupId
      ctrl.group.serviceUserId =
        ctrl.group.serviceUserIdPrefix + '@' + ctrl.group.serviceUserIdSuffix
      Alert.spinner.open()
      GroupPagingGroupService.store(ctrl.group)
        .then(function() {
          Alert.spinner.close()
          ctrl.parent.open(ctrl.group.serviceUserIdPrefix)
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
