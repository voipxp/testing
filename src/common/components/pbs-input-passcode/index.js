import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').directive('pbsInputPasscode', pbsInputPasscode)

pbsInputPasscode.$inject = [
  'PasscodeService',
  'GroupPasscodeService',
  'ServiceProviderPasscodeService',
  'Alert',
  '$q'
]
function pbsInputPasscode(
  PasscodeService,
  GroupPasscodeService,
  ServiceProviderPasscodeService,
  Alert,
  $q
) {
  return {
    restrict: 'E',
    template,
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
        return loadPasscodeRules()
          .then(function(rules) {
            scope.ngModel = PasscodeService.generate(rules)
            scope.passcode2 = scope.ngModel
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

      function loadPasscodeRules() {
        var defaultRules = {}
        return loadGroupPasscodeRules(
          scope.serviceProviderId,
          scope.groupId,
          defaultRules
        )
      }

      // First try the Group Rules
      //  - If it fails, then try the SP rules, pass the defaultRules along
      // If the group rules suggest to use the SP rules
      //  - Then try the SP rules, pass in the group rules as default
      // Otherwise, return the group rules
      function loadGroupPasscodeRules(
        serviceProviderId,
        groupId,
        defaultRules
      ) {
        if (!serviceProviderId && !groupId) return $q.resolve(defaultRules)

        if (!groupId) {
          return loadServiceProviderPasscodeRules(
            serviceProviderId,
            defaultRules
          )
        }

        return GroupPasscodeService.show(serviceProviderId, groupId)
          .then(function(groupRules) {
            if (groupRules.useRuleLevel === 'Service Provider') {
              return loadServiceProviderPasscodeRules(
                serviceProviderId,
                groupRules
              )
            } else {
              return groupRules
            }
          })
          .catch(function() {
            return loadServiceProviderPasscodeRules(
              serviceProviderId,
              defaultRules
            )
          })
      }

      // Return the SP rules or the defaultRules passed in
      function loadServiceProviderPasscodeRules(
        serviceProviderId,
        defaultRules
      ) {
        return ServiceProviderPasscodeService.show(serviceProviderId).catch(
          function() {
            return defaultRules
          }
        )
      }
    }
  }
}
