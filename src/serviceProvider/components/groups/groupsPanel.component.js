;(function() {
  angular
    .module('odin.serviceProvider')
    .component('serviceProviderGroupsPanel', {
      templateUrl:
        'serviceProvider/components/groups/groupsPanel.component.html',
      controller: Controller,
      bindings: { serviceProviderId: '<' }
    })

  function Controller(Alert, GroupService, Route, $scope) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.onCreate = onCreate
    ctrl.open = open
    ctrl.onPagination = onPagination

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.loading = true
      loadGroups()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadGroups() {
      return GroupService.index(ctrl.serviceProviderId).then(function(data) {
        ctrl.groups = data
        console.log('groups', ctrl.groups)
        return data
      })
    }

    function add() {
      $scope.$broadcast('groupCreate:load')
    }

    function onCreate(event) {
      open({ item: event.group })
    }

    function open(event) {
      var group = event.item
      Route.open('groups', ctrl.serviceProviderId)(group.groupId)
    }
  }
})()
