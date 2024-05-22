import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import dayjs from 'dayjs';
import FormAddress from '../FormAddress/FormAddress';
import FormInput from '../FormInput/FormInput';
import FormSelect from '../FormSelect/FormSelect';
import FormTextarea from '../FormTextarea/FormTextarea';
import FormDatePicker from '../FormDatePicker/FormDatePicker';
import ParentFormSection from './ParentFormSection';
import StudentFormSection from './StudentFormSection';
import TutorFormSection from './TutorFormSection';
import SocialProfilesFormSection from './SocialProfilesFormSection';

const SettingsSchema = yup.object().shape({
  role: yup.string().required('Your role is required'),
  name: yup.string().required('Your name is required'),
  gender: yup.string().required('Your gender is required'),
  dob: yup.string().required('Your date of birth is required'),
  address: yup.object({
    description: yup.string().required('Your home address is required')
  })
});

function SettingsForm(props) {
  const {
    user,
    mainLevels,
    subjects,
    levels,
    genders,
    qualifications,
    basis,
    tutorStatuses,
    schools,
  } = props;

  const defaultValues = user;

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    errors,
    formState: { isSubmitting, isSubmitted },
  } = useForm({
    mode: 'onBlur',
    validationSchema: SettingsSchema,
    defaultValues,
  });
  const watchRole = watch('role');

  const [error, setError] = useState(null);

  const onSubmit = async () => {
    const data = getValues({ nest: true });
    // console.log(data);
    try {
      await props.onSubmit(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const buttonText = () => {
    if (isSubmitting) {
      return 'Saving Changes...';
    }
    return 'Save Changes';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-radio">
            <span>
              <strong>I am a:</strong>
            </span>
          </div>
          <div className="cs-radio">
            <input
              name="role"
              type="radio"
              value="student"
              id="role1"
              ref={register}
            />
            <label htmlFor="role1">student</label>
          </div>
          <div className="cs-radio">
            <input
              name="role"
              type="radio"
              value="parent"
              id="role2"
              ref={register}
            />
            <label htmlFor="role2">parent</label>
          </div>
          <div className="cs-radio">
            <input
              name="role"
              type="radio"
              value="tutor"
              id="role3"
              ref={register}
            />
            <label htmlFor="role3">tutor</label>
          </div>
          <div className="cs-radio">
            <input
              name="role"
              type="radio"
              value="user"
              id="role4"
              ref={register}
            />
            <label htmlFor="role4">collaborator</label>
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h6>Personal Details</h6>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Name *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <FormInput
                    name="name"
                    type="text"
                    errors={errors}
                    register={register}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Gender *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <FormSelect
                    name="gender"
                    type="text"
                    data={genders && Object.values(genders)}
                    errors={errors}
                    register={register}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Date of Birth *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <FormDatePicker
                    name="dob"
                    maxDate={dayjs()
                      .subtract(6, 'years')
                      .toDate()}
                    openToDate={dayjs()
                      .subtract(30, 'years')
                      .toDate()}
                    yearDropdownItemNumber={30}
                    setValue={setValue}
                    errors={errors}
                    register={register}
                    defaultValues={defaultValues}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Home Postal Code / Address *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <FormAddress
                    name="address"
                    setValue={setValue}
                    errors={errors}
                    register={register}
                    defaultValues={defaultValues}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Home Address Unit</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <FormInput
                    name="address.unit"
                    type="text"
                    errors={errors}
                    register={register}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <label>About you</label>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <FormTextarea
            name="description"
            errors={errors}
            register={register}
          />
        </div>
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="cs-seprator" />
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h6>Contact Details</h6>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Email Address (Read-only)</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormInput
                      name="email"
                      type="email"
                      disabled
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Contact Number</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormInput
                      name="contact"
                      type="text"
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {watchRole === 'student' && (
        <StudentFormSection
          subjects={subjects}
          levels={levels}
          schools={schools}
          watch={watch}
          setValue={setValue}
          errors={errors}
          register={register}
          defaultValues={defaultValues}
        />
      )}
      {watchRole === 'parent' && (
        <ParentFormSection
          mainLevels={mainLevels}
          subjects={subjects}
          levels={levels}
          watch={watch}
          setValue={setValue}
          errors={errors}
          register={register}
          defaultValues={defaultValues}
        />
      )}
      {watchRole === 'tutor' && (
        <TutorFormSection
          mainLevels={mainLevels}
          subjects={subjects}
          qualifications={qualifications}
          basis={basis}
          tutorStatuses={tutorStatuses}
          setValue={setValue}
          errors={errors}
          register={register}
          defaultValues={defaultValues}
        />
      )}
      <SocialProfilesFormSection errors={errors} register={register} />
      <div className="cs-field-holder">
        <div className="col-sm-12">
          {error && (
            <div className="has-error">
              <span className="help-block">{error}</span>
            </div>
          )}
          {isSubmitted && Object.values(errors).length > 0 && (
            <div className="has-error">
              <span className="help-block">Oops, at least one form field has not been entered properly. <br />Please scroll upwards to find the input error.</span>
            </div>
          )}
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-3 col-md-3 col-sm-12 col-md-12">
          <div className="cs-field">
            <div className="cs-btn-submit">
              <input
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

SettingsForm.propTypes = {
  mainLevels: PropTypes.object,
  subjects: PropTypes.object,
  levels: PropTypes.object,
  genders: PropTypes.object,
  qualifications: PropTypes.object,
  basis: PropTypes.object,
  tutorStatuses: PropTypes.object,
  schools: PropTypes.object,
};

export default SettingsForm;
