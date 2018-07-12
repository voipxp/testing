;(function() {
  angular.module('odin.common').component('pbsInputDatetimeParse', {
    templateUrl: 'common/UI/forms/dateTimeParse.component.html',
    bindings: { ngModel: '=', isDate: '<', placeholder: '@', ngRequired: '=' },
    controller: function($filter, HashService, Alert) {
      var ctrl = this
      ctrl.$onInit = onInit
      ctrl.parse = parse
      ctrl.help = help
      ctrl.showExamples = showExamples

      var examples = [
        'now',
        'today',
        'monday at 9am',
        'friday at 5pm',
        'beginning of today',
        'end of today',
        'beginning of this week',
        'end of this week',
        'the beginning of last month',
        'the end of last month',
        'last year',
        'next month',
        'the 15th',
        '3pm Wednesday',
        'in 30 minutes',
        'in half a year',
        'five years ago',
        'yesterday at 4pm',
        'half an hour ago',
        'an hour from now',
        'the 4th of July',
        'the end of February',
        'next week Thursday',
        'two weeks from today',
        'the end of next week',
        'next Saturday at 10am',
        'the first day of 2013',
        'four days after Monday',
        'March 15th last year',
        'two days after tomorrow',
        'Sunday, January 15th 2012',
        'the beginning of this month',
        'the 2nd Tuesday of November',
        '5-2002',
        '7/26/1976',
        '8.25.2012',
        '22 August',
        'June 3rd 2015',
        '1 Dec 2015 5pm'
      ]

      ctrl.examples = _.chunk(examples, Math.ceil(examples.length / 3))

      console.log('examples', ctrl.examples)

      function onInit() {
        ctrl.modalId = HashService.guid()
        if (ctrl.input || !ctrl.ngModel) return
        var date = Sugar.Date.create(ctrl.ngModel)
        if (!Sugar.Date.isValid(date)) return
        var string = date.toISOString()
        ctrl.input = $filter('date')(string, format())
      }

      function help() {
        return ctrl.ngModel
          ? $filter('date')(ctrl.ngModel, format())
          : 'Eg: monday 9am, friday 5pm, Aug 1, today, next friday'
      }

      function format() {
        return ctrl.isDate ? 'mediumDate' : 'medium'
      }

      function parse() {
        if (!ctrl.input) {
          ctrl.ngModel = null
          return
        }
        var parsed = Sugar.Date.create(ctrl.input)
        ctrl.ngModel = Sugar.Date.isValid(parsed) ? parsed : null
      }

      function showExamples() {
        Alert.modal.open(ctrl.modalId)
      }
    }
  })
})()
