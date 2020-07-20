import React from 'react'
import Icon from './Icon'

export default ({ icon, spin, type, children, btnType, className }) => {
    return (
        <button className={['btn', btnType && `btn-${btnType}`, className].join(' ')} type={type}>
            {icon && <Icon icon={icon} spin={spin} />} {children}
        </button>
    )
}
