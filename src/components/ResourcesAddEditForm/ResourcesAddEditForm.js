import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import FormDropzone from '../FormDropzone/FormDropzone';
import FormInput from '../FormInput/FormInput';
import FormSelect from '../FormSelect/FormSelect';
import FormMultiselect from '../FormMultiselect/FormMultiselect';
import FormRichTextEditor from '../FormRichTextEditor/FormRichTextEditor';
import { isImageUri } from 'utils/helper';

const ResourcesAddSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(50),
  description: yup.string().required(),
  mainLevel: yup.string().required(),
  subject: yup.string().required(),
  levels: yup
    .array()
    .required()
    .min(1),
  types: yup
    .array()
    .required()
    .min(1),
  difficulty: yup.string().required(),
  language: yup.string().required(),
  files: yup
    .array()
    .required()
    .min(1),
  avatars: yup.array(),
});
const ResourcesEditSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(50),
  description: yup.string().required(),
  mainLevel: yup.string().required(),
  subject: yup.string().required(),
  levels: yup
    .array()
    .required()
    .min(1),
  types: yup
    .array()
    .required()
    .min(1),
  difficulty: yup.string().required(),
  language: yup.string().required(),
});

function ResourcesAddEditForm(props) {
  const {
    resource,
    mainLevels,
    subjects,
    levels,
    types,
    difficulties,
    languages,
  } = props;

  const defaultValues = resource;

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    errors,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onBlur',
    validationSchema: resource ? ResourcesEditSchema : ResourcesAddSchema,
    defaultValues,
  });
  const watchMainLevel = watch('mainLevel');

  const [error, setError] = useState(null);

  const onSubmit = async data => {
    // console.log(data);
    try {
      await props.onSubmit(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const buttonText = () => {
    if (isSubmitting) {
      return resource ? 'Saving...' : 'Uploading...';
    }
    return resource ? 'Save' : 'Upload';
  };

  return (
    <div className="cs-contact-form view-two">
      <div className="cs-section-title">
        <h2>
          {resource ? `Edit Resource "${resource.name}"` : 'Upload Resource'}
        </h2>
        <p>Required fields are marked with asterisks(*).</p>
      </div>
      <div className="form-holder">
        <div className="row">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <div className="row">
                <div className="cs-form-holder">
                  {resource && (
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="input-holder">
                        <label>Current Resource File</label>
                        <div style={{ marginBottom: '5px', maxWidth: '100%' }}>
                          <img
                            src={resource.url && isImageUri(resource.url) ? resource.url : require('assets/img/resource.png')}
                            alt="Resource"
                          />
                        </div>
                        <div>
                          <a
                            className="btn btn-primary"
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <FormDropzone
                      name="files"
                      label={
                        resource
                          ? 'Replace Resource File'
                          : 'Upload Resource File *'
                      }
                      accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/zip,application/x-compressed-zip,image/jpeg,image/png,image/gif"
                      setValue={setValue}
                      errors={errors}
                      register={register}
                      defaultValues={defaultValues}
                    />
                  </div>
                </div>
                <div className="cs-form-holder">
                  {resource && resource.avatar && (
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="input-holder">
                        <label>Current Display Picture</label>
                        <div style={{ marginBottom: '5px', maxWidth: '100%' }}>
                          <img src={resource.avatar} alt={resource.name} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <FormDropzone
                      name="avatars"
                      label={
                        resource && resource.avatar
                          ? 'Replace Display Picture'
                          : 'Upload Display Picture'
                      }
                      accept="image/jpeg,image/png,image/gif"
                      setValue={setValue}
                      errors={errors}
                      register={register}
                      defaultValues={defaultValues}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="row">
                <div className="cs-form-holder">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <FormInput
                      name="name"
                      type="text"
                      placeholder="Name *"
                      label="Name *"
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
                <div className="cs-form-holder">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <FormRichTextEditor
                      name="description"
                      placeholder="Description *"
                      label="Description *"
                      setValue={setValue}
                      errors={errors}
                      register={register}
                      defaultValues={defaultValues}
                    />
                  </div>
                </div>
                <div className="cs-form-holder">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <FormSelect
                      name="mainLevel"
                      label="Main Level *"
                      data={mainLevels}
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
                <div className="cs-form-holder">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <FormSelect
                      name="subject"
                      label="Subject *"
                      data={subjects
                        .filter(subject => subject.mainLevel === watchMainLevel)
                        .sort((first, second) =>
                          first.name.localeCompare(second.name)
                        )}
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
                <div className="cs-form-holder">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <FormMultiselect
                      name="levels"
                      placeholder="Levels *"
                      label="Levels *"
                      data={levels
                        .filter(level => level.mainLevel === watchMainLevel)
                        .sort((first, second) =>
                          first.name.localeCompare(second.name)
                        )}
                      setValue={setValue}
                      errors={errors}
                      register={register}
                      defaultValues={defaultValues}
                    />
                  </div>
                </div>
                <div className="cs-form-holder">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <FormMultiselect
                      name="types"
                      placeholder="Types *"
                      label="Types *"
                      data={types.sort((first, second) =>
                        first.name.localeCompare(second.name)
                      )}
                      setValue={setValue}
                      errors={errors}
                      register={register}
                      defaultValues={defaultValues}
                    />
                  </div>
                </div>
                <div className="cs-form-holder">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <FormSelect
                      name="difficulty"
                      label="Difficulty *"
                      data={difficulties}
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
                <div className="cs-form-holder">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <FormSelect
                      name="language"
                      label="Language *"
                      data={languages}
                      errors={errors}
                      register={register}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-md-12">
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
          </form>
        </div>
      </div>
    </div>
  );
}

ResourcesAddEditForm.propTypes = {
  resource: PropTypes.object,
  mainLevels: PropTypes.array,
  subjects: PropTypes.array,
  levels: PropTypes.array,
  types: PropTypes.array,
  difficulties: PropTypes.array,
  languages: PropTypes.array,
  mainLevelValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default ResourcesAddEditForm;
