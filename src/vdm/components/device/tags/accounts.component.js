;(function() {
  angular.module('odin.vdm').component('vdmDeviceTagAccounts', {
    templateUrl: 'vdm/components/device/tags/accounts.component.html',
    controller: Controller,
    bindings: { tags: '<', deviceTemplate: '<' },
    require: { parent: '^vdmDeviceTags' }
  })

  function Controller(Alert, $q, Module, VdmTemplateTagService) {
    var ctrl = this
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    ctrl.editPrimary = editPrimary
    ctrl.editEnabled = editEnabled

    var ringtones = VdmTemplateTagService.ringtones

    var numAccounts = VdmTemplateTagService.numAccounts

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
      var num = numAccounts[ctrl.deviceTemplate]
      var accounts = []
      for (var i = 1; i <= num; i++) {
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
      var tag = _.find(ctrl.tags, { name: name })
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
        if (_.isEqual(ctrl.editAccount, account)) return close()
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
      if (account.primary) {
        // bail if already set
        if (tag.value == account.id) return $q.when(true)
        tag.value = account.id
      } else {
        // bail if already set
        if (tag.value != account.id) return $q.when(true)
        tag.value = null
      }
      return ctrl.parent.updateTag(tag)
    }

    function updateEnabled(account) {
      var tag = findTag('%account' + account.id + 'enable%')
      var currentlyEnabled = tag.value === '1'
      // bail if already set
      if (account.enabled === currentlyEnabled) return $q.when(true)
      tag.value = account.enabled ? '1' : '0'
      return ctrl.parent.updateTag(tag)
    }

    function updateLine(account) {
      var tag = findTag('%account' + account.id + 'lines%')
      // bail if already set
      if (account.line === tag.value) return $q.when(true)
      tag.value = account.line
      return ctrl.parent.updateTag(tag)
    }

    function updateRingtone(account) {
      var tag = findTag('%ringtone_account' + account.id + '%')
      // bail if already set
      if (account.ringtone === tag.value) return $q.when(true)
      tag.value = account.ringtone
      return ctrl.parent.updateTag(tag)
    }
  }
})()
