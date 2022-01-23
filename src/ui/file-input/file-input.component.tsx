import { VFC, useCallback, HTMLAttributes, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

import { DragState, Props } from './file-input.types';
import { FILES_LIMIT } from './file-input.constants';
import styles from './file-input.module.scss';

export const FileInput: VFC<Props> = ({
  accept,
  maxSize,
  multiple = false,
  attributes = {},
  onChange,
}) => {
  const onDrop = useCallback<typeof onChange>(onChange, [onChange]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    accept,
    onDrop,
    disabled: attributes.disabled,
    maxSize,
    maxFiles: FILES_LIMIT,
  });

  const dragState = useMemo<DragState>(() => {
    return isDragAccept
      ? 'accept'
      : isDragReject
      ? 'reject'
      : isDragActive
      ? 'active'
      : 'inactive';
  }, [isDragAccept, isDragReject, isDragActive]);

  const getFakeInputProps = (props: HTMLAttributes<HTMLDivElement> = {}) => ({
    ...props,
    'data-focused': isFocused,
    'data-drag': dragState,
  });

  return (
    <div {...getRootProps({ className: styles.input })}>
      <input {...getInputProps({ multiple, ...attributes })} />
      <div {...getFakeInputProps()}>{attributes.placeholder}</div>
    </div>
  );
};
