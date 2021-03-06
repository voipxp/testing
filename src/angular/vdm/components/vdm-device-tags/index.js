import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.vdm').component('vdmDeviceTags', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    deviceName: '<',
    template: '<'
  }
})

controller.$inject = [
  'Alert',
  'GroupDeviceTagService',
  'VdmTemplateTagService',
  'VdmGroupTemplateTagService',
  '$q'
]
function controller(
  Alert,
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
    return $q.all([loadDeviceTags(), loadTemplateTags()]).then(function(data) {
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
