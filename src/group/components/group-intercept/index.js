import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupIntercept', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = ['$routeParams', 'Alert', 'GroupInterceptService']
function controller($routeParams, Alert, GroupInterceptService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.edit = edit
  ctrl.options = GroupInterceptService.options
  ctrl.setOutboundCallOptions = setOutboundCallOptions
  ctrl.upload = upload

  function onInit() {
    ctrl.loading = true
    return load()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function load() {
    return GroupInterceptService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.settings = data
      if (ctrl.settings.allowOutboundLocalCalls === true)
        ctrl.outboundCallOption = 'Allow Outbound Local Calls'
      else if (ctrl.settings.rerouteOutboundCalls === true)
        ctrl.outboundCallOption = 'Route to Phone Number'
      else ctrl.outboundCallOption = 'Block All Outbound Calls'
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editGroupInterceptModal', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    settings.serviceProviderId = ctrl.serviceProviderId
    settings.groupId = ctrl.groupId
    GroupInterceptService.update(settings)
      .then(load)
      .then(function() {
        Alert.notify.success('Settings Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
  function setOutboundCallOptions() {
    if (ctrl.outboundCallOption === 'Allow Outbound Local Calls') {
      ctrl.editSettings.allowOutboundLocalCalls = true
      ctrl.editSettings.rerouteOutboundCalls = false
    } else if (ctrl.outboundCallOption === 'Route to Phone Number') {
      ctrl.editSettings.allowOutboundLocalCalls = false
      ctrl.editSettings.rerouteOutboundCalls = true
    } else {
      ctrl.editSettings.allowOutboundLocalCalls = false
      ctrl.editSettings.rerouteOutboundCalls = false
    }
  }

  function upload(file) {
    // ctrl.editSettings.announcementSelection.name = file.name
    ctrl.editSettings.audioMediaContent = file.content
    ctrl.editSettings.audioMediaType = 'WAV'
    ctrl.editSettings.audioFileDescription = file.name
  }
}
