export default [
  {
    path: '/account',
    component: 'myAccount',
    resolve: {
      session: ['Session', S => S.required()]
    }
  }
]
