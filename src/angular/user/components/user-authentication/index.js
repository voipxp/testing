import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userAuthentication', {
  template,
  controller,
  bindings: { userId: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'UserAuthenticationService', 'Module','ServiceProviderSipAuthPasswordRulesService','SystemSipAuthPasswordRulesService','$q']
function controller(Alert, UserAuthenticationService, Module , ServiceProviderSipAuthPasswordRulesService, SystemSipAuthPasswordRulesService, $q) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = UserAuthenticationService.options
   
  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadSettings(), loadModule(),loadPasswordRulesMinLength()])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
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
  

/*end code for generate password sip */
   
  function loadModule() {
    return Module.show('Authentication').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSettings() {
    return UserAuthenticationService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
  Alert.modal.open('editUserAuthentication', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    if (!settings.newPassword) {
      delete settings.newPassword
    }
    Alert.spinner.open()
    UserAuthenticationService.update(ctrl.userId, settings)
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Settings Updated')
        if (_.isFunction(callback)) callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
