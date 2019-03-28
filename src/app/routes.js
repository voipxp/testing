export default [
  {
    path: '/account',
    component: 'myAccount',
    resolve: {
      session: ['Session', S => S.required()]
    }
  },
  {
    path: '/login',
    component: 'pbsLogin',
    noAuth: true
  },
  {
    path: '/sso',
    component: 'pbsSso',
    noAuth: true
  }
]
