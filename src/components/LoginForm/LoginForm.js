import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
  password: yup.string().required(),
});

function LoginForm(props) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    validationSchema: LoginSchema,
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
        {error && (
          <div className="has-error">
            <span className="help-block">{error}</span>
          </div>
        )}
        <div className="input-holder">
          <input
            className={'cs-color' + (isSubmitting ? '' : ' csborder-color')}
            type="submit"
            value="SIGN IN"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
