//  $window.ga('create', 'UA-XXXXXXXX-X', 'auto');
;(function() {
  angular
    .module('odin.app')
    .component('pbsApp', {
      templateUrl: 'app/components/app/app.component.html',
      controller: Controller
    })
    .config(function(IdleProvider, TitleProvider) {
      IdleProvider.keepalive(false)
      TitleProvider.enabled(false)
    })

  function Controller(
    Template,
    Setting,
    Session,
    $q,
    $rootScope,
    $scope,
    $location,
    $window,
    CacheFactory,
    APP,
    Alert,
    Idle,
    Route
  ) {
    var ctrl = this
    ctrl.$onInit = onInit

    var TIMEOUT = 30
    // hold warning notifcation so we can clear it
    var NOTIFICATION

    function onInit() {
      ctrl.loading = true
      $q.all([
        CacheFactory.clearAll(),
        Template.load(),
        Session.load(),
        Setting.load()
      ])
        .then(setIdle)
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadTemplate() {
      ctrl.template = Template.data()
      $rootScope.pageTitle = Template.data('pageTitle') || 'ODiN'
      setGoogleUA()
    }

    function setGoogleUA() {
      var id = _.get(ctrl.template, 'pageGoogeUA')
      if (_.isEmpty(id)) return
      $window.ga('create', id, 'auto')
      $window.ga(function(tracker) {
        console.log('Google UA Initialized', tracker.get('clientId'))
      })
    }

    function sendGoogleUA() {
      $window.ga(function(tracker) {
        if (tracker) $window.ga('send', 'pageview', $location.path())
      })
    }

    function handleRouteError(rejection) {
      console.log('routeChangeError', rejection)
      if (Session.expired()) {
        Alert.notify.warning('Please Login')
        $location.path(APP.loginURL).replace()
      } else {
        $location.path('/notfound').replace()
      }
    }

    function setIdle() {
      if (sessionTimeout() && !Session.expired()) {
        console.log('setIdle', sessionTimeout())
        Idle.setTimeout(TIMEOUT)
        Idle.setIdle(sessionTimeout())
        Idle.watch()
      }
    }

    function notifyTimeout(seconds) {
      NOTIFICATION = Alert.notify.warning(
        'This session is about to expire',
        seconds * 1000
      )
    }

    function cancelNotify() {
      if (NOTIFICATION) {
        Alert.notify.remove(NOTIFICATION)
      }
    }

    // convert from seconds to minutes
    function sessionTimeout() {
      return (parseInt(Setting.data('sessionTimeout'), 10) || 0) * 60
    }

    $rootScope.$on('$routeChangeSuccess', function() {
      sendGoogleUA()
    })

    $rootScope.$on('$routeChangeError', function(e, c, p, rejection) {
      handleRouteError(rejection)
    })

    $rootScope.$on('Template:updated', function() {
      loadTemplate()
      setGoogleUA()
    })

    $rootScope.$on('Session:cleared', function() {
      Idle.unwatch()
      Route.login()
    })

    $rootScope.$on('Session:loaded', function() {
      if (Session.expired()) {
        Idle.unwatch()
      } else {
        setIdle()
      }
    })

    $scope.$on('IdleStart', function() {
      ctrl.idleWarn = false
    })

    $scope.$on('IdleWarn', function(event, countdown) {
      console.log('IdleWarn', countdown)
      if (countdown <= TIMEOUT && !ctrl.idleWarn) {
        ctrl.idleWarn = true
        notifyTimeout(countdown)
      }
    })

    $scope.$on('IdleTimeout', function() {
      console.log('IdleTimeout')
      cancelNotify()
      Session.clear()
    })

    $scope.$on('IdleEnd', function() {
      console.log('IdleEnd')
      cancelNotify()
    })
  }
})()
