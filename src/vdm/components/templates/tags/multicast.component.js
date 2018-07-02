;(function() {
  angular.module('odin.vdm').component('vdmTemplateTagMulticast', {
    templateUrl: 'vdm/components/templates/tags/multicast.component.html',
    controller: Controller,
    bindings: { tags: '<' },
    require: { parent: '^vdmTemplateTags' }
  })

  function Controller(Alert, $q, Module) {
    var ctrl = this
    ctrl.$onChanges = onChanges
    ctrl.edit = edit

    ctrl.options = {}

    function onChanges(changes) {
      if (changes.tags && changes.tags.currentValue) loadMulticastGroups()
    }

    function loadMulticastGroups() {
      var groups = []
      for (var i = 1; i <= 10; i++) {
        var ipPrefix = i < 10 ? '224.0.0.69:1690' : '224.0.0.69:169'
        groups.push({
          id: i,
          label: getTagValue('%multicastlabel' + i + '%') || 'Group ' + i,
          ip: ipPrefix + i,
          enabled: !!getTagValue('%multicastip' + i + '%')
        })
      }
      ctrl.groups = groups
    }

    function findTag(name) {
      var tag = _.find(ctrl.tags, { name: name })
      return angular.copy(tag)
    }

    function getTagValue(name) {
      var tag = findTag(name)
      return tag && tag.value
    }

    function edit(group) {
      if (!Module.update('VDM')) return
      ctrl.editGroup = angular.copy(group)
      Alert.modal.open('vdmTemplateMulticastModal', function(close) {
        if (_.isEqual(ctrl.editGroup, group)) return close()
        update(ctrl.editGroup, close)
      })
    }

    function update(group, callback) {
      Alert.spinner.open()
      $q.all([updateLabel(group), updateIP(group)])
        .then(ctrl.parent.reload)
        .then(function() {
          Alert.notify.success('Multicast Group Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function updateLabel(group) {
      var tag = findTag('%multicastlabel' + group.id + '%')
      // bail if already set
      if (group.label === tag.value) return $q.when(true)
      tag.value = group.label
      return ctrl.parent.updateTag(tag)
    }

    function updateIP(group) {
      var tag = findTag('%multicastip' + group.id + '%')
      if (group.enabled) {
        // bail if already set
        if (group.ip === tag.value) return $q.when(true)
        tag.value = group.ip
      } else {
        // bail if already set
        if (!tag.value) return $q.when(true)
        tag.value = null
      }
      return ctrl.parent.updateTag(tag)
    }
  }
})()
