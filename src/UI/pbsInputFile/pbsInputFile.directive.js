/* globals FileReader */
;(function() {
  angular.module('odin.UI').directive('pbsInputFile', Directive)

  function Directive() {
    return {
      restrict: 'E',
      scope: { onUpload: '&', mode: '@' },
      templateUrl: 'UI/pbsInputFile/pbsInputFile.directive.html',
      link: function(scope, element) {
        const input = element.find('input')[0]
        input.addEventListener('change', event => {
          handleFile(event.target.files[0])
        })
        const dropzone = element[0]
        dropzone.addEventListener('dragover', event => event.preventDefault())
        dropzone.addEventListener('dragenter', event => event.preventDefault())
        dropzone.addEventListener('drop', event => {
          event.preventDefault()
          handleFile(event.dataTransfer.files[0])
        })

        function handleFile(file) {
          const reader = new FileReader()
          reader.onload = event => {
            file.content = event.target.result
            scope.name = file.name
            scope.onUpload({ file })
          }
          switch (scope.mode) {
            case 'text':
              return reader.readAsText(file)
            case 'array-buffer':
              return reader.readAsArrayBuffer(file)
            case 'binary-string':
              return reader.readAsBinaryString(file)
            default:
              return reader.readAsDataURL(file)
          }
        }
      }
    }
  }
})()
