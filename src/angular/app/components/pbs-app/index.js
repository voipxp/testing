// import angular from 'angular'
// import template from './index.html'

// angular.module('odin.app').component('pbsApp', { template, controller })

// controller.$inject = ['Session', '$ngRedux']
// function controller(Session, $ngRedux) {
//   const ctrl = this
//   ctrl.$onInit = onInit
//   ctrl.$onDestroy = () => unsubscribe()

//   let unsubscribe

//   function onInit() {
//     const mapState = state => ({
//       session: state.session,
//       template: state.ui.template
//     })
//     unsubscribe = $ngRedux.connect(mapState)(this)
//     Session.load()
//   }

//   // function setGoogleUA() {
//   //   const id = ctrl.template.pageGoogleUA
//   //   if (!id) return
//   //   $window.ga('create', id, 'auto')
//   //   $window.ga(function(tracker) {
//   //     console.log('Google UA Initialized', tracker.get('clientId'))
//   //   })
//   // }

//   // function sendGoogleUA() {
//   //   $window.ga(function(tracker) {
//   //     if (tracker) $window.ga('send', 'pageview', $location.path())
//   //   })
//   // }

//   // function handleRouteError(rejection) {
//   //   console.log('routeChangeError', rejection)
//   //   if (Session.expired()) {
//   //     Alert.notify.warning('Please Login')
//   //     $location.path($rootScope.loginURL).replace()
//   //   } else {
//   //     $location.path('/notfound').replace()
//   //   }
//   // }

//   // $rootScope.$on('$routeChangeSuccess', function() {
//   //   sendGoogleUA()
//   // })

//   // $rootScope.$on('$routeChangeError', function(e, c, p, rejection) {
//   //   handleRouteError(rejection)
//   // })

//   // $rootScope.$on('Template:updated', function() {
//   //   setGoogleUA()
//   // })

//   // $rootScope.$on('Session:cleared', function() {
//   //   $timeout(() => Route.login(), 0)
//   // })
// }
