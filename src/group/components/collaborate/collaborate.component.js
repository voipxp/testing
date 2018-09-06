;(function() {
  angular.module('odin.group').component('groupCollaborate', {
    templateUrl: 'group/components/collaborate/collaborate.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, GroupCollaborateService, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open
    ctrl.add = add
    ctrl.onCreate = onCreate

    function onInit() {
      ctrl.loading = true
      return loadCollaborateList()
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadCollaborateList() {
      return GroupCollaborateService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.listCollaborate = data
        console.log('listCollaborate', data)
      })
    }

    function open(collaborate) {
      Route.open('groups')(
        ctrl.serviceProviderId,
        ctrl.groupId,
        'collaborate',
        collaborate.serviceUserId
      )
    }

    function add() {}

    function onCreate() {}
  }
})()
