import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userCallForwardingSelective', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = [
  '$q',
  'Alert',
  'UserCallForwardingSelectiveService',
  'UserCallForwardingSelectiveCriteriaService',
  'Module'
]
function controller(
  $q,
  Alert,
  UserCallForwardingSelectiveService,
  UserCallForwardingSelectiveCriteriaService,
  Module
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.checkForActive = checkForActive
  ctrl.hasActiveCriteria = hasActiveCriteria
  ctrl.options = UserCallForwardingSelectiveCriteriaService.options
  ctrl.edit = edit
  ctrl.toggle = toggle
  ctrl.toggleCriteria = toggleCriteria
  ctrl.reload = loadSettings

  function onInit() {
    ctrl.loading = true
    $q.all([loadModule(), loadSettings()])
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
    return Module.show('Call Forwarding Selective').then(function(data) {
      ctrl.module = data
    })
  }

  function hasActiveCriteria() {
    return _.find(ctrl.settings.criteria, { isActive: true })
  }

  function checkForActive() {
    if (ctrl.editSettings.isActive && !hasActiveCriteria()) {
      Alert.notify.warning('An Active Criteria is Required To Enable')
      ctrl.editSettings.isActive = false
    }
  }

  function loadSettings() {
    return UserCallForwardingSelectiveService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editUserCallForwardingSelective', function(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    return (
      UserCallForwardingSelectiveService.update(ctrl.userId, settings)
        // .then(loadSettings)
        .then(function(data) {
          ctrl.settings = data
        })
        .then(function() {
          Alert.notify.success('Settings Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    )
  }

  // toggle isActive on settings
  // then reload
  function toggle() {
    var isActive = ctrl.settings.isActive
    if (isActive && !hasActiveCriteria()) return
    ctrl.settings.isLoading = true
    return UserCallForwardingSelectiveService.update(ctrl.userId, ctrl.settings)
      .then(function() {
        var message = isActive ? 'Activated' : 'Deactivated'
        var action = isActive ? Alert.notify.success : Alert.notify.warning
        action('Call Forwarding Selective ' + message)
      })
      .catch(Alert.notify.danger)
      .finally(loadSettings)
  }

  // toggle isActive on a criteria
  // then reload settings
  function toggleCriteria(criteria) {
    var editSettings = angular.copy(ctrl.settings)
    var original = _.find(editSettings.criteria, {
      criteriaName: criteria.criteriaName
    })
    original.isActive = !original.isActive
    var active = _.find(editSettings.criteria, { isActive: true })
    if (!active) {
      editSettings.isActive = false
    }
    return (
      UserCallForwardingSelectiveService.update(ctrl.userId, editSettings)
        .then(function(data) {
          ctrl.settings = data
        })
        // .then(loadSettings)
        .then(function() {
          var message = criteria.isActive ? 'Activated' : 'Deactivated'
          var action = criteria.isActive ? Alert.notify.success : Alert.notify.warning
          action(criteria.criteriaName + ' ' + message)
        })
    )
  }
}
