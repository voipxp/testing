;(function() {
  angular.module('odin.vdm').component('vdmDeviceTagMulticast', {
    templateUrl: 'vdm/components/device/tags/multicast.component.html',
    controller: Controller,
    bindings: { tags: '<' },
    require: { parent: '^vdmDeviceTags' }
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
      var tag = _.find(ctrl.tags, { name: name }) || { name: name, value: null }
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
      tag.value = group.label
      return ctrl.parent.updateTag(tag)
    }

    function updateIP(group) {
      var tag = findTag('%multicastip' + group.id + '%')
      tag.value = group.enabled ? group.ip : null
      return ctrl.parent.updateTag(tag)
    }
  }
})()
