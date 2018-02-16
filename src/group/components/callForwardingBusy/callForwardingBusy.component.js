;(function() {
  angular.module('odin.group').component('groupCallForwardingBusy', {
    templateUrl:
      'group/components/callForwardingBusy/callForwardingBusy.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Alert,
    GroupCallForwardingBusyService,
    UserServiceService,
    Route
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open
    ctrl.toggle = toggle

    function onInit() {
      ctrl.loading = true
      return load()
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function load() {
      return GroupCallForwardingBusyService.users(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.users = data
      })
    }

    function open(user) {
      Route.open(
        'users',
        ctrl.serviceProviderId,
        ctrl.groupId,
        user.profile.userId
      )('callForwardingBusy')
    }

    function toggle(user) {
      var singleService = {}
      singleService['userServices'] = [user.service]
      UserServiceService.update(user.profile.userId, singleService)
        .then(load)
        .then(function() {
          var message = user.service.assigned ? 'Assigned' : 'Unassigned'
          var action = user.service.assigned
            ? Alert.notify.success
            : Alert.notify.warning
          action(
            user.profile.userId + ' ' + user.service.serviceName + ' ' + message
          )
        })
        .catch(function(error) {
          console.log('error', error.data)
          Alert.notify.danger(error)
        })
        .finally(function() {})
    }
  }
})()
