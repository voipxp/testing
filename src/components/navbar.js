import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Navbar } from 'rbx'
import { clearSession, hasLevel } from '/store/session'
import { UiModalCard } from '/components/ui'
import UserSearch from './user-search'

const AppNavbar = ({
  apiUrl,
  applications,
  clearSession,
  hasGroup,
  hasServiceProvider,
  history,
  pageTitle,
  userId
}) => {
  const [showMenu, updateShowMenu] = useState(false)
  const [search, setSearch] = useState()

  const toggleMenu = () => updateShowMenu(!showMenu)

  const openAccount = () => {
    updateShowMenu(false)
    history.push('/account')
  }

  const openSearch = type => {
    updateShowMenu(false)
    setSearch(type)
  }

  const openApplication = application => {
    updateShowMenu(false)
    // TODO: add token getter
    const url = application.url
    if (application.window) {
      window.open(url, '_blank', 'noopener')
    } else {
      window.open(url, '_self')
    }
  }

  const openUser = user => {
    setSearch(null)
    const path = [
      '/users',
      user.serviceProviderId,
      user.groupId,
      user.userId
    ].join('/')
    history.push(path)
  }

  return (
    <>
      <Navbar color="link" managed active={showMenu}>
        <Navbar.Brand>
          <Navbar.Item href="/">
            <img
              src={`${apiUrl}/ui/images/imageIcon.png?size=50x51`}
              alt="odin Web"
            />
          </Navbar.Item>
          <Navbar.Burger color="link" onClick={toggleMenu} />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Segment align="start">
            <Navbar.Item href="/">
              {pageTitle} ({userId})
            </Navbar.Item>
          </Navbar.Segment>
          <Navbar.Segment align="end">
            {applications.length > 0 && (
              <Navbar.Item dropdown hoverable>
                <Navbar.Link>Applications</Navbar.Link>
                <Navbar.Dropdown boxed>
                  {applications.map(application => (
                    <Navbar.Item
                      key={application.id}
                      onClick={() => openApplication(application)}
                    >
                      {application.name}
                    </Navbar.Item>
                  ))}
                </Navbar.Dropdown>
              </Navbar.Item>
            )}

            {hasGroup && (
              <Navbar.Item dropdown hoverable>
                <Navbar.Link>Search</Navbar.Link>
                <Navbar.Dropdown boxed>
                  <Navbar.Item onClick={() => openSearch('user')}>
                    Users
                  </Navbar.Item>
                  <Navbar.Item onClick={() => openSearch('dn')}>
                    Phone Numbers
                  </Navbar.Item>
                  {hasServiceProvider && (
                    <>
                      <Navbar.Item onClick={() => openSearch('group')}>
                        Groups
                      </Navbar.Item>
                      <Navbar.Item onClick={() => openSearch('service')}>
                        Services
                      </Navbar.Item>
                    </>
                  )}
                </Navbar.Dropdown>
              </Navbar.Item>
            )}

            <Navbar.Item dropdown hoverable>
              <Navbar.Link>My Account</Navbar.Link>
              <Navbar.Dropdown boxed>
                <Navbar.Item onClick={openAccount}>Profile</Navbar.Item>
                <Navbar.Divider />
                <Navbar.Item onClick={clearSession}>Logout</Navbar.Item>
              </Navbar.Dropdown>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Navbar>

      {hasGroup && (
        <>
          <UiModalCard
            title="User Search"
            isOpen={search === 'user'}
            onCancel={() => setSearch()}
          >
            <UserSearch onSelect={openUser} />
          </UiModalCard>
          <UiModalCard
            title="DN Search"
            isOpen={search === 'dn'}
            onCancel={() => setSearch()}
          >
            <p>DN Search</p>
          </UiModalCard>
        </>
      )}
      {hasServiceProvider && (
        <>
          <UiModalCard
            title="Group Search"
            isOpen={search === 'group'}
            onCancel={() => setSearch()}
          >
            <p>Group Search</p>
          </UiModalCard>
          <UiModalCard
            title="Service Service"
            isOpen={search === 'service'}
            onCancel={() => setSearch()}
          >
            <p>Group Search</p>
          </UiModalCard>
        </>
      )}
    </>
  )
}

AppNavbar.propTypes = {
  apiUrl: PropTypes.string,
  applications: PropTypes.array,
  clearSession: PropTypes.func,
  hasGroup: PropTypes.bool,
  hasServiceProvider: PropTypes.bool,
  history: PropTypes.object,
  pageTitle: PropTypes.string,
  userId: PropTypes.string
}

const mapState = state => ({
  apiUrl: state.ui.apiUrl,
  applications: state.ui.applications,
  hasGroup: hasLevel(state.session.loginType, 'Group'),
  hasServiceProvider: hasLevel(state.session.loginType, 'Service Provider'),
  pageTitle: state.ui.template.pageTitle,
  userId: state.session.userId
})

const mapDispatch = { clearSession }

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(AppNavbar)
)
