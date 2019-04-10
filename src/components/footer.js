import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { loadTemplate } from '/store/template'

const StyledFooter = styled.footer`
  padding: 1rem;
  height: 50px;
`
const Footer = ({
  title = 'odin Web',
  version = 'N/A',
  copyright = 'Park Bench Solutions Inc.',
  loadTemplate
}) => {
  useEffect(() => {
    loadTemplate()
  }, [loadTemplate])

  return (
    <StyledFooter className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>{title}</strong>&nbsp;
          <span>&copy; {copyright}</span>&nbsp;
          <small>({version})</small>
        </p>
      </div>
    </StyledFooter>
  )
}

Footer.propTypes = {
  title: PropTypes.string,
  version: PropTypes.string,
  copyright: PropTypes.string,
  loadTemplate: PropTypes.func
}

const mapState = state => ({
  copyright: state.template.pageCopyright,
  title: state.template.pageFooterTitle,
  version: state.session.version
})
const mapDispatch = { loadTemplate }

export default connect(
  mapState,
  mapDispatch
)(Footer)
