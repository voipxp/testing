;(function() {
  angular.module('odin.group').component('groupDeviceTypeTags', {
    templateUrl: 'group/components/deviceTypes/tags.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      deviceType: '<'
    }
  })

  function Controller(Alert, GroupDeviceTypeTagService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.edit = edit

    function onInit() {
      ctrl.loading = true
      loadTags()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadTags() {
      return GroupDeviceTypeTagService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.deviceType
      ).then(function(data) {
        ctrl.tags = data
      })
    }

    function add() {
      ctrl.editTag = {}
      ctrl.action = 'Add'
      Alert.modal.open('groupDeviceTypeTagsEditModal', function(close) {
        if (!/^%/.test(ctrl.editTag.tagName)) {
          ctrl.editTag.tagName = '%' + ctrl.editTag.tagName
        }
        if (!/%$/.test(ctrl.editTag.tagName)) {
          ctrl.editTag.tagName = ctrl.editTag.tagName + '%'
        }
        create(ctrl.editTag, close)
      })
    }

    function edit(tag) {
      ctrl.editTag = angular.copy(tag)
      ctrl.action = 'Update'
      Alert.modal.open(
        'groupDeviceTypeTagsEditModal',
        function(close) {
          update(ctrl.editTag, close)
        },
        function(close) {
          Alert.confirm
            .open('Are you sure you want to remove this tag?')
            .then(function() {
              destroy(ctrl.editTag, close)
            })
        }
      )
    }

    function create(tag, callback) {
      Alert.spinner.open()
      GroupDeviceTypeTagService.store(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.deviceType,
        tag
      )
        .then(loadTags)
        .then(function() {
          Alert.notify.success('Tag Added')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function update(tag, callback) {
      Alert.spinner.open()
      GroupDeviceTypeTagService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.deviceType,
        tag
      )
        .then(loadTags)
        .then(function() {
          Alert.notify.success('Tag Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(tag, callback) {
      Alert.spinner.open()
      GroupDeviceTypeTagService.destroy(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.deviceType,
        tag.tagName
      )
        .then(loadTags)
        .then(function() {
          Alert.notify.warning('Tag Removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
