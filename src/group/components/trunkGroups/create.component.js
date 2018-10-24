;(function() {
  angular.module('odin.group').component('groupTrunkGroupCreate', {
    templateUrl: 'group/components/trunkGroups/create.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '=', groupId: '=', onSave: '&' }
  })

  function Controller(
    Alert,
    GroupTrunkGroupService,
    GroupDepartmentService,
    $scope,
    $q
  ) {
    var ctrl = this

    ctrl.options = GroupTrunkGroupService.options
    ctrl.selectDevice = selectDevice
    ctrl.deviceSelected = deviceSelected

    function load() {
      ctrl.trunk = GroupTrunkGroupService.default()
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
})()
