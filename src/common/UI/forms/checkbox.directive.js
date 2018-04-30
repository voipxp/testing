;(function() {
  angular.module('odin.common').directive('pbsInputCheckbox', pbsInputCheckbox)

  function pbsInputCheckbox() {
    var template =
      '<label class="checkbox">' +
      '  <input type="checkbox"' +
      '    ng-model="ngModel"' +
      '    ng-disabled="ngDisabled">' +
      '  {{ label }}' +
      '</label>'
    return {
      restrict: 'E',
      template: template,
      replace: true,
      scope: { label: '@', ngModel: '=', ngDisabled: '=' }
    }
  }

  //
  // THIS IS READY TO GO TO REPLACE THE DIRECTIVE
  // WITH CHECKRADIO
  //
  // function pbsInputCheckbox(HashService) {
  //   var template =
  //     '<div class="field">' +
  //     '  <p class="control">' +
  //     '    <input type="checkbox"' +
  //     '      class="is-checkradio"' +
  //     '      ng-attr-id="{{ id }}"' +
  //     '      ng-model="ngModel"' +
  //     '      ng-disabled="ngDisabled">' +
  //     '    <label for="{{ id }}">{{ label }}</label>' +
  //     '  </p>' +
  //     '</div>'
  //   return {
  //     restrict: 'E',
  //     template: template,
  //     replace: true,
  //     scope: { label: '@', ngModel: '=', ngDisabled: '=' },
  //     link: function(scope, element) {
  //       scope.id = HashService.guid()
  //       element.on('click', function() {
  //         document.getElementById(scope.id).blur()
  //         element.find('label')[0].blur()
  //       })
  //     }
  //   }
  // }

  angular.module('odin.common').directive('pbsInputCheckradio', Directive)
  angular.module('odin.common').directive('pbsInputRadio', Directive)

  function Directive(HashService) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var id = HashService.guid()
        // add id and class
        element.attr('id', id)
        element.addClass('is-checkradio')

        // wrap in a control in a field
        var div = angular.element(document.createElement('div'))
        div.addClass('field')

        element.wrap(div)

        // add label
        var label = angular.element(document.createElement('label'))
        label.attr('for', id)
        label.html(attr.label)
        if (!attr.label) {
          label.css({ paddingLeft: '1rem' })
        }
        element.after(label)

        // remove outline on focus
        element.on('click', function() {
          element[0].blur()
        })
      }
    }
  }
})()
