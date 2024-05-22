import PropTypes from 'prop-types';
import React from 'react';

const FormSelect = ({
  name,
  label,
  placeholder,
  data,
  onChange,
  errors,
  register,
}) => (
  <div className={errors[name] ? 'input-holder has-error' : 'input-holder'}>
    <label htmlFor={name}>
      <strong>{label}</strong>
      {/* {asyncValidating && <i className="icon-spinner fa-spin" />} */}
    </label>
    <select
      id={name}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      ref={register}
    >
      <option value="">{placeholder}</option>
      {data &&
        data.map(entry => (
          <option value={entry.value} key={entry.value}>
            {entry.name}
          </option>
        ))}
    </select>
    {errors[name] && <span className="help-block">{errors[name].message}</span>}
  </div>
);

FormSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

FormSelect.defaultProps = {
  placeholder: '-- Select --',
  data: [],
};

export default FormSelect;
