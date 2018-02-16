;(function() {
  var template =
    '<input type="hidden"' +
    '  ng-model="$ctrl.ngModel"' +
    '  ng-required="$ctrl.ngRequired">' +
    '<input type="text" class="input"' +
    '  ng-model="$ctrl.input"' +
    '  ng-change="$ctrl.parse()"' +
    '  ng-model-options="{ debounce: 200 }">' +
    '<p class="help is-success"' +
    '  ng-show="$ctrl.ngModel">{{ $ctrl.ngModel | date:$ctrl.format() }}</p>' +
    '<p class="help"' +
    '  ng-show="!$ctrl.ngModel">Eg: yesterday 9am, Aug 1, friday</p>'

  angular.module('odin.common').component('pbsInputDatetimeParse', {
    template: template,
    bindings: { ngModel: '=', isDate: '<', ngRequired: '=', required: '<' },
    controller: function($filter) {
      var ctrl = this
      ctrl.$onInit = onInit
      ctrl.parse = parse
      ctrl.format = format

      function onInit() {
        if (ctrl.input || !ctrl.ngModel) return
        var date = Sugar.Date.create(ctrl.ngModel)
        if (!Sugar.Date.isValid(date)) return
        var string = date.toISOString()
        ctrl.input = $filter('date')(string, format())
      }

      function format() {
        return ctrl.isDate ? 'mediumDate' : 'medium'
      }

      function parse() {
        if (!ctrl.input) {
          ctrl.ngModel = null
          return
        }
        var params = {}
        var parsed = Sugar.Date.create(ctrl.input, {
          future: true,
          params: params
        })
        ctrl.ngModel = Sugar.Date.isValid(parsed) ? parsed : null
      }
    }
  })
})()
