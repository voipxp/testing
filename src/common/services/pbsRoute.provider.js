;(function() {
  angular.module('odin.common').provider('PbsRoute', Provider)
  function Provider($routeProvider) {
    function setAcl(type) {
      return function(ACL) {
        'ngInject'
        return ACL.allow(type)
      }
    }
    function setModule(name) {
      return function(Module) {
        'ngInject'
        return Module.allow(name)
      }
    }
    function getPath(prefix, path) {
      var route = _.compact([prefix, path]).join('/')
      return /^\//.test(route) ? route : '/' + route
    }
    function getConfig(route) {
      // parse the template from the component
      var name = _.kebabCase(route.component)
      var template = ''
      template += '<' + name
      if (route.module) {
        template += ' module="$resolve.module"'
      }
      if (route.bindings) {
        _.forOwn(route.bindings, function(val, key) {
          template += ' ' + _.kebabCase(key) + '="' + val + '"'
        })
      }
      template += '></' + name + '>'
      // set the route config object
      var config = {
        template: template,
        reloadOnSearch: route.reloadOnSearch || false,
        resolve: {
          session: function(Session) {
            return Session.required()
          }
        }
      }
      if (route.acl) {
        config.resolve.acl = setAcl(route.acl)
      }
      if (route.module) {
        config.resolve.module = setModule(route.module)
      }

      return config
    }
    function set(routes, prefix) {
      routes = _.flatten([routes])
      routes.forEach(function(route) {
        $routeProvider.when(getPath(prefix, route.path), getConfig(route))
      })
    }
    return {
      set: set,
      $get: function() {}
    }
  }
})()
