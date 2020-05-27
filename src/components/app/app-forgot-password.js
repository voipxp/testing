import React, { useState } from 'react'
import { Hero, Box, Field, Control, Icon, Button, Input, Message } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useAlerts } from '@/store/alerts'
import { useUi } from '@/store/ui'
import resetPasswordApi from '@/api/reset-password'
import PropTypes from 'prop-types'
import ReCAPTCHA from "react-google-recaptcha";
const ReCAPTCHA_SITE_KEY = "6LeYru8UAAAAAFgdMxLYZklkMIdxDF4xeK7n6XAu"

export const AppForgotPassword = ({ match, history }) => {
  const { showLoadingModal, hideLoadingModal } = useUi()
  const { alertSuccess, alertDanger } = useAlerts()

  const formRef = React.useRef()
  const [valid, setValid] = useState(false)
  const [gRecaptchaResponse, setGRecaptchaResponse] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [form, setForm] = useState({
    username: '',
    email: ''
  })

  function handleSubmit(e) {
    e.preventDefault()
    submitForm()
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function onReCaptchaChange(value) {
    if(value) setValid(true)
    else setValid(false)
    setGRecaptchaResponse(value)
  }

  async function submitForm() {
    if(!gRecaptchaResponse) return false
    try {
      showLoadingModal()
      const resetRes = await resetPasswordApi.sendResetPasswordLink(
        {
          'userId': form.username,
          'email': form.email,
          'g-recaptcha-response': gRecaptchaResponse
        }
      )
      if(resetRes.status === 'success') {
        setSuccessMessage(resetRes.message)
        alertSuccess(resetRes.message)
        setForm({ ...form, username: '', email: '' })
      }
      else {
        alertDanger(resetRes.error)
        setSuccessMessage('')
      }
    } catch (error) {
      alertDanger(error)
      setSuccessMessage('')
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
            {
              successMessage && (
              <Message radiusless color="success">
                <Message.Body textAlign="centered">
                  {successMessage}
                </Message.Body>
              </Message>
              )
            }
            <form onSubmit={handleSubmit} ref={formRef}>
                <>
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
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                    value={form.email}
                    required
                  />
                  <Icon size="small" align="left">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </Icon>
                </Control>
              </Field>

              <Field style={{paddingBottom:'20px'}}>
                <ReCAPTCHA
                  sitekey={ ReCAPTCHA_SITE_KEY }
                  onChange={onReCaptchaChange}
                />
              </Field>
              </>
              <Button color="link" fullwidth type="submit" disabled={!valid}>
                Submit
              </Button>
              <Field>
                <a href='/#!/'>
                  Go to Login Page
                </a>
              </Field>
            </form>
          </Box>
        </Hero.Body>
      </Hero>
    </div>
  )
}

AppForgotPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
