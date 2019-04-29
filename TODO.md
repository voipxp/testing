TODO

- add integrated IMP check to SCA page
- replace user dashboard with react
  - individual components can be angular still
  - utilize routing to render components
- acl helper custom hook
- make lodash requires modular (https://github.com/ant-design/babel-plugin-import#readme)
  - perhaps move to dot-prop with regular ES6
- remove angular-animate when modal is moved to react

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
