;(function() {
  angular.module('odin.provisioning').component('groupClone', {
    templateUrl: 'serviceProvider/components/groups/clone.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      onUpdate: '&'
    }
  })

  function Controller(
    $location,
    EventEmitter,
    Alert,
    $scope,
    $q,
    GroupService,
    ServiceProviderDomainService,
    SystemStateService,
    SystemTimeZoneService,
    CloneGroupService
  ) {
    var ctrl = this
    ctrl.show = show

    function show() {
      console.log('groupId', ctrl.clone.groupId)
      showGroup().then(function() {
        console.log('data')
      })
    }

    function load() {
      console.log('ctrl.serviceProviderId', ctrl.serviceProviderId)
      Alert.spinner.open()
      return $q
        .all([loadGroups(), loadDomains(), loadStates(), loadTimeZones()])
        .then(function() {
          ctrl.clone = {
            serviceProviderId: ctrl.serviceProviderId,
            defaultDomain: ctrl.domains.default,
            userLimit: 25,
            groupPolicy: false,
            groupSchedule: true,
            groupExtensionLength: true,
            groupOutgoingCallingPlanOriginating: true,
            groupOutgoingCallingPlanRedirecting: true,
            groupOutgoingCallingPlanRedirected: true
          }
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function open() {
      Alert.modal.open('cloneGroupModal', function(close) {
        create(close)
      })
    }

    function showGroup() {
      return GroupService.show(ctrl.serviceProviderId, ctrl.clone.groupId).then(
        function(data) {
          ctrl.clone.group = data
          ctrl.clone.userLimit = ctrl.clone.group.userLimit
          // console.log('ctrl.from.clone', ctrl.clone.group)
          return data
        }
      )
    }

    function loadGroups() {
      return GroupService.index(ctrl.serviceProviderId).then(function(data) {
        ctrl.groups = data
        console.log('groups', ctrl.groups)
        return data
      })
    }

    function loadDomains() {
      return ServiceProviderDomainService.index(ctrl.serviceProviderId).then(
        function(data) {
          ctrl.domains = data
          console.log('sp domains', ctrl.domains)
          return data
        }
      )
    }

    function loadStates() {
      return SystemStateService.index().then(function(data) {
        ctrl.states = data
        console.log('states', ctrl.states)
        return data
      })
    }

    function loadTimeZones() {
      return SystemTimeZoneService.index().then(function(data) {
        ctrl.timezones = data
        console.log('timezones', ctrl.timezones)
        return data
      })
    }

    function create(callback) {
      Alert.spinner.open()
      delete ctrl.clone.group
      console.log(ctrl.clone)

      CloneGroupService.store(ctrl.clone)
        .then(function() {
          Alert.notify.success('Group Cloned')
          callback()
          sendUpdate(ctrl.clone.newServiceProviderId, ctrl.clone.newGroupId)
        })
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function sendUpdate(serviceProviderId, groupId) {
      $location.path(
        '/groups/' + serviceProviderId + '/' + groupId + '/profile'
      )
    }

    $scope.$on('groupClone:load', function() {
      console.log('$scope.$on groupClone:load')
      load()
        .then(open)
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
    })
  }
})()
