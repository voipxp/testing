;(function() {
  angular.module('odin.UI').component('pbsInputFileDoc', {
    templateUrl: 'UI/pbsInputFile/index.component.html',
    controller: function() {
      this.onUpload = function(file) {
        this.file = file
        console.log(file)
      }
    }
  })
})()
