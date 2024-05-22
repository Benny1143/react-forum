import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import FormTextarea from '../FormTextarea/FormTextarea';

const MessageSchema = yup.object().shape({
  message: yup.string().required(),
});

function MessageForm(props) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    validationSchema: MessageSchema,
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
        <FormTextarea
          name="message"
          placeholder="Type message"
          errors={errors}
          register={register}
        />
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

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MessageForm;
