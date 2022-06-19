import { FC } from 'react';
import {
  useSliderThumb,
  useFocusRing,
  mergeProps,
  useVisuallyHidden,
} from 'react-aria';
import clsx from 'clsx';
import { useObjectRef } from '@react-aria/utils';

import { Props } from './thumb.types';
import styles from './thumb.module.scss';

export const Thumb: FC<Props> = ({
  state,
  trackRef,
  forwardedRef,
  index,
  disabled,
}) => {
  const { visuallyHiddenProps } = useVisuallyHidden();
  const inputRef = useObjectRef(forwardedRef);

  const { thumbProps, inputProps } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      {...thumbProps}
      className={clsx(
        styles.thumb,
        isFocusVisible && styles['-focus'],
        disabled && styles['-disabled'],
        state.isThumbDragging(index) && styles['-dragging']
      )}
    >
      <input
        ref={inputRef}
        {...mergeProps(visuallyHiddenProps, inputProps, focusProps)}
      />
    </div>
  );
};
