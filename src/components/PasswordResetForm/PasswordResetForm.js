import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import FormInput from '../FormInput/FormInput';

const ForgotSchema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function PasswordResetForm(props) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <label>New password</label>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            <FormInput
              name="password"
              type="password"
              errors={errors}
              register={register}
            />
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <label>Confirm new password</label>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            <FormInput
              name="confirmPassword"
              type="password"
              errors={errors}
              register={register}
            />
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-3 col-md-3 col-sm-12 col-md-12">
          {error && (
            <div className="has-error">
              <span className="help-block">{error}</span>
            </div>
          )}
          <div className="cs-field">
            <div className="cs-btn-submit">
              <input
                className={
                  'cs-bgcolor' + (isSubmitting ? '' : ' csborder-color')
                }
                type="submit"
                value="Submit"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

PasswordResetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordResetForm;
