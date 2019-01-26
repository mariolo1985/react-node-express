import React from 'react';
import PropTypes from 'prop-types';

const SignUpInput = ({
    handleOnChange,
    isRequired,
    inputType,
    labelText,
    placeholderText
}) => {
    return (
        <div className='form-input-wrapper clear'>
            <span className='form-input-label'>
                {labelText}
                {
                    isRequired
                    && <span className='form-input-label-required'>*</span>
                }
            </span>
            <input placeholder={placeholderText} type={inputType} className={`input-textbox input-sign-up-${labelText}`} onChange={e => handleOnChange(e)} />
        </div>
    );
};

SignUpInput.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    isRequired: PropTypes.bool.isRequired,
    inputType: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    placeholderText: PropTypes.string.isRequired
};

export default SignUpInput;
