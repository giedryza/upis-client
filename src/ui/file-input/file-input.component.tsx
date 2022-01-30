import { VFC, useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useTranslation from 'next-translate/useTranslation';

import { FileIcon } from './atoms';
import { DragState, Props } from './file-input.types';
import { FILES_LIMIT } from './file-input.constants';
import styles from './file-input.module.scss';

import { Button } from 'ui/button/button.component';
import { Icon, IconName } from 'ui/icon/icon.component';
import { getFiletype } from 'tools/common/files';
import { formatBytes } from 'tools/common/format-bytes';

export const FileInput: VFC<Props> = ({
  accept,
  maxSize,
  multiple = false,
  name,
  disabled,
  onChange,
}) => {
  const { t } = useTranslation();

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleChange = (files: File[]) => {
    setUploadedFiles(files);
    onChange?.(files);
  };

  const onDrop = useCallback<typeof handleChange>(handleChange, [handleChange]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept,
    onDrop,
    disabled,
    maxSize,
    maxFiles: multiple ? FILES_LIMIT : 1,
    noClick: true,
    noKeyboard: true,
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

  return (
    <section className={styles.container}>
      <div
        {...getRootProps({
          className: styles.dropzone,
          disabled,
          'data-drag-state': dragState,
        })}
      >
        <input {...getInputProps({ multiple, name, disabled })} />
        <div className={styles.content}>
          <Icon
            name={
              ['accept', 'active'].includes(dragState)
                ? IconName.FolderOpen
                : IconName.FolderClose
            }
            className={styles.icon}
          />
          <p className={styles.label}>
            {t('common:components.fileInput.dragAndDrop')}
          </p>
          <div className={styles.divider}>
            {t('common:components.fileInput.or')}
          </div>
          <Button
            label={t('common:components.fileInput.browse')}
            size="xs"
            attributes={{
              disabled,
              onClick: open,
            }}
          />
        </div>
      </div>

      {!!uploadedFiles.length && (
        <aside className={styles.files}>
          <h4>{t('common:components.fileInput.files')}</h4>
          <ul className={styles.filesList}>
            {uploadedFiles.map((file, i) => (
              <li className={styles.fileContainer} key={i}>
                <FileIcon type={getFiletype(file.name)} />

                <div className={styles.fileInfo}>
                  <h6>{file.name}</h6>
                  <span>{formatBytes(file.size)}</span>
                </div>

                <Button
                  icon={IconName.Close}
                  size="xs"
                  variant="secondary"
                  attributes={{
                    disabled,
                    onClick: () =>
                      handleChange(
                        uploadedFiles.filter(
                          (uploaded) => uploaded.name !== file.name
                        )
                      ),
                    title: t('common:components.fileInput.remove'),
                  }}
                />
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  );
};
