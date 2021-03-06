import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectGroupId', {
  template,
  controller,
  bindings: { serviceProviderId: '<', onUpdate: '&', moduleName: '<' }
})

controller.$inject = [
  'Alert',
  'GroupService',
  'EventEmitter',
  'Session',
  '$scope'
]
function controller(Alert, GroupService, EventEmitter, Session, $scope) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.onCreate = onCreate
  ctrl.select = select

  function onInit() {
    ctrl.loading = true
    if (Session.data('groupId')) {
      return select(Session.data('groupId'))
    }
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
    })
  }

  function add() {
    $scope.$broadcast('groupCreate:load')
  }

  function onCreate(event) {
    select(event.group)
  }

  function select(group) {
    var id = _.get(group, 'groupId', group)
    ctrl.onUpdate(EventEmitter({ groupId: id }))
  }
}
