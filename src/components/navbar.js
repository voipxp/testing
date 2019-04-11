/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'
import { clearSession, hasLevel } from '/store/session'
import Modal from './modal'

const Navbar = ({
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
      <nav
        className="navbar is-link"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img
              src={`${apiUrl}/ui/images/imageIcon.png?size=50x51`}
              alt="odin Web"
            />
          </a>
          <a className="button navbar-burger is-link" onClick={toggleMenu}>
            <span />
            <span />
            <span />
          </a>
        </div>
        <div className={cx('navbar-menu', { 'is-active': showMenu })}>
          <div className="navbar-start">
            <div className="navbar-item">
              {pageTitle} ({userId})
            </div>
          </div>
          <div className="navbar-end">
            {applications.length > 0 && (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Applications</a>
                <div className="navbar-dropdown is-boxed">
                  {applications.map(application => {
                    return (
                      <a
                        key={application.id}
                        className="navbar-item"
                        onClick={() => openApplication(application)}
                      >
                        {application.name}
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
            {hasGroup && (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Search</a>
                <div className="navbar-dropdown is-boxed">
                  <a className="navbar-item" onClick={() => openSearch('user')}>
                    Users
                  </a>
                  {hasServiceProvider && (
                    <>
                      <a
                        className="navbar-item"
                        onClick={() => openSearch('group')}
                      >
                        Groups
                      </a>
                      <a
                        className="navbar-item"
                        onClick={() => openSearch('service')}
                      >
                        Services
                      </a>
                    </>
                  )}
                  <a className="navbar-item" onClick={() => openSearch('dn')}>
                    Phone Numbers
                  </a>
                </div>
              </div>
            )}

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">My Account</a>
              <div className="navbar-dropdown is-boxed">
                <a className="navbar-item" onClick={openAccount}>
                  Profile
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" onClick={clearSession}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

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

Navbar.propTypes = {
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
)(Navbar)
