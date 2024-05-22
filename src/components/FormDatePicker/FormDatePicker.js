import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './FormDatePicker.module.scss';

const FormDatePicker = ({
  name,
  label,
  placeholder,
  dateFormat,
  minDate,
  maxDate,
  openToDate,
  yearDropdownItemNumber,
  setValue,
  errors,
  register,
  defaultValues,
}) => {
  const initialValue =
    defaultValues && defaultValues[name] ? defaultValues[name] : undefined;
  const [value, _setValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenDatePicker() {
    setIsOpen(!isOpen);
  }

  function handleChangeDatePicker(value) {
    _setValue(value);
    setValue(name, value);
  }

  function handleChangeDatePickerModal(value) {
    _setValue(value);
    setValue(name, value);
    setIsOpen(!isOpen);
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    register({ name });
  }, []);

  const selected = (value && new Date(value)) || undefined;
  return (
    <div
      className={cx(
        'input-holder',
        errors[name] ? 'has-error' : '',
        styles.formDatePicker
      )}
    >
      {label && (
        <label htmlFor={name}>
          <strong>{label}</strong>
          {/* {asyncValidating && <i className="icon-spinner fa-spin" />} */}
        </label>
      )}
      <div className={styles.container}>
        <DatePicker
          // key={`date-${dateValue}`}
          id={name}
          name={name}
          selected={selected}
          onChange={handleChangeDatePicker}
          dateFormat={dateFormat}
          minDate={minDate && new Date(minDate)}
          maxDate={maxDate && new Date(maxDate)}
          openToDate={selected || (openToDate && new Date(openToDate))}
          placeholderText={placeholder}
        />
        <span className={styles.select}>
          <button
            tabIndex="-1"
            title="Select date"
            type="button"
            className={styles.selectButton}
            onClick={handleOpenDatePicker}
          >
            <i className="icon-calendar" />
          </button>
        </span>
        {isOpen && (
          <DatePicker
            selected={selected}
            onChange={handleChangeDatePickerModal}
            dateFormat={dateFormat}
            minDate={minDate && new Date(minDate)}
            maxDate={maxDate && new Date(maxDate)}
            openToDate={selected || (openToDate && new Date(openToDate))}
            yearDropdownItemNumber={yearDropdownItemNumber}
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            withPortal
            inline
          />
        )}
      </div>
      {errors[name] && (
        <span className="help-block">{errors[name].message}</span>
      )}
    </div>
  );
};

FormDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  dateFormat: PropTypes.string,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  openToDate: PropTypes.object,
  yearDropdownItemNumber: PropTypes.number,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

FormDatePicker.defaultProps = {
  dateFormat: 'yyyy-MM-dd',
};

export default FormDatePicker;
