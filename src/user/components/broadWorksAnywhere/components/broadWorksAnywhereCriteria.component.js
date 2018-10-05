;(function() {
  angular.module('odin.user').component('userBroadWorksAnywhereCriteria', {
    templateUrl:
      'user/components/broadWorksAnywhere/components/broadWorksAnywhereCriteria.component.html',
    controller: Controller,
    bindings: { userId: '<', number: '<' },
    require: { parent: '^userBroadWorksAnywhere' }
  })

  function Controller(
    Alert,
    UserBroadworksAnywhereServiceSelectiveCriteria,
    PhoneNumberBroadWorksAnywhereService,
    HashService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.add = add
    ctrl.options = UserBroadworksAnywhereServiceSelectiveCriteria.options

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function loadCriteria(criteria) {
      return UserBroadworksAnywhereServiceSelectiveCriteria.show(
        ctrl.userId,
        ctrl.number.phoneNumber,
        criteria.criteriaName
      )
    }

    function edit(criteria) {
      Alert.spinner.open()
      loadCriteria(criteria)
        .then(function(data) {
          ctrl.editCriteria = angular.extend({}, data, criteria)
          ctrl.editCriteria.newCriteriaName = criteria.criteriaName
          Alert.modal.open(
            ctrl.modalId,
            function(close) {
              update(ctrl.editCriteria, close)
            },
            function(close) {
              Alert.confirm
                .open('Are you sure you want to delete this Criteria?')
                .then(function() {
                  destroy(ctrl.editCriteria, close)
                })
            }
          )
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function update(criteria, callback) {
      Alert.spinner.open()
      UserBroadworksAnywhereServiceSelectiveCriteria.update(
        ctrl.userId,
        ctrl.number.phoneNumber,
        criteria.criteriaName,
        criteria
      )
        .then(function() {
          return activate(criteria)
        })
        .then(ctrl.parent.reload)
        .then(function() {
          Alert.notify.success('Criteria Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(criteria, callback) {
      Alert.spinner.open()
      UserBroadworksAnywhereServiceSelectiveCriteria.destroy(
        ctrl.userId,
        ctrl.number.phoneNumber,
        criteria.criteriaName
      )
        .then(ctrl.parent.reload)
        .then(function() {
          Alert.notify.danger('Criteria Removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function add() {
      ctrl.editCriteria = {
        userId: ctrl.userId,
        phoneNumber: ctrl.number.phoneNumber
      }
      Alert.modal.open(ctrl.modalId, function(close) {
        ctrl.editCriteria.criteriaName = ctrl.editCriteria.newCriteriaName
        create(ctrl.editCriteria, close)
      })
    }

    function create(criteria, callback) {
      Alert.spinner.open()
      UserBroadworksAnywhereServiceSelectiveCriteria.store(
        ctrl.userId,
        ctrl.number.phoneNumber,
        criteria
      )
        .then(function() {
          return activate(criteria)
        })
        .then(ctrl.parent.reload)
        .then(function() {
          Alert.notify.success('Criteria Added')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function activate(criteria) {
      var activation = {
        userId: ctrl.userId,
        phoneNumber: ctrl.number.phoneNumber,
        criteria: [
          {
            criteriaName: criteria.newCriteriaName || criteria.criteriaName,
            isActive: criteria.isActive
          }
        ]
      }
      return PhoneNumberBroadWorksAnywhereService.update(
        ctrl.userId,
        ctrl.number.phoneNumber,
        activation
      )
    }
  }
})()
