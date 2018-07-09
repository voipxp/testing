;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderPermissionService', Service)

  function Service(Module, ServiceProviderServiceService, Session, ACL, $q) {
    var service = { load: load }
    return service

    function load(serviceProviderId) {
      return $q
        .all([loadServices(serviceProviderId), Module.load()])
        .then(function(response) {
          return Permission(serviceProviderId, response[0])
        })
    }

    function Permission(serviceProviderId, _authorized) {
      var service = {
        create: create,
        read: read,
        update: update,
        destroy: destroy
      }
      return service

      function create(name) {
        return has(name) && Module.create(name)
      }

      function read(name) {
        return has(name) && Module.read(name)
      }

      function update(name) {
        return has(name) && Module.update(name)
      }

      function destroy(name) {
        return has(name) && Module.destroy(name)
      }

      function isAuthorized(name) {
        return !!_authorized[name]
      }

      function has(name) {
        if (!name) return
        name = name.serviceName || name.name || name
        return isAuthorized(name)
      }
    }

    function loadServices(serviceProviderId) {
      return ServiceProviderServiceService.show(serviceProviderId).then(
        function(data) {
          var authorized = {}
          data.groupServices.forEach(function(service) {
            if (service.authorized) {
              authorized[service.serviceName] = service
            }
          })
          return authorized
        }
      )
    }
  }
})()
