import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').directive('pbsInputChangePassword', pbsInputChangePassword)

pbsInputChangePassword.$inject = [
  'PasswordService',
  'GroupPasswordService',
  'Alert',
  '$q'
]
function pbsInputChangePassword(PasswordService, GroupPasswordService, Alert, $q) {
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
      groupId: '<?'
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

      function loadPasswordRules() {
        var defaultRules = {}
        if (!scope.serviceProviderId || !scope.groupId) {
          return $q.resolve(defaultRules)
        }
        return GroupPasswordService.show(
          scope.serviceProviderId,
          scope.groupId
        ).catch(function() {
          return defaultRules
        })
      }
    }
  }
}
