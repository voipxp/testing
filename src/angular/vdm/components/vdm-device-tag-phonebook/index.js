import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.vdm').component('vdmDeviceTagPhonebook', {
  template,
  controller,
  bindings: { tags: '<' },
  require: { parent: '^vdmDeviceTags' }
})

controller.$inject = ['Alert', 'Module', 'VdmTemplateTagService']
function controller(Alert, Module, VdmTemplateTagService) {
  var ctrl = this
  ctrl.$onChanges = onChanges
  ctrl.edit = edit

  var phonebookTags = VdmTemplateTagService.phonebookTags

  function onChanges(changes) {
    if (changes.tags && changes.tags.currentValue) loadTags()
  }

  function findTag(name) {
    return _.find(ctrl.tags, { name: name }) || { name: name, value: null }
  }

  function loadTags() {
    var tags = angular.copy(phonebookTags)
    tags.forEach(function(tag) {
      tag.tag = findTag(tag.name)
    })
    ctrl.phonebookTags = tags
  }

  function edit(tag) {
    if (!Module.update('VDM')) return
    ctrl.editTag = angular.copy(tag)
    Alert.modal.open('vdmTemplateTagPhonebookModal', function(close) {
      ctrl.parent.update(ctrl.editTag.tag, close)
    })
  }
}
