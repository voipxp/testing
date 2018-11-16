/* globals FileReader */

/*
  TODO:
    - add some css on drop effects
*/
;(function() {
  angular.module('odin.UI').directive('pbsInputFile', Directive)

  function Directive($timeout) {
    return {
      restrict: 'E',
      scope: { onUpload: '&', mode: '@' },
      templateUrl: 'UI/pbsInputFile/pbsInputFile.directive.html',
      link: function(scope, element) {
        const input = element.find('input')[0]
        input.addEventListener('change', event => {
          const file = event.target.files[0]
          if (file) handleFile(file)
        })
        const dropzone = element[0]
        dropzone.addEventListener('dragover', event => event.preventDefault())
        dropzone.addEventListener('dragenter', event => event.preventDefault())
        dropzone.addEventListener('drop', event => {
          event.preventDefault()
          if (event.dataTransfer.items) {
            const file = event.dataTransfer.items[0]
            if (file && file.kind === 'file') {
              handleFile(file.getAsFile())
            }
          } else {
            const file = event.dataTransfer.files[0]
            if (file) handleFile(file)
          }
        })

        function handleFile(file) {
          const reader = new FileReader()
          reader.onload = event => {
            $timeout(() => {
              const content = event.target.result
              if (/^data:.*,/.test(content)) {
                const split = content.split(/(data.*,)/)
                file.content = split[2]
                file.dataUrl = content
              } else {
                file.content = content
              }
              scope.name = file.name
              scope.onUpload({ file })
            })
          }
          switch (scope.mode) {
            case 'text':
              return reader.readAsText(file)
            case 'buffer':
              return reader.readAsArrayBuffer(file)
            default:
              return reader.readAsDataURL(file)
          }
        }
      }
    }
  }
})()
