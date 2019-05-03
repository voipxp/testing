// angular routes
import appRoutes from '@/angular/app/routes'
import brandingRoutes from '@/angular/branding/routes'
import bulkRoutes from '@/angular/bulk/routes'
import eventsRoutes from '@/angular/events/routes'
import groupRoutes from '@/angular/group/routes'
import serviceProviderRoutes from '@/angular/service-provider/routes'
import settingsRoutes from '@/angular/settings/routes'
import systemRoutes from '@/angular/system/routes'
import vdmRoutes from '@/angular/vdm/routes'

// react imports
import { UserDashboard } from '@/components/users'

export const angularRoutes = [
  ...appRoutes,
  ...brandingRoutes,
  ...bulkRoutes,
  ...eventsRoutes,
  ...groupRoutes,
  ...serviceProviderRoutes,
  ...settingsRoutes,
  ...systemRoutes,
  ...vdmRoutes
]

export const reactRoutes = [
  {
    path: '/users/:serviceProviderId/:groupId/:userId',
    Component: UserDashboard
  }
]
