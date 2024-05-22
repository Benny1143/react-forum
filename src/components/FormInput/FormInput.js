import PropTypes from 'prop-types';
import React from 'react';

const FormInput = ({
  name,
  label,
  type,
  placeholder,
  disabled,
  min,
  step,
  errors,
  register,
}) => (
  <div className={errors[name] ? 'input-holder has-error' : 'input-holder'}>
    <label htmlFor={name}>
      <strong>{label}</strong>
      {/* {asyncValidating && <i className="icon-spinner fa-spin" />} */}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      min={min}
      step={step}
      ref={register}
    />
    {errors[name] && <span className="help-block">{errors[name].message}</span>}
  </div>
);

FormInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  step: PropTypes.number,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

export default FormInput;

// const FormInput = ({
//   input,
//   label,
//   type,
//   placeholder,
//   disabled,
//   min,
//   step,
//   meta: { asyncValidating, touched, error }
// }) => (
//   <div className={error && touched ? 'input-holder has-error' : 'input-holder'}>
//     <label htmlFor={input.name}>
//       <strong>{label}</strong>
//       {asyncValidating && <i className="icon-spinner fa-spin" />}
//     </label>
//     <input
//       {...input}
//       id={input.name}
//       type={type}
//       placeholder={placeholder}
//       disabled={disabled}
//       min={min}
//       step={step}
//     />
//     {touched && error && <span className="help-block">{error}</span>}
//   </div>
// );

// FormInput.propTypes = {
//   input: PropTypes.object,
//   label: PropTypes.string,
//   type: PropTypes.string,
//   placeholder: PropTypes.string,
//   disabled: PropTypes.bool,
//   min: PropTypes.number,
//   step: PropTypes.number,
//   meta: PropTypes.object
// };

// export default FormInput;
