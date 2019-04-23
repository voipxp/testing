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

      // set resolves
      route.resolve = route.resolve || {}
      if (route.acl) {
        route.resolve.acl = setAcl(route.acl)
      }
      if (route.module) {
        route.resolve.module = setModule(route.module)
      }

      // generate template
      var template = ''
      template += '<' + name
      if (route.resolve) {
        _.forOwn(route.resolve, function(val, key) {
          template += ' ' + key + '="$resolve.' + key + '"'
        })
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
          _session: function(Session) {
            'ngInject'
            return Session.required()
          }
        }
      }
      _.assign(config.resolve, route.resolve)
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