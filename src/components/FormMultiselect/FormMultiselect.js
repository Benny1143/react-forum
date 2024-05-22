import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import find from 'lodash/find';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import styles from './FormMultiselect.module.scss';

const FormMultiselect = ({
  name,
  label,
  placeholder,
  data,
  setValue,
  errors,
  register,
  defaultValues,
}) => {
  const initialValue =
    defaultValues && defaultValues[name] ? defaultValues[name] : [];
  const [value, _setValue] = useState(initialValue);

  function handleMultiChange(value) {
    _setValue(value);
    setValue(name, value);
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    register({ name });
  }, []);

  const unpluckedValue = value
    .map(value => find(data, { value }))
    .filter(value => value !== undefined);
  // console.log(unpluckedValue);
  return (
    <div
      className={cx(
        'input-holder',
        errors[name] ? 'has-error' : '',
        styles.formMultiselect
      )}
    >
      {label && (
        <label htmlFor={name}>
          <strong>{label}</strong>
          {/* {asyncValidating && <i className="icon-spinner fa-spin" />} */}
        </label>
      )}
      <Multiselect
        id={name}
        name={name}
        placeholder={placeholder}
        valueField="value"
        textField="name"
        data={data}
        value={unpluckedValue}
        onChange={dataItems => {
          // console.log(dataItems);
          const pluckedDataItems =
            (dataItems &&
              !!dataItems.length &&
              dataItems.map(obj => obj.value)) ||
            dataItems;
          // console.log(pluckedDataItems);
          // input.onChange(pluckedValue);
          // if (onChangeTags) onChangeTags(pluckedValue);
          handleMultiChange(pluckedDataItems);
        }}
        allowCreate={false}
      />
      {errors[name] && (
        <span className="help-block">{errors[name].message}</span>
      )}
    </div>
  );
};

FormMultiselect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

FormMultiselect.defaultProps = {
  data: [],
};

export default FormMultiselect;
