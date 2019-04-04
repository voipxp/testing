/*
  This service simply caches the assigned services and reloads
  them in the background
*/

import angular from 'angular'

angular.module('odin.system').factory('SystemDashboardService', service)

service.$inject = ['Module', 'ACL']
function service(Module, ACL) {
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
    if (card.acl && !ACL.has(card.acl)) return

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
