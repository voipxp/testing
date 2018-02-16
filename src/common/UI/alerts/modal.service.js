;(function() {
  angular.module('odin.common').factory('Modal', Modal)

  function Modal() {
    var service = {
      register: register,
      deregister: deregister,
      open: open,
      close: close,
      closeAll: closeAll
    }
    var modals = {}
    return service

    function register(controller) {
      if (!controller.id) return
      modals[controller.id] = controller
    }

    function deregister(controller) {
      if (!controller.id) return
      delete modals[controller.id]
    }

    function open(id, onSave, onDelete) {
      var controller = modals[id]
      if (!controller) return
      return controller.open(onSave, onDelete)
    }

    function close(id) {
      var controller = modals[id]
      if (controller) return controller.close()
    }

    function closeAll() {
      Object.keys(modals).forEach(function(id) {
        close(id)
      })
    }
  }
})()
