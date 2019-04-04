import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupAnnouncements', {
  template,
  controller
})

controller.$inject = [
  'Alert',
  'GroupAnnouncementService',
  '$scope',
  'Route',
  '$routeParam'
]
function controller(
  Alert,
  GroupAnnouncementService,
  $scope,
  Route,
  $routeParams
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.open = open
  ctrl.onUpdate = onUpdate
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId

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
