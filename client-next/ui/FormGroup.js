import React from 'react'

export default ({ className, children }) => {
    const classes = ["form-group", className].join(' ')
    return (
        <div className={classes}>
            {children}
        </div>
    )
}