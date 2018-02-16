;(function() {
  var template =
    '<input type="datetime-local" class="input"' +
    '  ng-model="$ctrl.ngModel"' +
    '  ng-required="$ctrl.ngRequired"' +
    '  ng-if="!$ctrl.isDate">' +
    '<input type="date" class="input"' +
    '  ng-model="$ctrl.ngModel"' +
    '  ng-required="$ctrl.ngRequired"' +
    '  ng-if="$ctrl.isDate">'

  angular.module('odin.common').component('pbsInputDatetime', {
    template: template,
    bindings: { isDate: '<', ngRequired: '<', ngModel: '=' }
  })
})()
