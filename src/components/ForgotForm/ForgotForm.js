import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';

const ForgotSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
});

function ForgotForm(props) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    validationSchema: ForgotSchema,
  });

  const [error, setError] = useState(null);

  const onSubmit = async data => {
    try {
      await props.onSubmit(data);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="cs-login-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-holder">
          <label htmlFor="email" className={errors.email ? 'has-error' : ''}>
            <strong>Email</strong>
            <i className="icon-envelope" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Type email"
              ref={register}
            />
            {errors.email && (
              <span className="help-block">
                {errors.email && errors.email.message}
              </span>
            )}
          </label>
        </div>
        {error && (
          <div className="has-error">
            <span className="help-block">{error}</span>
          </div>
        )}
        <div className="input-holder">
          <input
            className={'cs-color' + (isSubmitting ? '' : ' csborder-color')}
            type="submit"
            value="SEND"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

ForgotForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ForgotForm;
