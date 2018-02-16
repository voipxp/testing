;(function() {
  angular.module('odin.group').component('outgoingCallingPlanOriginating', {
    templateUrl: 'group/components/meetMe/bridge/originating.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    UserOutgoingCallingPlanOriginatingService,
    $scope
  ) {
    var ctrl = this

    ctrl.edit = edit
    ctrl.options = {
      userPermissions:
        UserOutgoingCallingPlanOriginatingService.options.userPermissions
    }

    function activate() {
      Alert.spinner.open()
      load()
        .then(function() {
          return edit()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function load() {
      return UserOutgoingCallingPlanOriginatingService.show(ctrl.userId).then(
        function(data) {
          ctrl.plan = data
          console.log('plan', data)
          return data
        }
      )
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanOriginatingService.update(ctrl.userId, plan)
        .then(function() {
          Alert.notify.success('Outgoing Originating Updated')
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

    function edit() {
      Alert.modal.open('editOutgoingCallingPlanOriginating', function(close) {
        update(ctrl.plan, close)
      })
    }

    $scope.$on('outgoingCallingPlanOriginating:load', function(event, data) {
      ctrl.userId = data
      activate()
    })
  }
})()
