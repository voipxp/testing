TODO

- implement PaasAdmin
- make lodash requires modular
- replace user dashboard with react
  - individual components can be angular still
  - utilize routing to render components

SUB-ROUTES

We can use sub-routes for things like the user dashboard. For example, the menu will be built on the UserDashboard component. The view will then be directed by the route below it.

```
/users/:userId/services
  <UserDashBoard>
    <SideBar>
    </SideBar>
    <ViewContainer>
      <Route path="/services" component={UserServices} />
    </ViewContainer>
  </UserDashBoard>
```

Or perhaps we can dynamically render the component?

```
<Route path="/:component" render={() => {
  getComponent(path)
}} />
```
