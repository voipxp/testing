;(function() {
  angular.module('odin.common').directive('pbsInputFile', pbsInputFile)

  function pbsInputFile() {
    return {
      restrict: 'E',
      templateUrl: 'common/UI/forms/file.directive.html',
      scope: {},
      controller: function() {
        this.callback = function(file) {
          this.name = file.name
          this.onUpload({ file: file })
        }
      },
      controllerAs: '$ctrl',
      bindToController: {
        onUpload: '&',
        mode: '@'
      }
    }
  }
})()
