;(function() {
  angular.module('odin.group').component('groupHuntGroup', {
    templateUrl: 'group/components/huntGroups/huntGroup.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    GroupHuntGroupService,
    Route,
    $routeParams,
    UserServiceService,
    $filter,
    $q,
    $rootScope
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.options = GroupHuntGroupService.options
    ctrl.back = back
    ctrl.reload = loadHuntGroup
    ctrl.updateProfile = updateProfile
    ctrl.update = update
    ctrl.destroy = destroy
    ctrl.loadServices = loadServices

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadHuntGroup(), loadServices()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadHuntGroup() {
      return GroupHuntGroupService.show(ctrl.serviceUserId).then(function(
        data
      ) {
        console.log('huntGroup', data)
        ctrl.huntGroup = data
      })
    }

    function loadServices() {
      ctrl.userServices = {}
      return UserServiceService.assigned(ctrl.serviceUserId).then(function(
        data
      ) {
        data.userServices.forEach(function(service) {
          ctrl.userServices[service.serviceName] = true
        })
        initializeServices(ctrl.userServices)
        return ctrl.userServices
      })
    }

    function initializeServices(assigned) {
      var incomingServices = [
        'Call Forwarding Always',
        'Call Forwarding Busy',
        'Call Forwarding Selective',
        'Calling Name Retrieval',
        'Priority Alert'
      ]
      ctrl.hasVoiceMessaging = assigned['Voice Messaging User']
      ctrl.hasIncomingServices = _.find(incomingServices, function(service) {
        return assigned[service]
      })
    }

    function updateProfile(event) {
      var huntGroup = angular.copy(ctrl.huntGroup)
      huntGroup.serviceInstanceProfile = event.profile
      update(huntGroup, event.callback)
    }

    function update(huntGroup, callback) {
      huntGroup.serviceUserId = ctrl.serviceUserId
      Alert.spinner.open()
      return GroupHuntGroupService.update(huntGroup)
        .then(onInit)
        .then(function() {
          Alert.notify.success('Hunt Group Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(callback) {
      Alert.spinner.open()
      GroupHuntGroupService.destroy(ctrl.serviceUserId)
        .then(function() {
          Alert.notify.warning('Hunt Group Removed')
          callback()
          back()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function back() {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'huntGroups')()
    }

    $rootScope.$on('UserService:updated:' + ctrl.serviceUserId, loadServices)
  }
})()
