import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.vdm').component('vdmDeviceTagKeys', {
  template,
  controller,
  bindings: { tags: '<', deviceTemplate: '<', pattern: '<' },
  require: { parent: '^vdmDeviceTags' }
})

controller.$inject = [
  'Alert',
  'HashService',
  '$q',
  'Module',
  'ACL',
  'VdmTemplateTagService'
]
function controller(
  Alert,
  HashService,
  $q,
  Module,
  ACL,
  VdmTemplateTagService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.edit = edit
  ctrl.isAdmin = function() {
    return ACL.has('Provisioning')
  }

  ctrl.editType = editType
  ctrl.editMulticast = editMulticast
  ctrl.showLabel = showLabel
  ctrl.showLine = showLine
  ctrl.showMulticast = showMulticast
  ctrl.showValue = showValue
  ctrl.showExtension = showExtension
  ctrl.showPhonebook = showPhonebook

  var types = VdmTemplateTagService.types
  var numberKeys = VdmTemplateTagService.numberKeys
  var numberAccounts = VdmTemplateTagService.numberAccounts

  ctrl.options = {
    types: types
  }

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function onChanges(changes) {
    if (changes.tags && changes.tags.currentValue) {
      loadKeys()
      loadMulticastGroups()
      loadLines()
      loadPhonebooks()
    }
  }

  /*
      %key1type%
      %key1value%
      %key1label%
      %key1line%
      %key1extension%
    */
  function loadKeys() {
    var keys = {}
    for (var i = 1; i <= numberKeys[ctrl.deviceTemplate]; i++) {
      var key = {
        id: i,
        type: getTagValue('%key' + i + 'type%'),
        value: getTagValue('%key' + i + 'value%'),
        label: getTagValue('%key' + i + 'label%'),
        line: getTagValue('%key' + i + 'line%'),
        extension: getTagValue('%key' + i + 'extension%'),
        phonebook: getTagValue('%key' + i + 'xml_phonebook%')
      }
      var typeTag = findTag('%key' + i + 'type%')
      /* eslint-disable-next-line eqeqeq*/
      key.locked = typeTag.activeGroup == 0
      keys[i] = key
    }
    ctrl.keys = keys
  }

  function loadMulticastGroups() {
    var multicast = []
    for (var i = 1; i <= 10; i++) {
      var ipPrefix = i < 10 ? '224.0.0.69:1690' : '224.0.0.69:169'
      multicast.push({
        id: i,
        label: getTagValue('%multicastlabel' + i + '%') || 'Group ' + i,
        ip: ipPrefix + i,
        enabled: !!getTagValue('%multicastip' + i + '%')
      })
    }
    ctrl.options.multicast = multicast
  }

  function loadLines() {
    var lines = []
    for (var i = 1; i <= numberAccounts[ctrl.deviceTemplate]; i++) {
      lines.push({ label: 'Account ' + i, id: String(i) })
    }
    ctrl.options.lines = lines
  }

  function loadPhonebooks() {
    var books = []
    for (var i = 1; i <= 6; i++) {
      var value = getTagValue('%REMOTE_PHONEBOOK_' + i + '_NAME%')
      if (value) books.push(value)
    }
    ctrl.options.phonebooks = books
  }

  function findTag(name) {
    var tag = _.find(ctrl.tags, { name: name }) || { name: name, value: null }
    return angular.copy(tag)
  }

  function getTagValue(name) {
    var tag = findTag(name)
    return tag && tag.value
  }

  function findMulticast(ip) {
    return _.find(ctrl.options.multicast, { ip: ip })
  }

  function edit(id) {
    if (!Module.update('VDM')) return
    var key = ctrl.keys[id]
    ctrl.editKey = angular.copy(key)
    Alert.modal.open(ctrl.modalId, function(close) {
      update(ctrl.editKey, close)
    })
  }

  function editType(key) {
    key.label = types[key.type]
    if (!showLabel(key.type)) {
      key.label = null
    }
    if (!showValue(key.type)) {
      key.value = null
    }
    if (!showLine(key.type)) {
      key.line = null
    }
    if (!showExtension(key.type)) {
      key.extension = null
    }
  }

  function editMulticast(key) {
    var multicast = findMulticast(key.value)
    key.label = _.get(multicast, 'label')
  }

  function showLabel(type) {
    return hideOn(['0', '24'], type)
  }

  function showMulticast(type) {
    return showOn(['24'], type)
  }

  function showValue(type) {
    return showOn(
      [
        '1',
        '2',
        '3',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '23',
        '40',
        '55',
        '56'
      ],
      type
    )
  }

  function showPhonebook(type) {
    return showOn(['22'], type)
  }

  function showLine(type) {
    return showOn(
      ['9', '10', '12', '13', '14', '15', '23', '39', '46', '55', '56'],
      type
    )
  }

  function showExtension(type) {
    return showOn(['55'], type)
  }

  function hideOn(types, type) {
    return !types.includes(type)
  }

  function showOn(types, type) {
    return types.includes(type)
  }

  function update(key, callback) {
    Alert.spinner.open()
    return $q
      .all([
        updateLabel(key),
        updateLine(key),
        updateExtension(key),
        updateType(key),
        updateValue(key),
        updatePhonebook(key)
      ])
      .then(ctrl.parent.reload)
      .then(function() {
        Alert.notify.success('Key Updated')
        callback()
      })
      .finally(Alert.spinner.close)
  }

  function updateLabel(key) {
    var tag = findTag('%key' + key.id + 'label%')
    tag.value = key.label
    return ctrl.parent.updateTag(tag)
  }

  function updateLine(key) {
    var tag = findTag('%key' + key.id + 'line%')
    tag.value = key.line
    return ctrl.parent.updateTag(tag)
  }

  // both locked and type on this tag
  function updateType(key) {
    var tag = findTag('%key' + key.id + 'type%')
    tag.value = key.type
    tag.activeGroup = key.locked ? 0 : 1
    return ctrl.parent.updateTag(tag)
  }

  function updateExtension(key) {
    var tag = findTag('%key' + key.id + 'extension%')
    tag.value = key.extension
    return ctrl.parent.updateTag(tag)
  }

  function updateValue(key) {
    var tag = findTag('%key' + key.id + 'value%')
    tag.value = key.value
    return ctrl.parent.updateTag(tag)
  }

  function updatePhonebook(key) {
    console.log('key', key)
    var tag = findTag('%key' + key.id + 'xml_phonebook%')
    tag.value = key.phonebook
    return ctrl.parent.updateTag(tag)
  }
}
