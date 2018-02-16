;(function() {
  angular.module('odin.bulk').directive('tagValidation', tagValidation)

  function tagValidation(
    BulkTemplateService,
    $q,
    EventEmitter,
    BulkTagService
  ) {
    return {
      require: 'ngModel',
      scope: { onUpdate: '&', tagRequired: '<', tagView: '<', isRequired: '<' },
      link: function(scope, elm, attrs, ctrl) {
        var defaultView = BulkTagService.view()
        function sendUpdate(data) {
          scope.onUpdate(EventEmitter({ parsed: data }))
        }
        ctrl.$asyncValidators.bulkTag = function(modelValue) {
          var view = _.isObject(scope.tagView)
            ? _.assign(defaultView, scope.tagView)
            : defaultView
          if (ctrl.$isEmpty(modelValue)) {
            if (scope.isRequired || scope.tagRequired) {
              return $q.reject(sendUpdate(null))
            }
            return $q.resolve(sendUpdate(null))
          }
          if (scope.tagRequired && !BulkTemplateService.hasTag(modelValue)) {
            return $q.reject('tagRequired')
          }
          return BulkTemplateService.parse(modelValue, view)
            .then(sendUpdate)
            .catch(function(error) {
              sendUpdate(null)
              return $q.reject(error)
            })
        }
      }
    }
  }
})()
