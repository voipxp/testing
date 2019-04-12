/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar } from 'rbx'
import cx from 'classnames'
import { clearSession, hasLevel } from '/store/session'
import Modal from './modal'

const AppNavbar = ({
  pageTitle,
  userId,
  apiUrl,
  applications,
  clearSession,
  hasGroup,
  hasServiceProvider
}) => {
  const [showMenu, updateShowMenu] = useState(false)
  const [search, setSearch] = useState()

  const toggleMenu = () => updateShowMenu(!showMenu)

  const openAccount = () => {
    updateShowMenu(false)
    document.location.hash = '#!/account'
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

  return (
    <>
      <Navbar color="link" managed={true} active={showMenu}>
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
          <Modal
            title="User Search"
            isOpen={search === 'user'}
            onClose={() => setSearch()}
          >
            <p>User Search</p>
          </Modal>
          <Modal
            title="DN Search"
            isOpen={search === 'dn'}
            onClose={() => setSearch()}
          >
            <p>DN Search</p>
          </Modal>
        </>
      )}
      {hasServiceProvider && (
        <>
          <Modal
            title="Group Search"
            isOpen={search === 'group'}
            onClose={() => setSearch()}
          >
            <p>Group Search</p>
          </Modal>
          <Modal
            title="Service Service"
            isOpen={search === 'service'}
            onClose={() => setSearch()}
          >
            <p>Group Search</p>
          </Modal>
        </>
      )}
    </>
  )
}

AppNavbar.propTypes = {
  apiUrl: PropTypes.string,
  userId: PropTypes.string,
  pageTitle: PropTypes.string,
  applications: PropTypes.array,
  clearSession: PropTypes.func,
  hasGroup: PropTypes.bool,
  hasServiceProvider: PropTypes.bool
}

const mapState = state => ({
  apiUrl: state.ui.apiUrl,
  userId: state.session.userId,
  pageTitle: state.ui.template.pageTitle,
  applications: state.ui.applications,
  hasGroup: hasLevel(state.session.loginType, 'Group'),
  hasServiceProvider: hasLevel(state.session.loginType, 'Service Provider')
})

const mapDispatch = { clearSession }

export default connect(
  mapState,
  mapDispatch
)(AppNavbar)
