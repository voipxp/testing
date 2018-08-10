;(function() {
  angular.module('odin.vdm').component('vdmTemplateTagLdap', {
    templateUrl: 'vdm/components/templates/tags/ldap.component.html',
    controller: Controller,
    bindings: { tags: '<' },
    require: { parent: '^vdmTemplateTags' }
  })

  function Controller(Alert, Module, VdmTemplateTagService) {
    var ctrl = this
    ctrl.$onChanges = onChanges
    ctrl.edit = edit

    var ldapTags = VdmTemplateTagService.ldapTags

    function onChanges(changes) {
      if (changes.tags && changes.tags.currentValue) loadLdap()
    }

    function findTag(name) {
      return _.find(ctrl.tags, { name: name }) || { name: name, value: null }
    }

    function loadLdap() {
      var tags = angular.copy(ldapTags)
      tags.forEach(function(tag) {
        tag.tag = findTag(tag.name)
      })
      ctrl.ldapTags = tags
    }

    function edit(tag) {
      if (!Module.update('VDM')) return
      ctrl.password2 = null
      ctrl.editTag = angular.copy(tag)
      Alert.modal.open('vdmTemplateTagLdapModal', function(close) {
        if (
          tag.type === 'password' &&
          ctrl.editTag.tag.value !== ctrl.password2
        ) {
          Alert.notify.warning('Passwords Do Not Match')
          return
        }
        ctrl.parent.update(ctrl.editTag.tag, close)
      })
    }
  }
})()
