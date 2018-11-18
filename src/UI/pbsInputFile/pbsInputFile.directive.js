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
        const dropzone = element[0]
        const input = element.find('input')[0]

        // add listeners
        dropzone.addEventListener('dragover', onDragover)
        dropzone.addEventListener('dragenter', onDragenter)
        dropzone.addEventListener('drop', onDrop)
        input.addEventListener('change', onChange)

        // cleanup listeners
        element.on('$destroy', function() {
          dropzone.removeEventListener('dragover', onDragover)
          dropzone.removeEventListener('dragenter', onDragenter)
          dropzone.removeEventListener('drop', onDrop)
          input.removeEventListener('change', onChange)
        })

        function onChange(event) {
          const file = event.target.files[0]
          if (file) handleFile(file)
        }

        function onDragover(event) {
          event.preventDefault()
        }

        function onDragenter(event) {
          event.preventDefault()
        }

        function onDrop(event) {
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
        }

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
