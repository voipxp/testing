import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupAnnouncement', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupAnnouncementService',
  'Route',
  '$scope',
  '$route',
  '$location'
]
function controller(
  Alert,
  GroupAnnouncementService,
  Route,
  $scope,
  $route,
  $location
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.edit = edit
  ctrl.onUpdate = onUpdate
  ctrl.onDelete = onDelete

  function onInit() {
    ctrl.name = $location.search().name
    ctrl.mediaType = $location.search().mediaType
    ctrl.loading = true
    return loadAnnouncement()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadAnnouncement() {
    return GroupAnnouncementService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.name,
      ctrl.mediaType
    ).then(function(data) {
      ctrl.announcement = data
    })
  }

  function open(announcement) {
    var name = _.get(announcement, 'newName')
    var mediaType = _.get(announcement, 'mediaType')
    if (name && mediaType) {
      return Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'announcements',
        'announcement'
      ).search({ name: name, mediaType: mediaType })
    } else {
      return Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'announcements'
      )
    }
  }

  function onUpdate(event) {
    return event.announcement.newName === ctrl.announcement.name
      ? onInit()
      : open(event.announcement) && $route.reload()
  }

  function onDelete() {
    open()
  }

  function edit() {
    $scope.$broadcast('announcementUpdate:load')
  }
}
