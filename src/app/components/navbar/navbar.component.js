;(function() {
  angular.module('odin.app').component('pbsNavbar', {
    templateUrl: 'app/components/navbar/navbar.component.html',
    controller: Controller
  })

  function Controller(
    Session,
    Route,
    Application,
    $rootScope,
    $q,
    $window,
    ACL,
    Alert,
    SsoService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.logout = logout
    ctrl.burger = burger
    ctrl.open = open
    ctrl.search = search

    var tokens = {}

    function onInit() {
      return $q.all([loadSession(), loadApplications()])
    }

    function loadApplications() {
      Application.index().then(function(data) {
        ctrl.applications = data
        return loadTokens(data)
      })
    }

    // try to preload the tokens for faster links
    function loadTokens(applications) {
      var partners = _.compact(_.uniq(_.map(applications, 'partner')))
      return partners.reduce(function(promise, partner) {
        return promise.then(function() {
          return getToken(partner)
            .then(function(token) {
              tokens[partner] = token
            })
            .catch(function() {
              tokens[partner] = null
            })
        })
      }, $q.when(true))
    }

    function open(application) {
      getToken(application.partner)
        .then(function(token) {
          var url = appendToken(application.url, token)
          if (application.window) {
            $window.open(url, '_blank', 'noopener')
          } else {
            $window.open(url, '_self')
          }
        })
        .catch(Alert.notify.danger)
    }

    function appendToken(url, token) {
      if (!token) return url
      var split = url.split('?')
      return url + (split[1] ? '&' : '?') + 'token=' + token
    }

    function getToken(partner) {
      if (!partner) return $q.resolve()
      if (tokens[partner]) return $q.when(tokens[partner])
      return SsoService.show(partner).then(function(data) {
        return data.token
      })
    }

    function loadSession() {
      Session.load().then(function(session) {
        ctrl.session = session
        ctrl.showSearch = ACL.has('Service Provider')
      })
    }

    function logout() {
      Session.clear().then(Route.login)
    }

    function burger() {
      ctrl.showMenu = !ctrl.showMenu
    }

    function search(type) {
      if (type === 'users') {
        $rootScope.$emit('userSearch:load', {
          serviceProviderId: ctrl.session.serviceProviderId
        })
      } else if (type === 'services') {
        $rootScope.$emit('serviceSearch:load', {
          serviceProviderId: ctrl.session.serviceProviderId
        })
      } else if (type === 'groups') {
        $rootScope.$emit('groupSearch:load')
      }
    }

    $rootScope.$on('Session:updated', loadSession)
    $rootScope.$on('BrandingApplicationService:updated', loadApplications)
  }
})()
