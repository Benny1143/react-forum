import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import FormMultiselect from '../FormMultiselect/FormMultiselect';
import { mapValueToName } from 'utils/config';

function ParentFormSection(props) {
  const {
    mainLevels,
    subjects,
    levels,
    watch,
    setValue,
    errors,
    register,
    defaultValues,
  } = props;

  const watchParentMainLevels = watch('parent.mainLevels');

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    register({ name: 'parent.mainLevels' });
  }, []);

  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="cs-seprator" />
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h6>Children Tutoring Details</h6>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <label>Levels</label>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            <FormMultiselect
              name="parent.levels"
              data={levels && Object.values(levels)}
              onChangeTags={values => {
                setValue(
                  'parent.mainLevels',
                  values.reduce((acc, level) => {
                    const mainLevel =
                      levels && levels[level] && levels[level].mainLevel;
                    if (mainLevel && acc.indexOf(mainLevel) === -1) {
                      acc.push(mainLevel);
                    }
                    return acc;
                  }, [])
                );
              }}
              setValue={setValue}
              errors={errors}
              register={register}
              defaultValues={defaultValues}
            />
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <label>Subjects</label>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            <FormMultiselect
              name="parent.subjects"
              data={
                subjects &&
                Object.values(subjects)
                  .filter(
                    subject =>
                      watchParentMainLevels &&
                      watchParentMainLevels.indexOf(subject.mainLevel) > -1
                  )
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
    </>
  );
}

ParentFormSection.propTypes = {
  mainLevels: PropTypes.object,
  subjects: PropTypes.object,
  levels: PropTypes.object,
  watch: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

export default ParentFormSection;
