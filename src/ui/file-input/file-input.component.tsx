import { VFC, useCallback, HTMLAttributes, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

import { DragState, Props } from './file-input.types';
import {
  FILES_LIMIT,
  ICON_BY_FILETYPE,
  ICON_BY_DRAG_STATE,
} from './file-input.constants';
import styles from './file-input.module.scss';

import { Icon, IconName } from 'ui/icon/icon.component';

export const FileInput: VFC<Props> = ({
  filename,
  filetype,
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

  const iconName = useMemo<IconName>(() => {
    if (filename && dragState === 'inactive') {
      return filetype ? ICON_BY_FILETYPE[filetype] : IconName.File;
    }

    return ICON_BY_DRAG_STATE[dragState];
  }, [filetype, filename, dragState]);

  const getFakeInputProps = (props: HTMLAttributes<HTMLDivElement> = {}) => ({
    ...props,
    'data-focused': isFocused,
    'data-drag': dragState,
  });

  return (
    <div {...getRootProps({ className: styles.input })}>
      <input {...getInputProps({ multiple, ...attributes })} />
      <div {...getFakeInputProps()}>{filename || attributes.placeholder}</div>
      <Icon name={iconName} />
    </div>
  );
};
