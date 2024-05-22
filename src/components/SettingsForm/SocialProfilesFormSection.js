import PropTypes from 'prop-types';
import React from 'react';
import FormInput from '../FormInput/FormInput';

function SocialProfilesFormSection(props) {
  const { errors, register } = props;

  return (
    <>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-seprator" />
        </div>
        <div className="col-lg-12 col-md-12 cols-sm-12 col-xs-12">
          <h6>Social Profiles</h6>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a data-original-title="Facebook" tabIndex="-1">
              <i className="icon-facebook2" />
            </a>
            <FormInput
              name="socialProfiles.facebook"
              type="url"
              placeholder="www.facebook.com"
              errors={errors}
              register={register}
            />
          </div>
        </div>
      </div>
      {/* <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            <a data-original-title="Pinterest" tabIndex="-1">
              <i className="icon-pinterest3" />
            </a>
            <FormInput
              name="socialProfiles.pinterest"
              type="url"
              placeholder="www.pinterest.com"
              errors={errors}
              register={register}
            />
          </div>
        </div>
      </div> */}
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a data-original-title="Twitter" tabIndex="-1">
              <i className="icon-twitter2" />
            </a>
            <FormInput
              name="socialProfiles.twitter"
              type="url"
              placeholder="www.twitter.com"
              errors={errors}
              register={register}
            />
          </div>
        </div>
      </div>
      <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a data-original-title="Linkedin" tabIndex="-1">
              <i className="icon-linkedin22" />
            </a>
            <FormInput
              name="socialProfiles.linkedin"
              type="url"
              placeholder="www.linkedin.com"
              errors={errors}
              register={register}
            />
          </div>
        </div>
      </div>
      {/* <div className="cs-field-holder">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-field">
            <a data-original-title="Google+" tabIndex="-1">
              <i className="icon-google-plus" />
            </a>
            <FormInput
              name="socialProfiles.google"
              type="url"
              placeholder="plus.google.com"
              errors={errors}
              register={register}
            />
          </div>
        </div>
      </div> */}
    </>
  );
}

SocialProfilesFormSection.propTypes = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

export default SocialProfilesFormSection;
