;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanDepartmentAuthorizationCodes', {
      templateUrl:
        'group/components/callingPlans/authorizationCodes/departmentAuthorizationCodes.component.html',
      controller: Controller,
      bindings: { serviceProviderId: '=', groupId: '=', onSave: '&' }
    })

  function Controller(
    $routeParams,
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
      var department =
        ctrl.department.department && ctrl.department.department.name
      return GroupOutgoingCallingPlanAuthorizationCodeService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        department
      ).then(function(data) {
        ctrl.department.codes = data.codes
        console.log('department', ctrl.department)
        return data
      })
    }

    function load() {
      Alert.modal.open(ctrl.modalId)
    }

    function addDepartment(code) {
      code.department = ctrl.department.department
    }

    function add() {
      ctrl.code = {}
      if ($scope.authorizationCodeCreateForm) {
        $scope.authorizationCodeCreateForm.$setPristine()
      }
      Alert.modal.open(ctrl.addId, function onSave(close) {
        create(ctrl.code, close)
      })
    }

    function create(code, callback) {
      addDepartment(code)
      console.log('create', code)
      Alert.spinner.open()
      GroupOutgoingCallingPlanAuthorizationCodeService.store(
        ctrl.serviceProviderId,
        ctrl.groupId,
        code
      )
        .then(loadCodes)
        .then(function() {
          Alert.notify.success('Authorization Code Created')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function remove(code) {
      var message = 'Are you sure you want to remove ' + code.code + '?'
      Alert.confirm.open(message).then(function() {
        Alert.spinner.open()
        addDepartment(code)
        GroupOutgoingCallingPlanAuthorizationCodeService.destroy(
          ctrl.serviceProviderId,
          ctrl.groupId,
          code
        )
          .then(loadCodes)
          .then(function() {
            Alert.notify.success('Authorization Code Removed')
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
    }

    $scope.$on(
      'groupOutgoingCallingPlanDepartmentAuthorizationCodes:load',
      function(event, data) {
        ctrl.department = data
        console.log('department', data)
        load()
      }
    )
  }
})()
