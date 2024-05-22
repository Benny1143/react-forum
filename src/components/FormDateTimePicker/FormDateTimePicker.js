import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css';
import styles from './FormDateTimePicker.module.scss';

moment.locale('en');
momentLocalizer();

const FormDateTimePicker = ({
  input,
  label,
  max,
  initialView,
  finalView,
  meta: { asyncValidating, touched, error },
}) => {
  const dateValue = (input.value && new Date(input.value)) || null;
  return (
    <div
      className={cx(
        'input-holder',
        error && touched ? 'has-error' : '',
        styles.formDateTimePicker
      )}
    >
      <label htmlFor={input.name}>
        <strong>{label}</strong>
        {asyncValidating && <i className="icon-spinner fa-spin" />}
      </label>
      <DateTimePicker
        {...input}
        id={input.name}
        format="LL"
        editFormat="YYYY-MM-DD"
        time={false}
        max={max}
        initialView={initialView}
        finalView={finalView}
        // onBlur={() => input.onBlur()}
        // onChange={value => {
        //   // console.log(value);
        //   const pluckedValue = value && !!value.length && value.map(obj => obj.value) || value;
        //   console.log(pluckedValue);
        //   input.onChange(pluckedValue);
        // }}
        value={dateValue}
      />
      {touched && error && <span className="help-block">{error}</span>}
    </div>
  );
};

FormDateTimePicker.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  max: PropTypes.object,
  initialView: PropTypes.string,
  finalView: PropTypes.string,
  meta: PropTypes.object,
};

export default FormDateTimePicker;
