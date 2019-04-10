import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Alerts from './alerts'
import Angular from './angular'
import Footer from './footer'
import Loading from './loading'

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
`
const App = ({ initialized }) => {
  return initialized ? (
    <>
      <Alerts />
      <Wrapper>
        <Angular component="pbsApp" />
      </Wrapper>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}

App.propTypes = {
  initialized: PropTypes.bool
}

const mapState = state => ({
  initialized: state.ui.initialized
})

export default connect(mapState)(App)
