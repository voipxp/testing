import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userPriorityAlert', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = [
  '$q',
  'Alert',
  'UserPriorityAlertService',
  'UserPriorityAlertCriteriaService',
  'ACL',
  'Module'
]
function controller(
  $q,
  Alert,
  UserPriorityAlertService,
  UserPriorityAlertCriteriaService,
  ACL,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.options = UserPriorityAlertCriteriaService.options
  ctrl.hasPermission = ACL.has
  ctrl.edit = edit
  ctrl.add = add
  ctrl.toggle = toggle

  function onInit() {
    ctrl.loading = true
    $q.all([loadModule(), loadCriterias()])
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
    return Module.show('Priority Alert').then(function(data) {
      ctrl.module = data
    })
  }

  function loadCriterias() {
    return UserPriorityAlertService.show(ctrl.userId).then(function(data) {
      ctrl.criterias = data
    })
  }

  function loadCriteria(criteria) {
    return UserPriorityAlertCriteriaService.show(
      ctrl.userId,
      criteria.criteriaName
    )
  }

  function toggle(criteria) {
    criteria.isLoading = true
    // format as an array to fit API requirements
    UserPriorityAlertService.update(ctrl.userId, {
      userId: ctrl.userId,
      criteria: [criteria]
    })
      .then(function() {
        var message = criteria.isActive ? 'Activated' : 'Deactivated'
        var action = criteria.isActive
          ? Alert.notify.success
          : Alert.notify.warning
        action(criteria.criteriaName + ' ' + message)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
        criteria.isActive = !criteria.isActive
      })
      .finally(function() {
        criteria.isLoading = false
      })
  }

  function edit(criteria) {
    if (!ctrl.module.permissions.update) return
    var onDelete
    if (ctrl.module.permissions.delete) {
      onDelete = function(close) {
        Alert.confirm
          .open('Are you sure you want to delete this criteria?')
          .then(function() {
            destroy(criteria, close)
          })
      }
    }
    Alert.spinner.open()
    loadCriteria(criteria)
      .then(function(data) {
        ctrl.editCriteria = data
        ctrl.editCriteria.newCriteriaName = data.criteriaName
        Alert.modal.open(
          'editUserPriorityAlert',
          function onSave(close) {
            update(ctrl.editCriteria, close)
          },
          onDelete
        )
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function update(criteria, callback) {
    Alert.spinner.open()
    UserPriorityAlertCriteriaService.update(
      ctrl.userId,
      criteria.criteriaName,
      criteria
    )
      .then(loadCriterias)
      .then(function() {
        Alert.notify.success('Criteria Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function add() {
    ctrl.editCriteria = {
      userId: ctrl.userId,
      fromDnCriteria: {
        fromDnCriteriaSelection: 'Any External'
      }
    }
    Alert.modal.open('editUserPriorityAlert', function onSave(close) {
      ctrl.editCriteria.criteriaName = ctrl.editCriteria.newCriteriaName
      create(ctrl.editCriteria, close)
    })
  }

  function create(criteria, callback) {
    Alert.spinner.open()
    UserPriorityAlertCriteriaService.store(ctrl.userId, criteria)
      .then(loadCriterias)
      .then(function() {
        Alert.notify.success('Criteria Added')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(criteria, callback) {
    Alert.spinner.open()
    UserPriorityAlertCriteriaService.destroy(ctrl.userId, criteria.criteriaName)
      .then(loadCriterias)
      .then(function() {
        Alert.notify.success('Criteria Deleted')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
