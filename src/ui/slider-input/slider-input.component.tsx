/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, forwardRef } from 'react';
import { useSlider, useNumberFormatter } from 'react-aria';
import { useSliderState } from 'react-stately';
import clsx from 'clsx';

import { isDefined } from 'tools/common';

import { Thumb } from './atoms';
import { Props } from './slider-input.types';
import styles from './slider-input.module.scss';

export const SliderInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      id,
      value,
      onChange,
      disabled = false,
      min = 0,
      max = 100,
      step = 1,
      formatOptions,
    },
    forwardedRef
  ) => {
    const THUMB_INDEX = 0;

    const trackRef = useRef<HTMLDivElement>(null);
    const numberFormatter = useNumberFormatter(formatOptions);

    const sliderProps: Parameters<typeof useSliderState>[0] = {
      label,
      value: isDefined(value) ? [Number.isNaN(value) ? min : value] : undefined,
      onChange: isDefined(onChange) ? ([v]) => onChange(v ?? 0) : undefined,
      isDisabled: disabled,
      minValue: min,
      maxValue: max,
      step,
      numberFormatter,
    };

    const state = useSliderState(sliderProps);

    const { groupProps, trackProps, labelProps, outputProps } = useSlider(
      { ...sliderProps, id },
      state,
      trackRef
    );

    return (
      <div
        {...groupProps}
        className={clsx(styles.slider, disabled && styles['-disabled'])}
        style={{
          '--thumb-position': state.getThumbPercent(THUMB_INDEX),
        }}
      >
        <label className={styles.label} {...labelProps}>
          {label}
        </label>

        <div className={styles.trackpadContainer}>
          <div {...trackProps} className={styles.trackpad} ref={trackRef}>
            <div className={styles.line} />
            <div className={clsx(styles.line, styles['-active'])} />

            <div className={styles.thumbContainer}>
              <Thumb
                index={THUMB_INDEX}
                state={state}
                trackRef={trackRef}
                disabled={disabled}
                forwardedRef={forwardedRef}
              />

              <output {...outputProps} className={styles.output}>
                {state.getThumbValueLabel(THUMB_INDEX)}
              </output>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SliderInput.displayName = 'SliderInput';
