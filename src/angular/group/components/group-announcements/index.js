import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupAnnouncements', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupAnnouncementService', '$scope', 'Route']
function controller(Alert, GroupAnnouncementService, $scope, Route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.open = open
  ctrl.onUpdate = onUpdate

  function onInit() {
    ctrl.repository = { announcements: [] }
    ctrl.loading = true
    return loadAnnouncements()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadAnnouncements() {
    return GroupAnnouncementService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.repository = data
    })
  }

  function onUpdate() {
    onInit()
  }

  function open(announcement) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'announcements',
      'announcement'
    ).search({
      name: announcement.name,
      mediaType: announcement.mediaType
    })
  }

  function add() {
    $scope.$broadcast('announcementCreate:load')
  }
}
