TODO

- replace user dashboard with react
  - individual components can be angular still
  - utilize routing to render components
- implement PaasAdmin
- acl helper custom hook
- make lodash requires modular

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
