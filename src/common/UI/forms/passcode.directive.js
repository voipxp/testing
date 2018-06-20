;(function() {
  angular.module('odin.common').directive('pbsInputPasscode', pbsInputPasscode)

  function pbsInputPasscode(
    PasscodeService,
    GroupPasscodeService,
    ServiceProviderPasscodeService,
    Alert,
    $q
  ) {
    var template =
      '<div ng-form name="passcodeForm">' +
      '  <div class="field has-addons">' +
      '    <div class="control is-expanded has-icons-right">' +
      '      <input class="input"' +
      '         name="passcode1"' +
      '         type="{{ inputType }}"' +
      '         placeholder="Passcode"' +
      '         ng-model="ngModel"' +
      '         ng-required="ngRequired"' +
      '         ng-minlength="ngMinlength"' +
      '         ng-maxlength="ngMaxlength"' +
      '         ng-disabled="isLoading"' +
      '         ng-change="onChange()">' +
      '       <span class="icon is-small is-right">' +
      '         <i class="fas"' +
      "            ng-class=\"{'fa-exclamation-triangle': passcodeForm.passcode1.$invalid, 'fa-check': passcodeForm.passcode1.$valid }\"></i>" +
      '       </span>' +
      '    </div>' +
      '    <div class="control">' +
      '      <div class="button is-link"' +
      '        ng-class="{\'is-loading\': isLoading}"' +
      '        ng-click="generate()"' +
      '        ng-disabled="isLoading">' +
      '        <span class="icon"><i class="fas fa-key"></i></span>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="field has-addons">' +
      '    <div class="control is-expanded has-icons-right">' +
      '      <input class="input"' +
      '        type="{{ inputType }}"' +
      '        name="passcode2"' +
      '        placeholder="Repeat Passcode"' +
      '        ng-model="passcode2"' +
      '        ng-required="ngModel"' +
      '        ng-minlength="ngMinlength"' +
      '        ng-maxlength="ngMaxlength"' +
      '        ng-disabled="isLoading"' +
      '        ng-pattern="pattern">' +
      '       <span class="icon is-small is-right">' +
      '         <i class="fas"' +
      "            ng-class=\"{'fa-exclamation-triangle': passcodeForm.passcode2.$invalid, 'fa-check': passcodeForm.passcode2.$valid }\"></i>" +
      '       </span>' +
      '     </div>' +
      '     <div class="control">' +
      '      <div class="button is-link"' +
      '        ng-click="toggle()">' +
      '        <span class="icon">' +
      '          <i class="fas"' +
      "            ng-class=\"{'fa-eye': inputType === 'text', 'fa-eye-slash': inputType === 'password'}\"></i>" +
      '        </span>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>'

    return {
      restrict: 'E',
      template: template,
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
})()
