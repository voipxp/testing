;(function() {
  angular.module('odin.vdm').component('vdmTemplateTags', {
    templateUrl: 'vdm/components/templates/tags.component.html',
    controller: Controller,
    bindings: { template: '<', serviceProviderId: '<', groupId: '<' }
  })

  function Controller(
    Alert,
    VdmSystemTemplateTagService,
    VdmGroupTemplateTagService,
    VdmTemplateTagService
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

    function isGroup() {
      return ctrl.serviceProviderId && ctrl.groupId
    }

    function loadTags() {
      var action = isGroup() ? loadGroupTags : loadSystemTags
      return action().then(function(data) {
        ctrl.tags = data
      })
    }

    function loadSystemTags() {
      return VdmSystemTemplateTagService.index(ctrl.template.id)
    }

    function loadGroupTags() {
      return VdmGroupTemplateTagService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.template.id
      )
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
      return isGroup() ? updateGroup(tag) : updateSystem(tag)
    }

    function updateSystem(tag) {
      return tag.id
        ? VdmSystemTemplateTagService.update(ctrl.template.id, tag)
        : VdmSystemTemplateTagService.store(ctrl.template.id, tag)
    }

    function updateGroup(tag) {
      return tag.id
        ? VdmGroupTemplateTagService.update(
            ctrl.serviceProviderId,
            ctrl.groupId,
            ctrl.template.id,
            tag
          )
        : VdmGroupTemplateTagService.store(
            ctrl.serviceProviderId,
            ctrl.groupId,
            ctrl.template.id,
            tag
          )
    }
  }
})()
