import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { icon } from '@fortawesome/fontawesome-svg-core'

const Icon = ({ icon, spin }) => {
    return <FontAwesomeIcon icon={icon} spin={spin} />
}


Icon.defaultProps = {
    icon: "",
    spin: false
}

Icon.propTypes = {
    icon: PropTypes.string,
    spin: PropTypes.bool
}



export default Icon;