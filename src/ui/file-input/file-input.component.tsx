import { useCallback, useMemo, useState, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import useTranslation from 'next-translate/useTranslation';

import { Button, Icon, Divider } from 'ui';
import { getFiletype, formatBytes } from 'tools/common';

import { FileIcon } from './atoms';
import { DragState, Props } from './file-input.types';
import { MIME_TYPE_BY_FILE } from './file-input.constants';
import styles from './file-input.module.scss';

export const FileInput = forwardRef<HTMLInputElement, Props>(
  (
    { accept, maxSize, maxFiles = 1, name, disabled, onChange },
    forwardedRef
  ) => {
    const { t } = useTranslation();

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleChange = (files: File[]) => {
      setUploadedFiles(files);
      onChange?.(files);
    };

    const onDrop = useCallback<typeof handleChange>(handleChange, [
      handleChange,
    ]);

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
      open,
    } = useDropzone({
      accept: accept?.map((filetype) => MIME_TYPE_BY_FILE[filetype]),
      onDrop,
      disabled,
      maxSize,
      maxFiles,
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
          <input
            {...getInputProps({
              multiple: maxFiles > 1,
              name,
              disabled,
              ref: forwardedRef,
            })}
          />
          <div className={styles.content}>
            <Icon
              name={
                ['accept', 'active'].includes(dragState)
                  ? 'util-folder-open'
                  : 'util-folder-close'
              }
              className={styles.icon}
            />
            <p className={styles.label}>
              {t('common:components.fileInput.dragAndDrop')}
            </p>
            <div className={styles.divider}>
              <Divider label={t('common:components.fileInput.or')} />
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
                    icon="close"
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
  }
);
