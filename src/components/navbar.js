import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { withRouter } from 'react-router-dom'
import { Navbar } from 'rbx'
import { clearSession } from '@/store/session'
import { UiModalCard } from '@/components/ui'
import { userPath, groupPath } from '@/utils/routes'
import { parseUrl, stringify } from 'query-string'
import { alertDanger } from '@/store/alerts'
import authApi from '@/api/auth'
import acl from '@/utils/acl'
import UserSearch from './user-search'
import SystemDnSearch from './system-dn-search'
import GroupSearch from './group-search'
import UserServiceSearch from './user-service-search'

const AppNavbar = ({ history }) => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()

  const { applications } = state.ui
  const { loginType, userId } = state.session
  const { pageTitle } = state.ui.template

  const hasGroup = acl.hasGroup(loginType)
  const hasServiceProvider = acl.hasServiceProvider(loginType)

  const [showMenu, updateShowMenu] = useState(false)
  const [search, setSearch] = useState()

  const toggleMenu = () => updateShowMenu(!showMenu)

  const logout = () => {
    dispatch(clearSession())
    history.push('/')
  }

  const openAccount = () => {
    updateShowMenu(false)
    history.push('/account')
  }

  const openSearch = type => {
    updateShowMenu(false)
    setSearch(type)
  }

  const getApplicationToken = async partner => {
    if (!partner) return
    const data = await authApi.sso(partner)
    return data.token
  }

  const openApplication = async application => {
    updateShowMenu(false)
    try {
      const token = await getApplicationToken(application.partner)
      const { url, query } = parseUrl(application.url)
      query.token = token ? token : undefined
      const search = stringify(query)
      const finalUrl = search ? `${url}?${search}` : url
      if (application.window) {
        window.open(finalUrl, '_blank', 'noopener')
      } else {
        window.open(finalUrl, '_self')
      }
    } catch (error) {
      dispatch(alertDanger(error))
    }
  }

  const openUser = user => {
    setSearch(null)
    history.push(userPath(user))
  }

  const openGroup = group => {
    setSearch(null)
    history.push(groupPath(group))
  }

  return (
    <>
      <Navbar color="link" managed active={showMenu}>
        <Navbar.Brand>
          <Navbar.Item href="/">
            <img
              src="/api/v2/ui/images/imageIcon.png?size=50x51"
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
                <Navbar.Item onClick={logout}>Logout</Navbar.Item>
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
            <SystemDnSearch onSelect={openUser} />
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
            <GroupSearch onSelect={openGroup} />
          </UiModalCard>
          <UiModalCard
            title="User Service Service"
            isOpen={search === 'service'}
            onCancel={() => setSearch()}
          >
            <UserServiceSearch onSelect={openUser} />
          </UiModalCard>
        </>
      )}
    </>
  )
}

AppNavbar.propTypes = {
  history: PropTypes.object
}

export default withRouter(AppNavbar)
