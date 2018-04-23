;(function() {
  angular.module('odin.group').component('groupAutoAttendantSubmenuKeys', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/submenus/keys.component.html',
    controller: Controller,
    require: { parent: '^^groupAutoAttendantSubmenu' }
  })

  function Controller(
    Alert,
    GroupAutoAttendantService,
    GroupAutoAttendantSubmenuService,
    $q,
    ACL,
    $scope
  ) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.options = GroupAutoAttendantSubmenuService.options
    ctrl.keys = []
    ctrl.requiresPhone = GroupAutoAttendantService.requiresPhone
    ctrl.requiresSubmenu = GroupAutoAttendantService.requiresSubmenu
    ctrl.requiresAnnouncement = GroupAutoAttendantService.requiresAnnouncement

    ctrl.selectAudioFile = selectAudioFile
    ctrl.selectAnnouncement = selectAnnouncement
    ctrl.createAnnouncement = createAnnouncement
    ctrl.onSelectAudio = onSelectAudio
    ctrl.hasRepository = ACL.hasVersion('20')

    function loadSubmenus() {
      Alert.spinner.open()
      return GroupAutoAttendantSubmenuService.index(ctrl.parent.serviceUserId)
        .then(function(data) {
          // filter out our own
          ctrl.submenus = _.filter(data, function(submenu) {
            return submenu.submenuId !== ctrl.parent.submenuId
          })
          console.log('submenu', ctrl.submenus)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
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
      console.log('gotAudioFile', event)
      ctrl.selectedKey.audioFile = event.audioFile || event.announcement
    }

    function edit(index) {
      var editKeys = angular.copy(ctrl.parent.menu.keys)
      var originalKey = editKeys[index] || {}
      console.log('edit', originalKey)
      ctrl.selectedKey = angular.copy(originalKey)
      setAvailableKeys(ctrl.selectedKey)
      loadSubmenus().then(function() {
        Alert.modal.open(
          'editGroupAutoAttendantSubmenuKeysModal',
          function onSave(close) {
            if (ctrl.selectedKey.key === originalKey.key) {
              angular.extend(originalKey, ctrl.selectedKey)
            } else {
              originalKey.action = null
              editKeys.push(ctrl.selectedKey)
            }
            return update(editKeys, close)
          },
          function onDelete(close) {
            Alert.confirm
              .open('Are you sure you want to remove this key?')
              .then(function() {
                originalKey.action = null
                update(editKeys, close)
              })
          }
        )
      })
    }

    function update(keys, callback) {
      var editMenu = angular.copy(ctrl.parent.menu)
      editMenu.keys = keys
      ctrl.parent.update(editMenu, callback)
    }

    function setAvailableKeys(key) {
      var used = _.map(ctrl.parent.menu.keys, 'key')
      var available = _.difference(ctrl.options.keys, used)
      if (key.key) available.push(key.key)
      ctrl.availableKeys = available.sort()
    }
  }
})()