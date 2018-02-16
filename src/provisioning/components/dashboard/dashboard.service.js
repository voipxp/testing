/*
  This service simply caches the assigned services and reloads
  them in the background
*/
;(function() {
  angular
    .module('odin.provisioning')
    .factory('ProvisioningDashboardService', ProvisioningDashboardService)

  function ProvisioningDashboardService(Module, $q, $rootScope, ACL) {
    var service = {
      load: load,
      prepareCard: prepareCard,
      read: read,
      alias: alias
    }
    return service

    function load() {
      return Module.load()
    }

    function read(name) {
      return Module.read(name)
    }

    function alias(name) {
      return Module.alias(name)
    }

    function prepareCard(card) {
      // check we have the right version
      if (card.version && !ACL.hasVersion(card.version)) return

      // check modules (PBS stuff)
      if (card.module) {
        // check permissions
        if (!Module.read(card.module)) return
        // set the alias and activate it
        card.name = card.name || Module.alias(card.module)
        card.active = true
        return
      }

      // everything else is activated
      card.active = true
    }
  }
})()
