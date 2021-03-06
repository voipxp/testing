import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Navbar, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { UiCardModal } from '@/components/ui'
import { useAcl, userPath, groupPath } from '@/utils'
import { useUiApplications } from '@/store/ui-applications'
import { parseUrl, stringify } from 'query-string'
import { useAlerts } from '@/store/alerts'
import { useSession } from '@/store/session'
import { useUiTemplate } from '@/store/ui-template'
import { UserSearch } from '@/components/user-search'
import { SystemDnSearch } from '@/components/system-dn-search'
import { GroupSearch } from '@/components/group-search'
import { UserServiceSearch } from '@/components/user-service-search'
import authApi from '@/api/auth'

export const AppNavbar = withRouter(({ history }) => {
  const { alertDanger } = useAlerts()
  const { session, clearSession } = useSession()
  const { userId, passwordExpiresDays } = session
  const expiringSoon = Number(passwordExpiresDays) < 14

  const acl = useAcl()
  const hasGroup = acl.hasGroup()
  const hasServiceProvider = acl.hasServiceProvider()

  const { applications } = useUiApplications()
  const { template } = useUiTemplate()
  const { pageTitle } = template

  const [showMenu, updateShowMenu] = React.useState(false)
  const [search, setSearch] = React.useState()

  const toggleMenu = () => updateShowMenu(!showMenu)

  const logout = () => {
    clearSession()
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
      alertDanger(error)
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
    <div id="pbs-navbar">
      <Navbar color="link" managed active={showMenu}>
        <Navbar.Brand>
          <Navbar.Item href="#!/">
            <img
              src="/api/v2/ui/images/imageIcon.png?size=50x51"
              alt="odin Web"
            />
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
                    <Icon
                      size="small"
                      style={{ marginLeft: '0.5rem' }}
                      color="danger"
                    >
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
          <UiCardModal
            title="User Search"
            isOpen={search === 'user'}
            onCancel={() => setSearch()}
          >
            <UserSearch onSelect={openUser} />
          </UiCardModal>
          <UiCardModal
            title="DN Search"
            isOpen={search === 'dn'}
            onCancel={() => setSearch()}
          >
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
