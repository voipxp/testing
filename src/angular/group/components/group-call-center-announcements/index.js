import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterAnnouncements', {
  template,
  controller,
  bindings: {
    serviceUserId: '<',
    dnisId: '<',
    serviceType: '@',
    callCenterType: '<'
  }
})

controller.$inject = [
  'Alert',
  'GroupCallCenterAnnouncementService',
  'GroupCallCenterDnisAnnouncementService',
  '$filter',
  'Module'
]
function controller(
  Alert,
  GroupCallCenterAnnouncementService,
  GroupCallCenterDnisAnnouncementService,
  $filter,
  Module
) {
  var ctrl = this
  ctrl.edit = edit
  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.canUpdate = Module.update('Call Center')
  var Service

  function onInit() {
    setServiceType()
    ctrl.loading = true
    loadAnnouncements()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onChanges(changes) {
    if (changes.serviceUserId) {
      ctrl.serviceUserId = changes.serviceUserId.currentValue
    }
    if (changes.dnisId) {
      ctrl.dnisId = changes.dnisId.currentValue
    }
  }

  function isDnis() {
    return ctrl.serviceType === 'Dnis'
  }

  function setServiceType() {
    Service = isDnis() ? GroupCallCenterDnisAnnouncementService : GroupCallCenterAnnouncementService
    ctrl.options = Service.options
  }

  function loadAnnouncements() {
    var Method
    if (isDnis()) {
      Method = Service.show(ctrl.serviceUserId, ctrl.dnisId)
    } else {
      Method = Service.show(ctrl.serviceUserId)
    }
    return Method.then(function(data) {
      ctrl.announcements = data
      return data
    })
  }

  function edit(section) {
    ctrl.editAnnouncements = angular.copy(ctrl.announcements)
    var modalId = 'editGroupCallCenterAnnouncements' + section
    ctrl.modalTitle = 'Edit ' + $filter('humanize')(section)
    Alert.modal.open(modalId, function onSave(close) {
      update(ctrl.editAnnouncements, close)
    })
  }

  function update(announcements, callback) {
    Alert.spinner.open()
    var Method
    if (isDnis()) {
      Method = Service.update(ctrl.serviceUserId, ctrl.dnisId, announcements)
    } else {
      Method = Service.update(ctrl.serviceUserId, announcements)
    }
    Method.then(loadAnnouncements)
      .then(function() {
        Alert.notify.success('Announcements Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
