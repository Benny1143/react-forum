import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import FormTextarea from '../FormTextarea/FormTextarea';

const UserContactSchema = yup.object().shape({
  message: yup.string().required(),
});

function UserContactForm(props) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    validationSchema: UserContactSchema,
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
      <FormTextarea
        name="message"
        placeholder="Message"
        errors={errors}
        register={register}
      />
      {error && (
        <div className="has-error">
          <span className="help-block">{error}</span>
        </div>
      )}
      <input
        className={'cs-bgcolor' + (isSubmitting ? '' : ' csborder-color')}
        type="submit"
        value="Submit"
        disabled={isSubmitting}
      />
    </form>
  );
}

UserContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default UserContactForm;
