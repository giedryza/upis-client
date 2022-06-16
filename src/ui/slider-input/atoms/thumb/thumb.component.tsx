import { useRef, FC } from 'react';
import {
  useSliderThumb,
  useFocusRing,
  mergeProps,
  useVisuallyHidden,
} from 'react-aria';
import clsx from 'clsx';

import { Props } from './thumb.types';
import styles from './thumb.module.scss';

export const Thumb: FC<Props> = ({ state, trackRef, index }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { visuallyHiddenProps } = useVisuallyHidden();

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
      className={clsx(styles.thumb, {
        [styles['-focus'] as string]: isFocusVisible,
        [styles['-dragging'] as string]: state.isThumbDragging(index),
      })}
    >
      <input
        ref={inputRef}
        {...mergeProps(visuallyHiddenProps, inputProps, focusProps)}
      />
    </div>
  );
};
