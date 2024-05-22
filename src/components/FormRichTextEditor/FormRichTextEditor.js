import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormRichTextEditor = ({
  name,
  label,
  placeholder,
  setValue,
  errors,
  register,
  defaultValues,
}) => {
  const initialValue = (defaultValues && defaultValues[name]) || '';
  const [value, _setValue] = useState(initialValue);

  function handleChange(value) {
    _setValue(value);
    setValue(name, value);
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    register({ name });
  }, []);

  return (
    <div
      className={cx(
        'input-holder',
        errors[name] ? 'has-error' : '',
      )}
    >
      {label && (
        <label htmlFor={name}>
          <strong>{label}</strong>
          {/* {asyncValidating && <i className="icon-spinner fa-spin" />} */}
        </label>
      )}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
      />
      {errors[name] && (
        <span className="help-block">{errors[name].message}</span>
      )}
    </div>
  );
};

FormRichTextEditor.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

export default FormRichTextEditor;
