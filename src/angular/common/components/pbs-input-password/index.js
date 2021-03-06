import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').directive('pbsInputPassword', pbsInputPassword)

pbsInputPassword.$inject = [
  'PasswordService',
  'GroupPasswordService',
  'Alert',
  'SystemSipAuthPasswordRulesService',
  'ServiceProviderSipAuthPasswordRulesService',
  'ServiceProviderPasswordService',
  '$q'
]
function pbsInputPassword(
  PasswordService,
  GroupPasswordService,
  Alert,
  SystemSipAuthPasswordRulesService,
  ServiceProviderSipAuthPasswordRulesService,
  ServiceProviderPasswordService,
  $q
) {
  return {
    template,
    restrict: 'E',
    replace: true,
    scope: {
      label: '@',
      ngModel: '=',
      ngDisabled: '=',
      ngRequired: '=',
      ngMinlength: '=',
      ngMaxlength: '=',
      serviceProviderId: '<?',
      groupId: '<?',
      ngSipAuth: '=',
      ngAdminLevel: '='
    },

    link: function(scope) {
      scope.inputType = 'password'
      scope.generate = generate
      scope.toggle = toggle
      scope.onChange = setPattern

      function setPattern() {
        scope.pattern = scope.ngModel ? _.escapeRegExp(scope.ngModel) : null
      }

      function generate() {
        scope.inputType = 'text'
        scope.isLoading = true
        return loadPasswordRules()
          .then(function(rules) {
            scope.ngModel = PasswordService.generate(rules)
            scope.password2 = scope.ngModel
            setPattern()
          })
          .catch(function(error) {
            Alert.notify.warning(error)
            scope.inputType = 'password'
          })
          .finally(function() {
            scope.isLoading = false
          })
      }

      function toggle() {
        scope.inputType = scope.inputType === 'text' ? 'password' : 'text'
      }

      function loadSystemSipAuthPasswordRules() {
        return SystemSipAuthPasswordRulesService.show().then(function(rules) {
          return rules
        })
      }
      function loadPasswordRules() {
        var defaultRules = {}
        if (!scope.serviceProviderId || !scope.groupId) {
          return $q.resolve(defaultRules)
        }
        if (scope.ngSipAuth === true) {
          return ServiceProviderSipAuthPasswordRulesService.show(
            scope.serviceProviderId
          ).then(function(rules) {
            if (rules.useServiceProviderSettings === true) {
              return rules
            } else {
              return loadSystemSipAuthPasswordRules()
            }
          })
        } else if (scope.ngAdminLevel === true) {
          return ServiceProviderPasswordService.show(
            scope.serviceProviderId
          ).then(function(rules) {
            return rules
          })
        } else {
          return GroupPasswordService.show(
            scope.serviceProviderId,
            scope.groupId
          ).then(function(rules) {
            return rules
          })
        }
      }
    }
  }
}
