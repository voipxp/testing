;(function() {
  angular.module('odin.vdm').component('vdmDeviceTags', {
    templateUrl: 'vdm/components/device/tags.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      deviceName: '<',
      template: '<'
    }
  })

  function Controller(
    Alert,
    Route,
    GroupDeviceTagService,
    VdmTemplateTagService,
    VdmGroupTemplateTagService,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.reload = loadTags
    ctrl.updateTag = updateTag
    ctrl.update = update

    function onInit() {
      ctrl.loading = true
      ctrl.keyPattern = VdmTemplateTagService.keyPattern(
        ctrl.template.deviceTemplate
      )
      loadTags()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadTags() {
      return $q
        .all([loadDeviceTags(), loadTemplateTags()])
        .then(function(data) {
          console.log('deviceTags', data[0])
          var deviceTags = data[0]
          var templateTags = data[1]
          mergeTags(deviceTags, templateTags)
        })
    }

    function loadDeviceTags() {
      return GroupDeviceTagService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.deviceName
      )
    }

    function loadTemplateTags() {
      return VdmGroupTemplateTagService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.template.id
      )
    }

    function mergeTags(deviceTags, templateTags) {
      var tags = templateTags.map(function(tag) {
        tag.templateValue = tag.value
        var deviceTag = _.find(deviceTags, { tagName: tag.name })
        if (!deviceTag) {
          tag.value = null
        } else {
          tag.value = deviceTag.tagValue ? String(deviceTag.tagValue) : null
        }
        return tag
      })
      console.log('tags', tags)
      ctrl.tags = tags
    }

    function update(tag, callback) {
      Alert.spinner.open()
      updateTag(tag)
        .then(loadTags)
        .then(function() {
          Alert.notify.success('Tag Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function updateTag(tag) {
      var update = {
        tagName: tag.name,
        tagValue: tag.value
      }
      return GroupDeviceTagService.store(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.deviceName,
        update
      )
    }
  }
})()
