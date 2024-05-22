import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import FormTextarea from '../FormTextarea/FormTextarea';
import FormRating from '../FormRating/FormRating';

const ReviewsAddSchema = yup.object().shape({
  description: yup.string(),
});

function ReviewsAddForm(props) {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    validationSchema: ReviewsAddSchema,
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
    <div className="cs-add-review">
      <div className="cs-review-form">
        <div className="row">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-your-rating">
                <h6>Your Rating</h6>
                <div className="cs-rating">
                  <FormRating
                    name="rating"
                    setValue={setValue}
                    errors={errors}
                    register={register}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="input-holder">
                <h6>Your Review</h6>
                <FormTextarea
                  name="description"
                  errors={errors}
                  register={register}
                />
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {error && (
                <div className="has-error">
                  <span className="help-block">{error}</span>
                </div>
              )}
              <div className="input-button">
                <input
                  className={
                    'cs-button cs-bgcolor' +
                    (isSubmitting ? '' : ' csborder-color')
                  }
                  type="submit"
                  value="Submit"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

ReviewsAddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ReviewsAddForm;
