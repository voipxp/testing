import angular from 'angular'

angular.module('odin.api').factory('UserAnnouncementDownloadService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show }
  var url = Route.api('/users/announcements/download')
   
  return service
 
 function show( userId, name, mediaType ) {
	return $http
      .get(url(), {
        params: {
          userId,
          name,
          mediaType
        },
		responseType: 'arraybuffer'		
      })
      .then(response => response.data)
  }

}
    