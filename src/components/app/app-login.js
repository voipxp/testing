import React from 'react'
import { Hero, Box, Field, Control, Icon, Button, Input, Message } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { parse, stringify } from 'query-string'
import { alertWarning, alertDanger } from '@/utils/alerts'
import { showLoadingModal, hideLoadingModal } from '@/utils/loading'
import { useSession } from '@/graphql'
import authApi from '@/api/auth'
import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'

const UI_QUERY = gql`
  query uiSettings {
    uiTemplate {
      _id
      pageLoginMessage
    }
  }
`

export const AppLogin = () => {
  const { data } = useQuery(UI_QUERY)
  const pageLoginMessage = get(data, 'uiTemplate.pageLoginMessage')
  const { sessionLogin } = useSession()

  const tokenLogin = React.useCallback(() => {
    const [hash, query] = window.location.hash.split('?')
    if (!query) return
    const search = parse(query)
    const token = search.token
    if (!token) return
    showLoadingModal()
    delete search.token
    const newSearch = stringify(search)
    window.location.hash = newSearch ? `${hash}?${newSearch}` : hash
    // loadSessionFromToken(token)
    //   .catch(error => alertDanger(error))
    //   .finally(() => hideLoadingModal())
  }, [])

  React.useEffect(() => {
    tokenLogin()
  }, [tokenLogin])

  React.useEffect(() => {
    document.title = 'Please Login'
  })

  const formRef = React.useRef()
  const [form, setForm] = React.useState({
    username: '',
    password: '',
    newPassword1: '',
    newPassword2: ''
  })
  const [needsChange, setNeedsChange] = React.useState(false)
  const [valid, setValid] = React.useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    needsChange ? changePassword() : login()
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValid(formRef.current.checkValidity())
  }

  async function login() {
    try {
      showLoadingModal()
      await sessionLogin({
        variables: { username: form.username, password: form.password }
      })
      // await setSession(session)
    } catch (error) {
      if (error.status === 402) {
        alertWarning(error)
        setNeedsChange(true)
        setValid(false)
      } else {
        alertDanger(error)
      }
    } finally {
      hideLoadingModal()
    }
  }

  async function changePassword() {
    if (form.newPassword1 !== form.newPassword2) {
      return alertWarning('New Passwords Do Not Match')
    }
    try {
      showLoadingModal()
      await authApi.tokenPassword(
        form.password,
        form.newPassword1,
        form.username
      )
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  return (
    <div id="pbs-login">
      <Hero color="link" size="fullheight">
        <Hero.Body textAlign="centered">
          <Box style={{ width: '400px', margin: 'auto' }}>
            <img src="/api/v2/ui/images/imageLoginLogo.png" alt="logo" />
            <form onSubmit={handleSubmit} ref={formRef}>
              <Field>
                <Control iconLeft>
                  <Input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleInput}
                    value={form.username}
                    autoCapitalize="off"
                    required
                  />
                  <Icon size="small" align="left">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </Icon>
                </Control>
              </Field>

              <Field>
                <Control iconLeft>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                    value={form.password}
                    required
                  />
                  <Icon size="small" align="left">
                    <FontAwesomeIcon icon={faLock} />
                  </Icon>
                </Control>
              </Field>

              {needsChange && (
                <>
                  <Field>
                    <Control iconLeft>
                      <Input
                        type="password"
                        placeholder="New Password"
                        name="newPassword1"
                        onChange={handleInput}
                        value={form.newPassword1}
                        required
                      />
                      <Icon size="small" align="left">
                        <FontAwesomeIcon icon={faLock} />
                      </Icon>
                    </Control>
                  </Field>

                  <Field>
                    <Control iconLeft>
                      <Input
                        type="password"
                        placeholder="New Password"
                        name="newPassword2"
                        onChange={handleInput}
                        value={form.newPassword2}
                        required
                      />
                      <Icon size="small" align="left">
                        <FontAwesomeIcon icon={faLock} />
                      </Icon>
                    </Control>
                  </Field>
                </>
              )}

              <Button color="link" fullwidth type="submit" disabled={!valid}>
                Login
              </Button>
            </form>
          </Box>
        </Hero.Body>

        {pageLoginMessage && (
          <Hero.Foot>
            <Message radiusless>
              <Message.Body textAlign="centered">
                {pageLoginMessage}
              </Message.Body>
            </Message>
          </Hero.Foot>
        )}
      </Hero>
    </div>
  )
}
