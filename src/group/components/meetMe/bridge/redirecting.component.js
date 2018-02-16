;(function() {
  angular.module('odin.group').component('outgoingCallingPlanRedirecting', {
    templateUrl: 'group/components/meetMe/bridge/redirecting.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    UserOutgoingCallingPlanRedirectingService,
    $scope
  ) {
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
      return UserOutgoingCallingPlanRedirectingService.show(ctrl.userId).then(
        function(data) {
          ctrl.plan = data
          console.log('plan', data)
          return data
        }
      )
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanRedirectingService.update(ctrl.userId, plan)
        .then(function() {
          Alert.notify.success('Outgoing Redirecting Updated')
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
      Alert.modal.open('editOutgoingCallingPlanRedirecting', function onSave(
        close
      ) {
        update(ctrl.plan, close)
      })
    }

    $scope.$on('outgoingCallingPlanRedirecting:load', function(event, data) {
      ctrl.userId = data
      activate()
    })
  }
})()
