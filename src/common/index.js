;(function() {
  angular
    .module('odin.common', ['ngPapaParse', 'angular-cache', 'ui.indeterminate'])
    .config(function(CacheFactoryProvider) {
      angular.extend(CacheFactoryProvider.defaults, {
        maxAge: 5 * 60 * 1000,
        deleteOnExpire: 'passive',
        onExpire: function(key) {
          console.log('expire cache', key)
        }
      })
    })
})()
