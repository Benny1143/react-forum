import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Rater from 'react-rater';
import Star from '../Star/Star';
import styles from './FormRating.module.scss';

const FormRating = ({
  name,
  label,
  setValue,
  errors,
  register,
  defaultValues,
}) => {
  const initialValue =
    defaultValues && defaultValues[name] ? defaultValues[name] : [];
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
        styles.formRating
      )}
    >
      {label && (
        <label htmlFor={name}>
          <strong>{label}</strong>
          {/* {asyncValidating && <i className="icon-spinner fa-spin" />} */}
        </label>
      )}
      <Rater
        // {...input}
        id={name}
        rating={value * 5}
        onRate={({ rating }) => {
          handleChange(rating / 5);
        }}
        style={{ display: 'inline-block' }}
      >
        <Star />
      </Rater>
      {errors[name] && (
        <span className="help-block">{errors[name].message}</span>
      )}
    </div>
  );
};

FormRating.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

export default FormRating;
