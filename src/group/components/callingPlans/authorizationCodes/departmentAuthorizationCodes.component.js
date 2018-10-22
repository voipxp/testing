;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanDepartmentAuthorizationCodes', {
      templateUrl:
        'group/components/callingPlans/authorizationCodes/departmentAuthorizationCodes.component.html',
      controller: Controller,
      bindings: { serviceProviderId: '=', groupId: '=', onSave: '&' },
      require: { parent: '^^groupOutgoingCallingPlanAuthorizationCodes' }
    })

  function Controller(
    Alert,
    GroupOutgoingCallingPlanAuthorizationCodeService,
    HashService,
    $scope
  ) {
    var ctrl = this

    ctrl.add = add
    ctrl.remove = remove

    ctrl.$onInit = function() {
      ctrl.modalId = HashService.guid()
      ctrl.addId = HashService.guid()
    }

    function loadCodes() {
      ctrl.loading = true
      return ctrl.parent
        .loadCodes()
        .then(function(data) {
          if (ctrl.department.default) {
            ctrl.department = _.find(data.departments, { default: true })
          } else {
            ctrl.department = _.find(data.departments, function(department) {
              return (
                ctrl.department.name === department.name &&
                ctrl.serviceProviderId == department.serviceProviderId &&
                ctrl.groupId == department.groupId
              )
            })
          }
        })
        .catch(Alert.notify.error)
        .finally(() => (ctrl.loading = false))
    }

    function add() {
      ctrl.code = {}
      $scope.authorizationCodeCreateForm &&
        $scope.authorizationCodeCreateForm.$setPristine()
      Alert.modal.open(ctrl.addId, function onSave(close) {
        create(ctrl.code, close)
      })
    }

    function create(code, callback) {
      var department = angular.copy(ctrl.department)
      department.codes = [code]
      Alert.spinner.open()
      GroupOutgoingCallingPlanAuthorizationCodeService.store(department)
        .then(loadCodes)
        .then(() => {
          Alert.notify.success('Authorization Code Created')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function remove(code) {
      var message = 'Are you sure you want to remove ' + code.code + '?'
      Alert.confirm.open(message).then(function() {
        Alert.spinner.open()
        var department = angular.copy(ctrl.department)
        department.codes = [code]
        GroupOutgoingCallingPlanAuthorizationCodeService.destroy(department)
          .then(loadCodes)
          .then(() => {
            Alert.notify.success('Authorization Code Removed')
          })
          .catch(Alert.notify.danger)
          .finally(Alert.spinner.close)
      })
    }

    $scope.$on(
      'groupOutgoingCallingPlanDepartmentAuthorizationCodes:load',
      function(event, data) {
        ctrl.department = data
        Alert.modal.open(ctrl.modalId)
      }
    )
  }
})()
