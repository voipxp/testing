import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroupCreate', {
  template,
  controller,
  bindings: { serviceProviderId: '=', groupId: '=', onSave: '&' }
})

controller.$inject = [
  'Alert',
  'GroupTrunkGroupService',
  'GroupDepartmentService',
  'ServiceProviderSipAuthPasswordRulesService',
  'SystemSipAuthPasswordRulesService',
  '$scope',
  '$q'
]
function controller(
  Alert,
  GroupTrunkGroupService,
  GroupDepartmentService,
  ServiceProviderSipAuthPasswordRulesService,
  SystemSipAuthPasswordRulesService,
  $scope,
  $q
) {
  var ctrl = this

  ctrl.options = GroupTrunkGroupService.options
  ctrl.selectDevice = selectDevice
  ctrl.deviceSelected = deviceSelected

  function load() {
    ctrl.trunk = GroupTrunkGroupService.default()
    loadPasswordRulesMinLength()
    if ($scope.groupTrunkGroupCreateForm) {
      $scope.groupTrunkGroupCreateForm.$setPristine()
    }
    Alert.spinner.open()
    return loadDepartments()
      .catch(function(error) {
        Alert.notify.danger(error)
        return $q.reject(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
   
  function loadPasswordRulesMinLength() {
    ServiceProviderSipAuthPasswordRulesService.show(ctrl.serviceProviderId)
      .then(function(rules) {
      if (rules.useServiceProviderSettings === true) {
        ctrl.passMinLen = rules.minLength;
      } else {
          loadSystemSipAuthPasswordRules();
      }
      ctrl.passMinLen =   rules.minLength
    })
  }
  function loadSystemSipAuthPasswordRules() {
    SystemSipAuthPasswordRulesService.show().then(function (rules) {
    ctrl.passMinLen = rules.minLength;
  });
  
  }
  
  function loadDepartments() {
    return GroupDepartmentService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.departments = data
      return data
    })
  }

  function edit() {
    load().then(function() {
      Alert.modal.open('groupTrunkGroupCreate', function onSave(close) {
        create(ctrl.trunk, close)
      })
    })
  }

  function create(trunk, callback) {
    trunk.serviceProviderId = ctrl.serviceProviderId
    trunk.groupId = ctrl.groupId
    Alert.spinner.open()
    GroupTrunkGroupService.store(ctrl.serviceProviderId, ctrl.groupId, trunk)
      .then(function() {
        Alert.notify.success('Trunk Created')
        if (_.isFunction(ctrl.onSave)) {
          ctrl.onSave({ trunk: trunk })
        }
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

  function selectDevice() {
    $scope.$broadcast('deviceSelect:load')
  }

  function deviceSelected(event) {
    ctrl.trunk.accessDevice = event.device
  }

  $scope.$on('groupTrunkGroupCreate:load', edit)
}
