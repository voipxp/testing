import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { Navbar, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { UiCardModal } from '@/components/ui'
import { useAcl, Route } from '@/utils'
import { useAlert, useSession, useSessionLogout } from '@/graphql'
import { UserSearch } from '@/components/user-search'
import { SystemDnSearch } from '@/components/system-dn-search'
import { GroupSearch } from '@/components/group-search'
import { UserServiceSearch } from '@/components/user-service-search'
import { useQuery } from '@apollo/react-hooks'

const UI_QUERY = gql`
  query appNavbarUi {
    uiTemplate {
      id
      pageTitle
    }
    uiApplications {
      id
      description
      name
      partner
      url
      window
    }
  }
`
export const AppNavbar = withRouter(({ history }) => {
  const Alert = useAlert()
  const logoutUser = useSessionLogout()
  const session = useSession()
  const { userId, passwordExpiresDays } = session
  const expiringSoon = Number(passwordExpiresDays) < 1

  const Acl = useAcl()
  const hasGroup = Acl.hasGroup()
  const hasServiceProvider = Acl.hasServiceProvider()

  const { data } = useQuery(UI_QUERY)
  const pageTitle = get(data, 'uiTemplate.pageTitle')
  const applications = get(data, 'uiApplications', [])

  const [showMenu, updateShowMenu] = React.useState(false)
  const [search, setSearch] = React.useState()

  React.useEffect(() => {
    if (pageTitle) document.title = pageTitle
  }, [pageTitle])

  const toggleMenu = () => updateShowMenu(!showMenu)

  const logout = () => {
    logoutUser()
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

  const openApplication = async ({ url, window }) => {
    updateShowMenu(false)
    try {
      if (window) {
        window.open(url, '_blank', 'noopener')
      } else {
        window.open(url, '_self', 'noopener')
      }
    } catch (error) {
      Alert.danger(error)
    }
  }

  const openUser = user => {
    setSearch(null)
    history.push(Route.userPath(user))
  }

  const openGroup = group => {
    setSearch(null)
    history.push(Route.groupPath(group))
  }

  return (
    <div id="pbs-navbar">
      <Navbar color="link" managed active={showMenu}>
        <Navbar.Brand>
          <Navbar.Item href="#!/">
            <img src="/api/v2/ui/images/imageIcon.png?size=50x51" alt="odin Web" />
          </Navbar.Item>
          <Navbar.Burger color="link" onClick={toggleMenu} />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Segment align="start">
            <Navbar.Item href="#!/">
              {pageTitle} ({userId})
            </Navbar.Item>
          </Navbar.Segment>
          <Navbar.Segment align="end">
            {applications.length > 0 && (
              <Navbar.Item dropdown hoverable>
                <Navbar.Link>Applications</Navbar.Link>
                <Navbar.Dropdown boxed>
                  {applications.map(application => (
                    <Navbar.Item key={application.id} onClick={() => openApplication(application)}>
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
                  <Navbar.Item onClick={() => openSearch('user')}>Users</Navbar.Item>
                  <Navbar.Item onClick={() => openSearch('dn')}>Phone Numbers</Navbar.Item>
                  {hasServiceProvider && (
                    <>
                      <Navbar.Item onClick={() => openSearch('group')}>Groups</Navbar.Item>
                      <Navbar.Item onClick={() => openSearch('service')}>Services</Navbar.Item>
                    </>
                  )}
                </Navbar.Dropdown>
              </Navbar.Item>
            )}

            <Navbar.Item dropdown hoverable>
              <Navbar.Link>
                <span>My Account</span>
                {expiringSoon && (
                  <Icon size="small" style={{ marginLeft: '0.5rem' }}>
                    <FontAwesomeIcon icon={faExclamationCircle} />
                  </Icon>
                )}
              </Navbar.Link>
              <Navbar.Dropdown boxed>
                <Navbar.Item onClick={openAccount}>
                  <span>Profile</span>
                  {expiringSoon && (
                    <Icon size="small" style={{ marginLeft: '0.5rem' }} color="danger">
                      <FontAwesomeIcon icon={faExclamationCircle} />
                    </Icon>
                  )}
                </Navbar.Item>
                <Navbar.Divider />
                <Navbar.Item onClick={logout}>Logout</Navbar.Item>
              </Navbar.Dropdown>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Navbar>

      {hasGroup && (
        <>
          <UiCardModal title="User Search" isOpen={search === 'user'} onCancel={() => setSearch()}>
            <UserSearch onSelect={openUser} />
          </UiCardModal>
          <UiCardModal title="DN Search" isOpen={search === 'dn'} onCancel={() => setSearch()}>
            <SystemDnSearch onSelect={openUser} />
          </UiCardModal>
        </>
      )}
      {hasServiceProvider && (
        <>
          <UiCardModal
            title="Group Search"
            isOpen={search === 'group'}
            onCancel={() => setSearch()}
          >
            <GroupSearch onSelect={openGroup} />
          </UiCardModal>
          <UiCardModal
            title="User Service Service"
            isOpen={search === 'service'}
            onCancel={() => setSearch()}
          >
            <UserServiceSearch onSelect={openUser} />
          </UiCardModal>
        </>
      )}
    </div>
  )
})

AppNavbar.propTypes = {
  history: PropTypes.object
}
