import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupAutoAttendantSubmenuAudio', {
  template,
  controller,
  require: { parent: '^^groupAutoAttendantSubmenu' }
})

controller.$inject = ['Alert', 'GroupAutoAttendantService', '$scope', 'ACL']
function controller(Alert, GroupAutoAttendantService, $scope, ACL) {
  var ctrl = this
  ctrl.edit = edit
  ctrl.options = GroupAutoAttendantService.options

  ctrl.selectAudioFile = selectAudioFile
  ctrl.selectAnnouncement = selectAnnouncement
  ctrl.createAnnouncement = createAnnouncement
  ctrl.onSelectAudio = onSelectAudio
  ctrl.hasRepository = ACL.hasVersion('20')

  function selectAudioFile() {
    $scope.$broadcast('audioFileCreate:load')
  }

  function selectAnnouncement() {
    $scope.$broadcast('announcementSelect:load')
  }

  function createAnnouncement() {
    $scope.$broadcast('announcementCreate:load')
  }

  function onSelectAudio(event) {
    ctrl.editMenu.audioFile = event.audioFile || event.announcement
  }

  function edit() {
    ctrl.editMenu = angular.copy(ctrl.parent.menu)
    Alert.modal.open('editAutoAttendantSubmenuAudioModal', function(close) {
      ctrl.parent.update(ctrl.editMenu, close)
    })
  }
}
