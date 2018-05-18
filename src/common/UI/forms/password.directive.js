;(function() {
  angular.module('odin.common').directive('pbsInputPassword', pbsInputPassword)

  function pbsInputPassword(PasswordService, GroupPasswordService, Alert, $q) {
    var template =
      '<div ng-form name="passwordForm">' +
      '  <div class="field has-addons">' +
      '    <div class="control is-expanded has-icons-right">' +
      '      <input class="input"' +
      '         name="password1"' +
      '         type="{{ inputType }}"' +
      '         placeholder="Password"' +
      '         ng-model="ngModel"' +
      '         ng-required="ngRequired"' +
      '         ng-minlength="ngMinlength"' +
      '         ng-maxlength="ngMaxlength"' +
      '         ng-disabled="isLoading"' +
      '         ng-change="onChange()">' +
      '       <span class="icon is-small is-right">' +
      '         <i class="fas"' +
      "            ng-class=\"{'fa-exclamation-triangle': passwordForm.password1.$invalid, 'fa-check': passwordForm.password1.$valid }\"></i>" +
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
      '        name="password2"' +
      '        placeholder="Repeat Password"' +
      '        ng-model="password2"' +
      '        ng-required="ngModel"' +
      '        ng-minlength="ngMinlength"' +
      '        ng-maxlength="ngMaxlength"' +
      '        ng-disabled="isLoading"' +
      '        ng-pattern="pattern">' +
      '       <span class="icon is-small is-right">' +
      '         <i class="fas"' +
      "            ng-class=\"{'fa-exclamation-triangle': passwordForm.password2.$invalid, 'fa-check': passwordForm.password2.$valid }\"></i>" +
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
})()
