import angular from 'angular'

angular.module('odin.api').factory('GroupAnnouncementDownloadService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show }
  var url = Route.api('/groups/announcements/download')
   
  return service
 
 function show(serviceProviderId, groupId, name, mediaType) {
	return $http
      .get(url(), {
        params: {
          serviceProviderId,
          groupId,
          name,
          mediaType
        },
		responseType: 'arraybuffer'		
      })
      .then(response => response.data)
  }

}
    