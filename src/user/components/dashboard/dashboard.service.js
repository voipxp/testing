/*
  This service simply caches the assigned services and reloads
  them in the background
*/
;(function() {
  angular
    .module('odin.user')
    .factory('UserDashboardService', UserDashboardService)

  function UserDashboardService(
    Module,
    UserPermissionService,
    $q,
    $rootScope,
    ACL
  ) {
    var service = { load: load, prepareCard: prepareCard }
    var Permission
    return service

    function load(userId) {
      return Module.load()
        .then(function() {
          return UserPermissionService.load(userId)
        })
        .then(function(data) {
          Permission = data
        })
    }

    function prepareCard(card) {
      // check we have the right version
      if (card.version && !ACL.hasVersion(card.version)) return

      // skip cards marked as admin cards
      if (card.admin && ACL.is('User')) return

      // check service cards
      if (card.service) {
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
