;(function() {
  angular.module('odin.group').component('outgoingCallingPlanRedirected', {
    templateUrl: 'group/components/meetMe/bridge/redirected.component.html',
    controller: Controller
  })

  function Controller(Alert, UserOutgoingCallingPlanRedirectedService, $scope) {
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
      return UserOutgoingCallingPlanRedirectedService.show(ctrl.userId).then(
        function(data) {
          ctrl.plan = data
          console.log('plan', data)
          return data
        }
      )
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanRedirectedService.update(ctrl.userId, plan)
        .then(function() {
          Alert.notify.success('Outgoing Redirected Updated')
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
      Alert.modal.open('editOutgoingCallingPlanRedirected', function onSave(
        close
      ) {
        update(ctrl.plan, close)
      })
    }

    $scope.$on('outgoingCallingPlanRedirected:load', function(event, data) {
      ctrl.userId = data
      activate()
    })
  }
})()
