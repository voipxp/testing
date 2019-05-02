TODO

- replace user dashboard with react

  - perhaps extract route filtering from UiMenu
  - add Module permissions checks
  - add Service checks

- add integrated IMP check to SCA page
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
