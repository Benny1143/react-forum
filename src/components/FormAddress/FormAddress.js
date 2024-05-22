import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import styles from './FormAddress.module.scss';

const fields = ['country', 'description', 'lat', 'lng', 'locality', 'neighborhood', 'postal'];

const AutocompleteItem = ({ formattedSuggestion }) => (
  <div className={styles.suggestionItem}>
    <i className={cx('fa fa-map-marker', styles.suggestionIcon)} />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
);

const FormAddress = ({
  name,
  label,
  placeholder,
  setValue,
  errors,
  register,
  defaultValues,
}) => {
  const initialValue =
    defaultValues && defaultValues[name] && defaultValues[name].description
      ? defaultValues[name].description
      : '';
  const [description, setDescription] = useState(initialValue);
  const [isAddressValid, setIsAddressValid] = useState(false);

  function onSelect(description) {
    setDescription(description);
    setIsAddressValid(true);

    geocodeByAddress(description)
      .then(results => {
        // console.log('Results', results);
        const res = {
          description,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        results[0].address_components.forEach(component => {
          if (component.types.indexOf('street_number') > -1) {
            res.streetNumber = component.short_name;
          } else if (component.types.indexOf('route') > -1) {
            res.route = component.short_name;
          } else if (component.types.indexOf('postal_code') > -1) {
            res.postal = component.short_name;
          } else if (component.types.indexOf('neighborhood') > -1) {
            res.neighborhood = component.short_name;
          } else if (component.types.indexOf('locality') > -1) {
            res.locality = component.short_name;
          } else if (
            component.types.indexOf('administrative_area_level_1') > -1
          ) {
            res.state = component.short_name;
          } else if (component.types.indexOf('country') > -1) {
            res.country = component.short_name;
          }
        });
        return res;
      })
      .then(address => {
        // console.log(description);
        // setValue(name, {
        //   description,
        //   ...address
        // });
        setValue(`${name}.description`, description);
        Object.keys(address).forEach(key =>
          setValue(`${name}.${key}`, address[key])
        );
      });
  }

  function onChange(description) {
    setDescription(description);
    setIsAddressValid(false);
  }

  function onBlur() {
    if (!isAddressValid) {
      setDescription('');
      fields.forEach(key =>
        setValue(`${name}.${key}`, undefined, true)
      );
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    register({ name: `${name}.country` });
    register({ name: `${name}.description` });
    register({ name: `${name}.lat` });
    register({ name: `${name}.lng` });
    register({ name: `${name}.locality` });
    register({ name: `${name}.neighborhood` });
    register({ name: `${name}.postal` });
  }, []);

  return (
    <div
      className={cx(
        'input-holder',
        errors[`${name}.description`] ? 'has-error' : '',
        styles.formAddress
      )}
    >
      {label && (
        <label htmlFor={name}>
          <strong>{label}</strong>
          {/* {asyncValidating && <i className="icon-spinner fa-spin" />} */}
        </label>
      )}
      <PlacesAutocomplete
        id={name}
        name={name}
        classNames={{
          autocompleteContainer: styles.autocompleteContainer,
        }}
        inputProps={{
          value: description,
          onChange,
          onBlur,
          autoComplete: 'off',
          placeholder,
        }}
        options={{
          componentRestrictions: {
            country: 'sg',
          },
          types: ['geocode'],
        }}
        autocompleteItem={AutocompleteItem}
        highlightFirstSuggestion
        clearItemsOnError
        onSelect={onSelect}
        onEnterKeyDown={onSelect}
      />
      {errors[`${name}.description`] && (
        <span className="help-block">
          {errors[`${name}.description`].message}
        </span>
      )}
    </div>
  );
};

FormAddress.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

export default FormAddress;
