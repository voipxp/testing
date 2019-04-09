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
    .when('/notfound', {
      template: notFound
    })
    .otherwise({
      redirectTo: '/notfound'
    })
}

export default routes
