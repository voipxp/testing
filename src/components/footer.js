import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Footer } from 'rbx'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  padding: 1rem;
  height: 50px;
`
const AppFooter = ({
  title = 'odin Web',
  version = 'N/A',
  copyright = 'Park Bench Solutions Inc.'
}) => {
  return (
    <Footer as={StyledFooter} textAlign="centered">
      <p>
        <strong>{title}</strong>&nbsp;
        <span>&copy; {copyright}</span>&nbsp;
        <small>({version})</small>
      </p>
    </Footer>
  )
}

AppFooter.propTypes = {
  title: PropTypes.string,
  version: PropTypes.string,
  copyright: PropTypes.string
}

const mapState = state => ({
  copyright: state.ui.template.pageCopyright,
  title: state.ui.template.pageFooterTitle,
  version: state.session.version
})

export default connect(mapState)(AppFooter)
