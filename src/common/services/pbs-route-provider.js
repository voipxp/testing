import angular from 'angular'
import _ from 'lodash'

angular.module('odin.common').provider('PbsRoute', Provider)
Provider.$inject = ['$routeProvider']
function Provider($routeProvider) {
  function setAcl(type) {
    function checkAcl(ACL, $q) {
      if (type === 'Provisioning-PaasAdmin') {
        return ACL.isPaasAdmin() ? $q.when() : ACL.allow('Provisioning')
      }
      return ACL.allow(type)
    }
    checkAcl.$inject = ['ACL', '$q']
    return checkAcl
  }

  function setModule(name) {
    function checkModule(Module) {
      return Module.allow(name)
    }
    checkModule.$inject = ['Module']
    return checkModule
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
      reloadOnSearch: route.reloadOnSearch || false
    }

    config.resolve = route.noAuth
      ? {}
      : { _session: ['Session', S => S.required()] }

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
