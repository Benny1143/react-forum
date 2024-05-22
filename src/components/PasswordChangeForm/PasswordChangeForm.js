import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import FormInput from '../FormInput/FormInput';

const PasswordChangeSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required()
    .min(6),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

function PasswordChangeForm(props) {
  const {
    register,
    handleSubmit,
    reset,
    clearError,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    validationSchema: PasswordChangeSchema,
  });

  const [error, setError] = useState(null);

  const onSubmit = async data => {
    // console.log(data);
    try {
      await props.onSubmit(data);
      reset();
      clearError();
    } catch (e) {
      setError(e.message);
    }
  };

  const buttonText = () => {
    if (isSubmitting) {
      return 'Submitting...';
    }
    return 'Submit';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <label htmlFor="password">Current password</label>
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
          <label htmlFor="newPassword">New password</label>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            <FormInput
              name="newPassword"
              type="password"
              errors={errors}
              register={register}
            />
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <label htmlFor="confirmNewPassword">Confirm new password</label>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            <FormInput
              name="confirmNewPassword"
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
                className={isSubmitting ? '' : 'cs-bgcolor csborder-color'}
                type="submit"
                value={buttonText()}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

PasswordChangeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordChangeForm;
