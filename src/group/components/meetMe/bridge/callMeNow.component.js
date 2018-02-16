;(function() {
  angular.module('odin.group').component('outgoingCallingPlanCallMeNow', {
    templateUrl: 'group/components/meetMe/bridge/callMeNow.component.html',
    controller: Controller
  })

  function Controller(Alert, UserOutgoingCallingPlanCallMeNowService, $scope) {
    var ctrl = this

    ctrl.edit = edit

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
      return UserOutgoingCallingPlanCallMeNowService.show(ctrl.userId).then(
        function(data) {
          ctrl.plan = data
          console.log('plan', data)
          return data
        }
      )
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanCallMeNowService.update(ctrl.userId, plan)
        .then(function() {
          Alert.notify.success('Outgoing Call Me Now Updated')
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
      Alert.modal.open('editOutgoingCallingPlanCallMeNow', function(close) {
        update(ctrl.plan, close)
      })
    }

    $scope.$on('outgoingCallingPlanCallMeNow:load', function(event, data) {
      ctrl.userId = data
      activate()
    })
  }
})()
