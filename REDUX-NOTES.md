## Angular Services to Move to Redux

```js
state.userServices = {
  userId: {
    services: {
      serviceName: {}
    },
    assigned: {
      serviceName: {}
    },
    viewable: {
      serviceName: {}
    }
  }
}
```

NOTES

- UserServiceServices.update broadcasts
- user-dashboard.js
  - $rootScope.$on('UserServiceService:updated', loadPermissions)
- user-services-dashboard.js
  - $rootScope.$on('UserServiceService:updated', loadServices)

* userAssignedServices

  - UserServiceService.assigned(userId)

* userViewableServices

  - UserServiceService.viewable(userId)

* userServices
  - UserServiceService.show(userId)

## Angular Services Using Redux

- Module

  - angular/common/services/module.js
  - store/ui

- Session

  - src/angular/common/services/session.js
  - store/session

- Notification

  - src/angular/ui/services/notification.js
  - store/alerts

- Spinner
  - store/ui
