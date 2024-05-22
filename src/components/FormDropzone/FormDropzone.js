import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloseButton from '../CloseButton/CloseButton';
import styles from './FormDropzone.module.scss';
import { readFileAsDataURLAsync } from 'utils/filereader';
import { isImageFile } from 'utils/validation';

const FormDropzone = ({
  name,
  label,
  accept,
  setValue,
  errors,
  register,
  defaultValues,
}) => {
  const initialValue =
    defaultValues && defaultValues[name]
      ? defaultValues[name].map(url => ({ url }))
      : [];

  /* value: [{ file, url }] */
  const [value, _setValue] = useState(initialValue);

  const selected = (value && value[0]) || null;
  // console.log(selected);

  /* eslint-disable react-hooks/exhaustive-deps */
  const onDrop = useCallback(async acceptedFiles => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      // console.log(file);
      const url = await readFileAsDataURLAsync(file);
      _setValue([
        {
          file,
          url,
        },
      ]);
      // console.log({
      //   file,
      //   url
      // });
      setValue(name, [{ file }]);
    } else {
      // console.log('setting to []');
      _setValue([]);
      setValue(name, []);
    }
  }, []);

  const removeFile = file => () => {
    window.URL.revokeObjectURL(file.url);
    _setValue([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    activeClassName: styles.dropzoneActive,
    onDrop,
    multiple: false,
    maxSize: 1024 * 1024 * 1024,
    accept:
      accept ||
      'application/pdf,application/zip,image/jpeg,image/png,image/gif',
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    register({ name });
  }, []);

  return (
    <div className={errors[name] ? 'input-holder has-error' : 'input-holder'}>
      <label htmlFor={name}>
        <strong>{label}</strong>
        {/* {asyncValidating && <i className="icon-spinner fa-spin" />} */}
      </label>

      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        {!selected && (
          <div className={styles.dropzoneNotes}>
            {errors[name] && (
              <span className="help-block">{errors[name].message}</span>
            )}
            {isDragActive ? (
              <div>Drop file here.</div>
            ) : (
              <div>Drop file here, or click/press inside the box.</div>
            )}
          </div>
        )}
        {selected && (
          <div>
            <ul>
              <li>
                {(isImageFile(selected.file) && (
                  <img src={selected.url} alt="Resource" />
                )) || (
                  <img
                    src={require('assets/img/resource.png')}
                    alt="Resource"
                  />
                )}
                <CloseButton onCloseClicked={removeFile(selected)} />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

FormDropzone.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  accept: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

export default FormDropzone;
