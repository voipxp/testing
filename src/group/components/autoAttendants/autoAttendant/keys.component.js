;(function() {
  angular.module('odin.group').component('autoAttendantKeys', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/keys.component.html',
    controller: Controller,
    require: { parent: '^^autoAttendant' },
    bindings: {
      autoAttendant: '<',
      menu: '@',
      loading: '<'
    }
  })

  function Controller(
    Alert,
    GroupAutoAttendantService,
    GroupAutoAttendantSubmenuService,
    HashService,
    $q,
    ACL,
    $scope,
    Module
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges

    ctrl.canUpdate = Module.update('Auto Attendant')
    ctrl.edit = edit
    ctrl.options = GroupAutoAttendantService.options
    ctrl.isBasic = isBasic
    ctrl.keys = []
    ctrl.requiresPhone = GroupAutoAttendantService.requiresPhone
    ctrl.requiresSubmenu = GroupAutoAttendantService.requiresSubmenu
    ctrl.requiresAnnouncement = GroupAutoAttendantService.requiresAnnouncement

    ctrl.selectAudioFile = selectAudioFile
    ctrl.selectAnnouncement = selectAnnouncement
    ctrl.createAnnouncement = createAnnouncement
    ctrl.onSelectAudio = onSelectAudio
    ctrl.hasRepository = ACL.hasVersion('20')

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function onChanges(changes) {
      if (changes.autoAttendant) {
        ctrl.keys = _.get(
          changes.autoAttendant.currentValue,
          [ctrl.menu, 'keys'],
          []
        )
        ctrl.options = angular.copy(GroupAutoAttendantService.options)
        if (isBasic()) {
          _.pull(ctrl.options.actions, 'Transfer To Submenu')
        }
      }
    }

    function isBasic() {
      return _.get(ctrl, 'autoAttendant.type') == 'Basic'
    }

    function loadSubmenus() {
      if (isBasic()) return $q.resolve()
      return GroupAutoAttendantSubmenuService.index(
        ctrl.autoAttendant.serviceUserId
      ).then(function(data) {
        ctrl.submenus = data
      })
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
      var editKeys = angular.copy(ctrl.keys)
      var originalKey = editKeys[index] || {}
      console.log('edit', originalKey)
      ctrl.selectedKey = angular.copy(originalKey)
      setAvailableKeys(ctrl.selectedKey)
      ctrl.loadingKey = true
      loadSubmenus()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loadingKey = false
        })
      Alert.modal.open(
        ctrl.modalId,
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
    }

    function update(keys, callback) {
      var editAutoAttendant = angular.copy(ctrl.autoAttendant)
      _.set(editAutoAttendant, [ctrl.menu, 'keys'], keys)
      ctrl.parent.update(editAutoAttendant, callback)
    }

    function setAvailableKeys(key) {
      var used = _.map(ctrl.keys, 'key')
      var available = _.difference(ctrl.options.keys, used)
      if (key.key) {
        available.push(key.key)
      }
      ctrl.availableKeys = available.sort()
    }
  }
})()
