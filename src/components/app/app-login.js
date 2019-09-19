import React from 'react'
import { Hero, Box, Field, Control, Icon, Button, Input, Message } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { parse, stringify } from 'query-string'
import {
  useLoadingModal,
  useSessionLogin,
  useSessionRefresh,
  useSessionLogout,
  saveToken
} from '@/graphql'
import { useAlert } from '@/utils'
import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'

const UI_QUERY = gql`
  query appLoginUi {
    uiTemplate {
      id
      pageLoginMessage
    }
  }
`

export const AppLogin = () => {
  const { data } = useQuery(UI_QUERY)
  const pageLoginMessage = get(data, 'uiTemplate.pageLoginMessage')
  const [logout] = useSessionLogout()
  const [login] = useSessionLogin()
  const [refresh] = useSessionRefresh()
  const Alert = useAlert()
  const Loading = useLoadingModal()

  const tokenLogin = React.useCallback(async () => {
    const [hash, query] = window.location.hash.split('?')
    if (!query) return
    const search = parse(query)
    const token = search.token
    if (!token) return
    Loading.show()
    delete search.token
    const newSearch = stringify(search)
    window.location.hash = newSearch ? `${hash}?${newSearch}` : hash
    saveToken(token)
    try {
      await refresh()
    } catch (error) {
      Alert.danger(error)
      logout()
    } finally {
      Loading.hide()
    }
  }, [Alert, Loading, logout, refresh])

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
    needsChange ? changePassword() : loginUser()
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    /* wrapped in a setTimeout to handle autofill */
    setTimeout(() => setValid(formRef.current.checkValidity()), 0)
  }

  async function loginUser() {
    Loading.show()
    try {
      Loading.show()
      const { username, password } = form
      await login({ variables: { username, password } })
    } catch (error) {
      if (error.message === 'GraphQL error: Password Expired') {
        Alert.warning(error)
        setNeedsChange(true)
        setValid(false)
      } else {
        Alert.danger(error)
      }
    } finally {
      Loading.hide()
    }
  }

  async function changePassword() {
    if (form.newPassword1 !== form.newPassword2) {
      return Alert.warning('New Passwords Do Not Match')
    }
    try {
      Loading.show()
      await login({
        variables: {
          username: form.username,
          oldPassword: form.password,
          password: form.newPassword1
        }
      })
    } catch (error) {
      Alert.danger(error)
    } finally {
      Loading.hide()
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
              <Message.Body textAlign="centered">{pageLoginMessage}</Message.Body>
            </Message>
          </Hero.Foot>
        )}
      </Hero>
    </div>
  )
}
