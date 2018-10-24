;(function() {
  angular.module('odin.group').component('groupCallingPlanDigitPatterns', {
    templateUrl:
      'group/components/callingPlans/digitPatterns/digitPatterns.component.html',
    controller: Controller
  })

  function Controller(
    $routeParams,
    Alert,
    GroupCallingPlanDigitPatternService,
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
      return GroupCallingPlanDigitPatternService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.patterns = data
        return data
      })
    }

    function edit(pattern) {
      ctrl.editPattern = angular.copy(pattern)
      Alert.modal.open(
        'editCallingPlanDigitPattern',
        function onSave(close) {
          update(ctrl.editPattern, close)
        },
        function onDelete(close) {
          remove(ctrl.editPattern, close)
        }
      )
    }

    function add() {
      ctrl.addPattern = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId
      }
      if ($scope.addCallingPlanDigitPatternForm) {
        $scope.addCallingPlanDigitPatternForm.$setPristine()
      }
      Alert.modal.open('addCallingPlanDigitPattern', function onSave(close) {
        create(ctrl.addPattern, close)
      })
    }

    function create(pattern, callback) {
      Alert.spinner.open()
      GroupCallingPlanDigitPatternService.store(
        ctrl.serviceProviderId,
        ctrl.groupId,
        pattern
      )
        .then(loadPatterns)
        .then(function() {
          Alert.notify.success('Digit Pattern Created')
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
      Alert.spinner.open()
      GroupCallingPlanDigitPatternService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        pattern
      )
        .then(loadPatterns)
        .then(function() {
          Alert.notify.success('Digit Pattern Updated')
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
      Alert.confirm
        .open('Are you sure you want to delete ' + pattern.name + '?')
        .then(function() {
          Alert.spinner.open()
          GroupCallingPlanDigitPatternService.destroy(
            ctrl.serviceProviderId,
            ctrl.groupId,
            pattern.name
          )
            .then(loadPatterns)
            .then(function() {
              Alert.notify.success('Digit Pattern Removed')
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
