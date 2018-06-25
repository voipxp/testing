;(function() {
  angular.module('odin.UI').directive('pbsInputFile', Directive)

  function Directive() {
    return {
      restrict: 'E',
      templateUrl: 'UI/pbsInputFile/pbsInputFile.directive.html',
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
