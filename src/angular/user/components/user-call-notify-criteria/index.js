import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCallNotifyCriteria', {
  template,
  controller,
  require: { parent: '^userCallNotify' }
})

controller.$inject = ['Alert', 'UserCallNotifyCriteriaService', 'Module']
function controller(Alert, UserCallNotifyCriteriaService, Module) {
  var ctrl = this

  ctrl.edit = edit
  ctrl.add = add
  ctrl.options = UserCallNotifyCriteriaService.options

  function loadCriteria(criteria) {
    return UserCallNotifyCriteriaService.show(
      ctrl.parent.userId,
      criteria.criteriaName
    )
  }

  function edit(criteria) {
    Alert.spinner.open()
    var deleteAction
    if (Module.delete(ctrl.parent.module)) {
      deleteAction = function(close) {
        Alert.confirm
          .open('Are you sure you want to delete this Criteria?')
          .then(function() {
            destroy(ctrl.editCriteria, close)
          })
      }
    }
    loadCriteria(criteria)
      .then(function(data) {
        ctrl.editCriteria = angular.extend({}, data, criteria)
        ctrl.editCriteria.newCriteriaName = criteria.criteriaName
        Alert.modal.open(
          'editUserCallNotifyCriteria',
          function(close) {
            update(ctrl.editCriteria, close)
          },
          deleteAction
        )
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function update(criteria, callback) {
    Alert.spinner.open()
    UserCallNotifyCriteriaService.update(ctrl.parent.userId, criteria)
      .then(function() {
        return ctrl.parent.activate(criteria)
      })
      .then(function() {
        Alert.notify.success('Criteria Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(criteria, callback) {
    Alert.spinner.open()
    UserCallNotifyCriteriaService.destroy(
      ctrl.parent.userId,
      criteria.criteriaName
    )
      .then(ctrl.parent.reload)
      .then(function() {
        Alert.notify.warning('Criteria Removed')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function add() {
    if (!ctrl.parent.settings.callNotifyEmailAddress) {
      Alert.notify.warning('Please add a Notify Email Address')
      return
    }
    ctrl.editCriteria = {
      userId: ctrl.parent.userId,
      blacklisted: false,
      isActive: false
    }
    Alert.modal.open('editUserCallNotifyCriteria', function(close) {
      ctrl.editCriteria.criteriaName = ctrl.editCriteria.newCriteriaName
      create(ctrl.editCriteria, close)
    })
  }

  function create(criteria, callback) {
    Alert.spinner.open()
    UserCallNotifyCriteriaService.store(ctrl.parent.userId, criteria)
      .then(function() {
        return ctrl.parent.activate(criteria)
      })
      .then(function() {
        Alert.notify.success('Criteria Added')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
