/*
  This service simply caches the assigned services and reloads
  them in the background
*/
;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderDashboardService', Service)

  function Service(
    Module,
    ServiceProviderService,
    ServiceProviderPermissionService,
    $q,
    ACL
  ) {
    var service = { load: load, prepareCard: prepareCard }
    var Permission
    var _isEnterprise

    return service

    function load(serviceProviderId) {
      return $q
        .all([Module.load(), loadServiceProvider(serviceProviderId)])
        .then(function() {
          return ServiceProviderPermissionService.load(serviceProviderId)
        })
        .then(function(data) {
          Permission = data
        })
    }

    function loadServiceProvider(serviceProviderId) {
      return ServiceProviderService.show(serviceProviderId).then(function(
        data
      ) {
        _isEnterprise = data.isEnterprise
      })
    }

    function isEnterprise() {
      return !!_isEnterprise
    }

    function prepareCard(card) {
      // check we have the right version
      if (card.version && !ACL.hasVersion(card.version)) return

      // check for isEnterprise requirements
      if (card.isEnterprise && !isEnterprise()) return
      if (card.isEnterprise === false && isEnterprise()) return

      // check for acl requirements
      if (card.acl && !ACL.has(card.acl)) return

      // check for legacyPaas
      if (card.isPaasAdmin && !ACL.isPaasAdmin()) return

      // check service cards
      if (card.service) {
        // check it is assigned and accessible
        if (!Permission.read(card.service)) return
        // set the alias and activate it
        card.name = card.name || Module.alias(card.service)
        card.active = true
        return
      }

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
