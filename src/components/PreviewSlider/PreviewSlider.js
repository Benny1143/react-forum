import React, { Component } from 'react';
import Slider from 'react-slick';
import Preview from '../Preview/Preview';

export default class PreviewSlider extends Component {
  render() {
    const { resources, users, subjects, levels, previews } = this.props;

    return (
      <Slider
        dots
        arrows={false}
        autoplay
        draggable={false}
        slidesToShow={4}
        slidesToScroll={4}
        responsive={[
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 100000,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
        ]}
      >
        {previews &&
          previews.map(preview => {
            return (
              <Preview
                key={preview._id}
                resource={resources[preview._id]}
                users={users}
                subjects={subjects}
                levels={levels}
              />
            );
          })}
      </Slider>
    );
  }
}
