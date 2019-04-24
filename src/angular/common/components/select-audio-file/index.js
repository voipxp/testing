import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('selectAudioFile', {
  template,
  controller,
  bindings: {
    userId: '<',
    audioFile: '='
  }
})

controller.$inject = ['$scope', 'ACL']
function controller($scope, ACL) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.selectAnnouncement = selectAnnouncement
  ctrl.selectAudioFile = selectAudioFile
  ctrl.createAnnouncement = createAnnouncement
  ctrl.onSelectAudio = onSelectAudio

  function onInit() {
    ctrl.hasRepository = ACL.hasVersion('20')
  }

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
    ctrl.audioFile = event.audioFile || event.announcement
  }
}
