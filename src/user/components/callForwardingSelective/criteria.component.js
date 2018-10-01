;(function() {
  angular.module('odin.user').component('userCallForwardingSelectiveCriteria', {
    templateUrl:
      'user/components/callForwardingSelective/criteria.component.html',
    controller: Controller,
    require: { parent: '^userCallForwardingSelective' },
    bindings: { userId: '<' }
  })

  function Controller(
    $q,
    Alert,
    UserCallForwardingSelectiveCriteriaService,
    ACL,
    Module
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.options = UserCallForwardingSelectiveCriteriaService.options
    ctrl.add = add
    ctrl.edit = edit
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
      return Module.show('Call Forwarding Selective').then(function(data) {
        ctrl.module = data
      })
    }

    function loadCriterias() {
      return UserCallForwardingSelectiveCriteriaService.index(ctrl.userId).then(
        function(data) {
          ctrl.criterias = data
        }
      )
    }

    function loadCriteria(criteria) {
      return UserCallForwardingSelectiveCriteriaService.show(
        ctrl.userId,
        criteria.criteriaName
      )
    }

    function add() {
      ctrl.editCriteria = {
        userId: ctrl.userId,
        forwardToNumberSelection: 'Forward To Default Number',
        fromDnCriteria: {
          fromDnCriteriaSelection: 'Any'
        }
      }
      Alert.modal.open('editUserCallForwardingSelectiveCriteria', function(
        close
      ) {
        create(ctrl.editCriteria, close)
      })
    }

    function edit(criteria) {
      Alert.spinner.open()
      loadCriteria(criteria)
        .then(function(data) {
          ctrl.editCriteria = data
          ctrl.editCriteria.newCriteriaName = ctrl.editCriteria.criteriaName
        })
        .then(function() {
          Alert.modal.open(
            'editUserCallForwardingSelectiveCriteria',
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

    function toggle(criteria) {
      criteria.isLoading = true
      ctrl.parent
        .toggleCriteria(criteria)
        .then(loadCriterias)
        .catch(function(error) {
          Alert.notify.danger(error)
          criteria.isActive = !criteria.isActive
        })
        .finally(function() {
          criteria.isLoading = false
        })
    }

    function update(criteria, callback) {
      Alert.spinner.open()
      UserCallForwardingSelectiveCriteriaService.update(
        ctrl.userId,
        criteria.criteriaName,
        criteria
      )
        .then(loadCriterias)
        .then(ctrl.parent.reload)
        .then(function() {
          Alert.notify.success('Criteria Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function create(criteria, callback) {
      criteria.criteriaName = criteria.newCriteriaName
      Alert.spinner.open()
      UserCallForwardingSelectiveCriteriaService.create(ctrl.userId, criteria)
        .then(loadCriterias)
        .then(ctrl.parent.reload)
        .then(function() {
          Alert.notify.success('Criteria Added')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(criteria, callback) {
      Alert.spinner.open()
      UserCallForwardingSelectiveCriteriaService.destroy(
        ctrl.userId,
        criteria.criteriaName
      )
        .then(loadCriterias)
        .then(ctrl.parent.reload)
        .then(function() {
          Alert.notify.success('Criteria Deleted')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
