import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('autoAttendantAudio', {
  template,
  controller,
  require: { parent: '^^autoAttendant' },
  bindings: {
    autoAttendant: '<',
    menu: '@',
    loading: '<'
  }
})

controller.$inject = [
  'Alert',
  'HashService',
  'GroupAutoAttendantService',
  '$scope',
  'ACL',
  'Module'
]
function controller(Alert, HashService, GroupAutoAttendantService, $scope, ACL, Module) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.edit = edit
  ctrl.settings = {}
  ctrl.options = GroupAutoAttendantService.options

  ctrl.selectAudioFile = selectAudioFile
  ctrl.selectAnnouncement = selectAnnouncement
  ctrl.createAnnouncement = createAnnouncement
  ctrl.onSelectAudio = onSelectAudio
  ctrl.hasRepository = ACL.hasVersion('20')
  ctrl.canUpdate = Module.update('Auto Attendant')

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function onChanges(changes) {
    if (changes.autoAttendant) {
      ctrl.settings = _.get(changes.autoAttendant, ['currentValue', ctrl.menu], {})
    }
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
    ctrl.editSettings.audioFile = event.audioFile || event.announcement
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open(ctrl.modalId, function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    var editAutoAttendant = angular.copy(ctrl.autoAttendant)
    editAutoAttendant[ctrl.menu] = settings
    ctrl.parent.update(editAutoAttendant, callback)
  }
}
