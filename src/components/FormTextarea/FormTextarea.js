import PropTypes from 'prop-types';
import React from 'react';

const FormTextarea = ({ name, label, placeholder, errors, register }) => (
  <div className={errors[name] ? 'input-holder has-error' : 'input-holder'}>
    <label htmlFor={name}>
      <strong>{label}</strong>
      {/* {asyncValidating && <i className="icon-spinner fa-spin" />} */}
    </label>
    <textarea id={name} name={name} placeholder={placeholder} ref={register} />
    {errors[name] && <span className="help-block">{errors[name].message}</span>}
  </div>
);

FormTextarea.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

export default FormTextarea;
