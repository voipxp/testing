;(function() {
  angular.module('odin.common').component('userFeatureAccessCodes', {
    templateUrl:
      'common/components/userFeatureAccessCodes/userFeatureAccessCodes.component.html',
    controller: Controller,
    bindings: { userId: '=' }
  })

  function Controller(Alert, UserFeatureAccessCodeService) {
    var ctrl = this

    ctrl.$onInit = activate

    function activate() {
      ctrl.loading = true
      load()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function load() {
      return UserFeatureAccessCodeService.index(ctrl.userId).then(function(
        data
      ) {
        ctrl.accessCodes = data
        console.log('UserFeatureAccessCodeService', data)
        return data
      })
    }
  }
})()
