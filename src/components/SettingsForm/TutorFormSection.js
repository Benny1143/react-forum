import PropTypes from 'prop-types';
import React from 'react';
import FormInput from '../FormInput/FormInput';
import FormMultiselect from '../FormMultiselect/FormMultiselect';
import FormSelect from '../FormSelect/FormSelect';
import { mapValueToName } from 'utils/config';

function TutorFormSection(props) {
  const {
    mainLevels,
    subjects,
    qualifications,
    basis,
    tutorStatuses,
    setValue,
    errors,
    register,
    defaultValues,
  } = props;

  return (
    <>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-seprator" />
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h6>Tutor Details</h6>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-switch-holder">
            <label htmlFor="volunteer">Are you a volunteer tutor?</label>
            <div className="material-switch">
              <input
                id="volunteer"
                name="tutor.isVolunteer"
                type="checkbox"
                ref={register}
              />
              <label htmlFor="volunteer" className="label-default" />
            </div>
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Highest Qualification *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormSelect
                      name="tutor.qualification"
                      data={qualifications && Object.values(qualifications)}
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
                  <label>Teaching Experience (Years) *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormInput
                      name="tutor.experience"
                      type="number"
                      min={0}
                      placeholder="Number of years teaching"
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
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Teaching Subjects *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormMultiselect
                      name="tutor.teachingSubjects"
                      data={
                        subjects &&
                        Object.values(subjects)
                          .map(subject => ({
                            ...subject,
                            name: `${subject.name} (${mapValueToName(
                              mainLevels,
                              subject.mainLevel
                            )})`,
                          }))
                          .sort((first, second) =>
                            first.name.localeCompare(second.name)
                          )
                      }
                      setValue={setValue}
                      errors={errors}
                      register={register}
                      defaultValues={defaultValues}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Minimum Fee ($/hr) *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormInput
                      name="tutor.minFee"
                      type="number"
                      step={0.01}
                      min={0}
                      placeholder="Amount in dollars ($)"
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
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Teaching Basis *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormSelect
                      name="tutor.basis"
                      data={basis && Object.values(basis)}
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
                  <label>Current Status *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormSelect
                      name="tutor.status"
                      data={tutorStatuses && Object.values(tutorStatuses)}
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
    </>
  );
}

TutorFormSection.propTypes = {
  mainLevels: PropTypes.object,
  subjects: PropTypes.object,
  qualifications: PropTypes.object,
  basis: PropTypes.object,
  tutorStatuses: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

export default TutorFormSection;
