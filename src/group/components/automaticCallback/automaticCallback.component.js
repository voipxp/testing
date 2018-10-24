;(function() {
  angular.module('odin.group').component('groupAutomaticCallback', {
    templateUrl:
      'group/components/automaticCallback/automaticCallback.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Alert,
    UserAutomaticCallbackService,
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
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function load() {
      return UserAutomaticCallbackService.index(
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
        user.profile.userId,
        'automaticCallback'
      )
    }

    function toggle(user) {
      var singleService = {
        userId: user.profile.userId,
        userServices: [user.service]
      }
      UserServiceService.update(singleService)
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
          Alert.notify.danger(error)
        })
        .finally(function() {})
    }
  }
})()
