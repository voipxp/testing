import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupAnnouncements', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['ACL','Alert', 'GroupAnnouncementService', '$scope', 'Route']
function controller(ACL, Alert, GroupAnnouncementService, $scope, Route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.open = open
  ctrl.onUpdate = onUpdate
 ctrl.isGroupAdmin = ACL.is('Group')
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
    if(ACL.is('Group')){
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'announcements',
        'announcement',
        announcement.name,
        announcement.mediaType
      ) 
    }else{
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
  }

  function add() {
    $scope.$broadcast('announcementCreate:load')
  }
}
