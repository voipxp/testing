import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { Hero, Box, Field, Control, Icon, Button, Input, Message } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import authApi from '@/api/auth'
import { showLoadingModal, hideLoadingModal } from '@/store/ui'
import { alertWarning, alertDanger } from '@/store/alerts'
import { setSession, loadSessionFromToken } from '@/store/session'
import { parse, stringify } from 'query-string'

const Login = () => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()

  const tokenLogin = useCallback(() => {
    const [hash, query] = window.location.hash.split('?')
    if (!query) return
    const search = parse(query)
    const token = search.token
    if (!token) return
    delete search.token
    const newSearch = stringify(search)
    window.location.hash = newSearch ? `${hash}?${newSearch}` : hash
    dispatch(showLoadingModal())
    dispatch(loadSessionFromToken(token))
      .catch(error => dispatch(alertDanger(error)))
      .finally(() => dispatch(hideLoadingModal()))
  }, [dispatch])

  useEffect(() => {
    tokenLogin()
  }, [tokenLogin])

  const { pageLoginMessage } = state.ui.template

  const formRef = useRef()
  const [form, setForm] = useState({
    username: '',
    password: '',
    newPassword1: '',
    newPassword2: ''
  })
  const [needsChange, setNeedsChange] = useState(false)
  const [valid, setValid] = useState(false)

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
      dispatch(showLoadingModal())
      const session = await authApi.token(form.username, form.password)
      await dispatch(setSession(session))
    } catch (error) {
      if (error.status === 402) {
        dispatch(alertWarning(error))
        setNeedsChange(true)
        setValid(false)
      } else {
        dispatch(alertDanger(error))
      }
    } finally {
      dispatch(hideLoadingModal())
    }
  }

  async function changePassword() {
    if (form.newPassword1 !== form.newPassword2) {
      return dispatch(alertWarning('New Passwords Do Not Match'))
    }
    try {
      dispatch(showLoadingModal())
      await authApi.password(form.password, form.newPassword1, form.username)
      const session = await authApi.token(form.username, form.newPassword1)
      await dispatch(setSession(session))
    } catch (error) {
      dispatch(alertDanger(error))
    } finally {
      dispatch(hideLoadingModal())
    }
  }

  return (
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
  )
}

export default Login
