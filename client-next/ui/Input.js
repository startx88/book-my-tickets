import React from 'react'
import FormGroup from './FormGroup';

export default ({
    inputType,
    type,
    label,
    name,
    value,
    blur,
    setFieldValue,
    touched,
    errors,
    className,
    parentClassName }) => {

    let element;

    const invalid = touched[name] && errors[name];
    const valid = touched[name];
    const classes = ['form-control', invalid && 'is-invalid', valid && 'is-valid', className].join(' ');


    // Change Handler
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFieldValue(name, value)
    }

    switch (inputType) {
        case ('input'):
            element = <input type={type} onBlur={blur} className={classes} value={value} onChange={changeHandler} name={name} />;
            break;
        case ('textarea'):
            console.log('hello', inputType)
            element = <textarea onBlur={blur} className={classes} onChange={changeHandler} name={name}>{value}</textarea>
            break;
        case ('radio'):
            element = <input type={type} onBlur={blur} value={value} className={className} onChange={changeHandler} name={name} />
            break;
        case ('checkbox'):
            element = <input type={type} onBlur={blur} value={value} className={className} onChange={changeHandler} name={name} />
            break;
        default:
            element = <input type={type} onBlur={blur} className={classes} value={value} onChange={changeHandler} name={name} />
            break;
    }


    return (
        <FormGroup className={parentClassName}>
            {label && <label>{label}</label>}
            {element}
            {touched[name] && errors[name] &&
                <span className="invalid-feedback">
                    {errors[name]}
                </span>
            }
        </FormGroup>
    )
}