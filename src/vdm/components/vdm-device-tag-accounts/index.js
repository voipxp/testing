import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.vdm').component('vdmDeviceTagAccounts', {
  template,
  controller,
  bindings: { tags: '<', deviceTemplate: '<' },
  require: { parent: '^vdmDeviceTags' }
})

controller.$inject = ['Alert', '$q', 'Module', 'VdmTemplateTagService']
function controller(Alert, $q, Module, VdmTemplateTagService) {
  var ctrl = this
  ctrl.$onChanges = onChanges
  ctrl.edit = edit
  ctrl.editPrimary = editPrimary
  ctrl.editEnabled = editEnabled

  var ringtones = VdmTemplateTagService.ringtones

  var numberAccounts = VdmTemplateTagService.numberAccounts

  ctrl.options = { ringtones: ringtones }

  function onChanges(changes) {
    if (changes.tags && changes.tags.currentValue) loadAccounts()
  }

  /*
      %account1lines%
      %ringtone_account1%
      %account1enable%
      %default_account% = 1
    */
  function loadAccounts() {
    var number = numberAccounts[ctrl.deviceTemplate]
    var accounts = []
    for (var i = 1; i <= number; i++) {
      accounts.push({
        id: i,
        line: getTagValue('%account' + i + 'lines%'),
        enabled: getTagValue('%account' + i + 'enable%') === '1',
        primary: isPrimary(i),
        ringtone: getTagValue('%ringtone_account' + i + '%')
      })
    }
    ctrl.accounts = accounts
  }

  function findTag(name) {
    var tag = _.find(ctrl.tags, { name: name }) || { name: name, value: null }
    return angular.copy(tag)
  }

  function getTagValue(name) {
    var tag = findTag(name)
    return tag && tag.value
  }

  function isPrimary(number) {
    var primary = getTagValue('%default_account%')
    return primary == number
  }

  function edit(account) {
    if (!Module.update('VDM')) return
    ctrl.editAccount = angular.copy(account)
    Alert.modal.open('vdmDeviceAccountModal', function(close) {
      update(ctrl.editAccount, close)
    })
  }

  function editEnabled(account) {
    if (!account.enabled) account.primary = false
  }

  function editPrimary(account) {
    if (account.primary) account.enabled = true
  }

  function update(account, callback) {
    Alert.spinner.open()
    return $q
      .all([
        updatePrimary(account),
        updateEnabled(account),
        updateLine(account),
        updateRingtone(account)
      ])
      .then(ctrl.parent.reload)
      .then(function() {
        Alert.notify.success('Tags Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function updatePrimary(account) {
    var tag = findTag('%default_account%')
    tag.value = account.primary ? account.id : null
    return ctrl.parent.updateTag(tag)
  }

  function updateEnabled(account) {
    var tag = findTag('%account' + account.id + 'enable%')
    tag.value = account.enabled ? '1' : '0'
    return ctrl.parent.updateTag(tag)
  }

  function updateLine(account) {
    var tag = findTag('%account' + account.id + 'lines%')
    tag.value = account.line
    return ctrl.parent.updateTag(tag)
  }

  function updateRingtone(account) {
    var tag = findTag('%ringtone_account' + account.id + '%')
    tag.value = account.ringtone
    return ctrl.parent.updateTag(tag)
  }
}
