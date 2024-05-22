import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormMultiselect from '../FormMultiselect/FormMultiselect';
import FormSelect from '../FormSelect/FormSelect';

function StudentFormSection(props) {
  const {
    subjects,
    levels,
    schools,
    watch,
    setValue,
    errors,
    register,
    defaultValues,
  } = props;

  const watchStudentMainLevel = watch('student.mainLevel');

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    register({ name: 'student.mainLevel' });
  }, []);

  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="cs-seprator" />
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h6>Student Details</h6>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label>Level *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormSelect
                      name="student.level"
                      data={levels && Object.values(levels)}
                      onChange={event => {
                        const level = event.target.value;
                        if (
                          level &&
                          levels &&
                          levels[level] &&
                          levels[level].mainLevel
                        ) {
                          setValue(
                            'student.mainLevel',
                            levels[level].mainLevel
                          );
                        } else {
                          setValue('student.mainLevel', '');
                        }
                      }}
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
                  <label>Current School *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormSelect
                      name="student.school"
                      data={
                        schools &&
                        Object.values(schools).sort((first, second) =>
                          first.name.localeCompare(second.name)
                        )
                      }
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
                  <label>Worst Subjects *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormMultiselect
                      name="student.worstSubjects"
                      data={
                        subjects &&
                        Object.values(subjects)
                          .filter(
                            subject =>
                              subject.mainLevel === watchStudentMainLevel
                          )
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
                  <label>Best Subjects *</label>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-field">
                    <FormMultiselect
                      name="student.bestSubjects"
                      data={
                        subjects &&
                        Object.values(subjects)
                          .filter(
                            subject =>
                              subject.mainLevel === watchStudentMainLevel
                          )
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
          </div>
        </div>
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="cs-seprator" />
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h6>Tuition Details</h6>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-switch-holder">
            <label htmlFor="tuition1">Do you want to be a tutor too?</label>
            <div className="material-switch">
              <input
                id="tuition1"
                name="student.interestBeTutor"
                type="checkbox"
                ref={register}
              />
              <label htmlFor="tuition1" className="label-default" />
            </div>
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-switch-holder">
            <label htmlFor="tuition2">Let tutors contact me</label>
            <div className="material-switch">
              <input
                id="tuition2"
                name="student.interestTutorContact"
                type="checkbox"
                ref={register}
              />
              <label htmlFor="tuition2" className="label-default" />
            </div>
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-switch-holder">
            <label htmlFor="tuition3">Open to group tuition</label>
            <div className="material-switch">
              <input
                id="tuition3"
                name="student.interestGroupTuition"
                type="checkbox"
                ref={register}
              />
              <label htmlFor="tuition3" className="label-default" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

StudentFormSection.propTypes = {
  subjects: PropTypes.object,
  levels: PropTypes.object,
  schools: PropTypes.object,
  watch: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

export default StudentFormSection;
