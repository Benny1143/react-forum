import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';

const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(30),
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(6),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function SignupForm(props) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    validationSchema: SignupSchema,
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
          <label htmlFor="name" className={errors.name ? 'has-error' : ''}>
            <strong>Name</strong>
            <i className="icon-user" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Type name"
              ref={register}
            />
            {errors.name && (
              <span className="help-block">
                {errors.name && errors.name.message}
              </span>
            )}
          </label>
        </div>
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
        <div className="input-holder">
          <label
            htmlFor="password"
            className={errors.password ? 'has-error' : ''}
          >
            <strong>Password</strong>
            <i className="icon-lock" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Type password"
              ref={register}
            />
            {errors.password && (
              <span className="help-block">
                {errors.password && errors.password.message}
              </span>
            )}
          </label>
        </div>
        <div className="input-holder">
          <label
            htmlFor="passwordConfirmation"
            className={errors.confirmPassword ? 'has-error' : ''}
          >
            <strong>Confirm password</strong>
            <i className="icon-checkmark" />
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Type password again"
              ref={register}
            />
            {errors.confirmPassword && (
              <span className="help-block">
                {errors.confirmPassword && errors.confirmPassword.message}
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
            value="CREATE ACCOUNT"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignupForm;
