import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userAlternateNumbers', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
})

controller.$inject = ['Alert', 'AlternateNumbersService', 'Module', '$q']
function controller(Alert, AlternateNumbersService, Module, $q) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.options = AlternateNumbersService.options
  ctrl.selectNumber = selectNumber
  ctrl.edit = edit
  ctrl.editAlternateEntry = editAlternateEntry

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadSettings(), loadModule()])
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
    return Module.show('Alternate Numbers').then(function(data) {
      ctrl.module = data
      ctrl.canEdit = ctrl.module.permissions.update
    })
  }

  function loadSettings() {
    return AlternateNumbersService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
      return ctrl.settings
    })
  }

  function selectNumber(event) {
    ctrl.editEntry.phoneNumber = event.phoneNumber
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    delete ctrl.editSettings.alternateEntries
    Alert.modal.open('userAlternateNumbersEditModal', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function editAlternateEntry(entry) {
    if (!ctrl.canEdit) return
    ctrl.editEntry = angular.copy(entry)
    var deleteAction
    if (entry.phoneNumber || entry.extension || entry.ringPattern) {
      deleteAction = function(close) {
        Alert.confirm
          .open('Are you sure you want to clear this entry?')
          .then(function() {
            updateEntry({ alternateEntryId: entry.alternateEntryId }, close)
          })
      }
    }
    Alert.modal.open(
      'userAlternateNumbersEditEntryModal',
      function(close) {
        updateEntry(ctrl.editEntry, close)
      },
      deleteAction
    )
  }

  function updateEntry(entry, callback) {
    var settings = angular.copy(ctrl.settings)
    var original = _.find(settings.alternateEntries, {
      alternateEntryId: entry.alternateEntryId
    })
    var index = _.indexOf(settings.alternateEntries, original)
    settings.alternateEntries.splice(index, 1, entry)
    update(settings, callback)
  }

  function update(settings, callback) {
    Alert.spinner.open()
    AlternateNumbersService.update(settings)
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Settings Update')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
