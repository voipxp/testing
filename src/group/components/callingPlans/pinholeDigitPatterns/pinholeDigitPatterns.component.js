;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanPinholeDigitPatterns', {
      templateUrl:
        'group/components/callingPlans/pinholeDigitPatterns/pinholeDigitPatterns.component.html',
      controller: Controller
    })

  function Controller(
    $routeParams,
    Alert,
    GroupOutgoingCallingPlanPinholeDigitPatternService,
    $scope
  ) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.$onInit = activate
    ctrl.add = add
    ctrl.edit = edit
    ctrl.remove = remove

    function activate() {
      ctrl.loading = true
      loadPatterns()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPatterns() {
      return GroupOutgoingCallingPlanPinholeDigitPatternService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.patterns = data
        console.log('patterns', data)
        return data
      })
    }

    function edit(pattern) {
      ctrl.editPattern = angular.copy(pattern)
      Alert.modal.open(
        'editOutgoingCallingPlanPinholeDigitPattern',
        function onSave(close) {
          update(ctrl.editPattern, close)
        },
        function onDelete(close) {
          remove(ctrl.editPattern, close)
        }
      )
    }

    function add() {
      ctrl.addPattern = {}
      if ($scope.addOutgoingCallingPlanPinholeDigitPatternForm) {
        $scope.addOutgoingCallingPlanPinholeDigitPatternForm.$setPristine()
      }
      Alert.modal.open(
        'addOutgoingCallingPlanPinholeDigitPattern',
        function onSave(close) {
          create(ctrl.addPattern, close)
        }
      )
    }

    function create(pattern, callback) {
      console.log('create', pattern)
      Alert.spinner.open()
      GroupOutgoingCallingPlanPinholeDigitPatternService.store(
        ctrl.serviceProviderId,
        ctrl.groupId,
        pattern
      )
        .then(loadPatterns)
        .then(function() {
          Alert.notify.success('Pinhole Digit Pattern Created')
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

    function update(pattern, callback) {
      console.log('update', pattern)
      Alert.spinner.open()
      GroupOutgoingCallingPlanPinholeDigitPatternService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        pattern
      )
        .then(loadPatterns)
        .then(function() {
          Alert.notify.success('Pinhole Digit Pattern Updated')
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

    function remove(pattern, callback) {
      console.log('remove', pattern)
      Alert.confirm
        .open('Are you sure you want to delete ' + pattern.name + '?')
        .then(function() {
          Alert.spinner.open()
          GroupOutgoingCallingPlanPinholeDigitPatternService.destroy(
            ctrl.serviceProviderId,
            ctrl.groupId,
            pattern
          )
            .then(loadPatterns)
            .then(function() {
              Alert.notify.success('Pinhole Digit Pattern Removed')
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
        })
    }
  }
})()
