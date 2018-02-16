;(function() {
  angular.module('odin.group').component('incomingCallingPlan', {
    templateUrl:
      'group/components/meetMe/bridge/incomingCallingPlan.component.html',
    controller: Controller
  })

  function Controller(Alert, UserIncomingCallingPlanService, $scope) {
    var ctrl = this

    ctrl.edit = edit
    ctrl.options = {
      allowFromOutsideGroup:
        UserIncomingCallingPlanService.options.allowFromOutsideGroup
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
      return UserIncomingCallingPlanService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.plan = data
        console.log('plan', data)
        return data
      })
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserIncomingCallingPlanService.update(ctrl.userId, plan)
        .then(function() {
          Alert.notify.success('Incoming Calling Plan Updated')
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
      Alert.modal.open('editIncomingPlan', function onSave(close) {
        update(ctrl.plan, close)
      })
    }

    $scope.$on('incomingCallingPlan:load', function(event, data) {
      ctrl.userId = data
      activate()
    })
  }
})()
