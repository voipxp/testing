const notFound = `
<pbs-navigation>
  <pbs-breadcrumb title="'Error'"></pbs-breadcrumb>
</pbs-navigation>

<article class="message is-warning">
  <div class="message-header">
    <p>Warning</p>
  </div>
  <div class="message-body">
    We are sorry, but the page you requested was not found.
  </div>
</article>
`

routes.$inject = ['$routeProvider']
function routes($routeProvider) {
  $routeProvider
    .when('/', {
      template: '',
      controller: ['Route', Route => Route.dashboard()]
    })
    .when('/account', {
      template: '<my-account></my-account>',
      resolve: { session: ['Session', Session => Session.required()] },
      reloadOnSearch: false
    })
    .when('/login', {
      template: '<pbs-login></pbs-login>',
      reloadOnSearch: false
    })
    .when('/sso', {
      template: '<pbs-sso></pbs-sso>',
      reloadOnSearch: false
    })
    .when('/notfound', {
      template: notFound
    })
    .otherwise({
      redirectTo: '/notfound'
    })
}

export default routes
