;(function() {
  angular.module('odin.group').component('groupMusicOnHoldAudio', {
    templateUrl:
      'group/components/musicOnHold/groupMusicOnHoldAudio.component.html',
    controller: Controller,
    bindings: {
      moh: '<',
      serviceProviderId: '<',
      groupId: '<',
      type: '@'
    },
    require: {
      parent: '^^groupMusicOnHold'
    }
  })

  function Controller(
    Alert,
    HashService,
    ACL,
    $scope,
    GroupMusicOnHoldService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    ctrl.onSelectAudio = onSelectAudio
    ctrl.onSelectDevice = onSelectDevice
    ctrl.hasRepository = ACL.hasVersion('20')
    ctrl.selectAudioFile = selectAudioFile
    ctrl.selectAnnouncement = selectAnnouncement
    ctrl.createAnnouncement = createAnnouncement
    ctrl.selectDevice = selectDevice
    ctrl.removeDevice = removeDevice
    ctrl.settings = {}
    ctrl.options = GroupMusicOnHoldService.options

    ctrl.onSetLinePort = onSetLinePort

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function onChanges(changes) {
      if (changes.moh) {
        ctrl.settings = _.get(changes.moh, ['currentValue', ctrl.type], {})
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

    function selectDevice() {
      $scope.$broadcast('deviceSelect:load')
    }

    function removeDevice() {
      _.set(ctrl.editSettings, 'externalSource', null)
    }

    function onSelectAudio(event) {
      _.set(
        ctrl.editSettings,
        'customSource.audioFile',
        event.audioFile || event.announcement
      )
    }

    function onSelectDevice(event) {
      if (!_.get(ctrl.editSettings, 'messageSourceSelection') === 'External') {
        return
      }
      _.set(
        ctrl.editSettings,
        'externalSource.accessDeviceEndpoint.accessDevice',
        event.device
      )
    }

    function onSetLinePort(event) {
      _.set(
        ctrl,
        'editSettings.externalSource.accessDeviceEndpoint.linePort',
        event.userId
      )
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open(ctrl.modalId, function onSave(close) {
        var moh = angular.copy(ctrl.moh)
        moh[ctrl.type] = ctrl.editSettings
        ctrl.parent.update(moh, close)
      })
    }
  }
})()
