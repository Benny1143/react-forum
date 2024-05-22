import PropTypes from 'prop-types';
import React from 'react';

const FormModalInput = ({
  input,
  label,
  type,
  iconClassName,
  placeholder,
  meta: { asyncValidating, touched, error },
}) => (
  <div className="input-holder">
    <label htmlFor={input.name} className={error && touched ? 'has-error' : ''}>
      <strong>{label}</strong>
      <i className={asyncValidating ? 'icon-spinner fa-spin' : iconClassName} />
      <input {...input} id={input.name} type={type} placeholder={placeholder} />
      {touched && error && <span className="help-block">{error}</span>}
    </label>
  </div>
);

FormModalInput.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  iconClassName: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
};

export default FormModalInput;
