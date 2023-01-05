/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, forwardRef } from 'react';
import { useSlider, useNumberFormatter } from 'react-aria';
import { useSliderState } from 'react-stately';
import { clsx } from 'clsx';

import { isDefined } from 'tools/common';

import { Thumb } from './atoms';
import { Props } from './slider-input.types';
import styles from './slider-input.module.scss';

export const SliderInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      ariaLabel,
      id,
      value,
      onChange,
      disabled = false,
      min = 0,
      max = 100,
      step = 1,
      thumbs = 2,
      formatOptions,
    },
    forwardedRef
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const numberFormatter = useNumberFormatter(formatOptions);

    const sliderProps: Parameters<typeof useSliderState<number[]>>[0] = {
      label,
      value: isDefined(value)
        ? [
            Number.isNaN(value[0]) ? min : value[0],
            Number.isNaN(value[1]) ? max : value[1],
          ]
        : undefined,
      onChange: isDefined(onChange)
        ? (v) => onChange([v[0] ?? NaN, v[1] ?? NaN])
        : undefined,
      isDisabled: disabled,
      minValue: min,
      maxValue: max,
      step,
      numberFormatter,
    };

    const state = useSliderState<number[]>(sliderProps);

    const { groupProps, trackProps, labelProps, outputProps } = useSlider(
      { ...sliderProps, id, 'aria-label': ariaLabel },
      state,
      trackRef
    );

    return (
      <div
        {...groupProps}
        className={clsx(styles.slider, disabled && styles['-disabled'])}
      >
        {label ? (
          <label className={styles.label} {...labelProps}>
            {label}
          </label>
        ) : null}

        <div className={styles.trackpadContainer}>
          <div {...trackProps} className={styles.trackpad} ref={trackRef}>
            <div className={styles.line} />

            <div
              className={clsx(styles.line, styles['-active'])}
              style={{
                '--left': thumbs > 1 ? state.getThumbPercent(0) : 0,
                '--right': 1 - state.getThumbPercent(thumbs > 1 ? 1 : 0),
              }}
            />

            {Array.from({ length: thumbs }).map((_, index) => (
              <div
                className={styles.thumbContainer}
                style={{
                  '--percentage': state.getThumbPercent(index),
                }}
                key={index}
              >
                <Thumb
                  index={index}
                  state={state}
                  trackRef={trackRef}
                  disabled={disabled}
                  forwardedRef={forwardedRef}
                />

                <output {...outputProps} className={styles.output}>
                  {state.getThumbValueLabel(index)}
                </output>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

SliderInput.displayName = 'SliderInput';
