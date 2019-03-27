import angular from 'angular'

const template = `
<pbs-navigation>
  <pbs-breadcrumb title="'User Logins'"></pbs-breadcrumb>
</pbs-navigation>
<odin-user-login-dashboard></odin-user-login-dashboard>
 `

angular.module('odin.events').component('odinUserLoginIndex', { template })
