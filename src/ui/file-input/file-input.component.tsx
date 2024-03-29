import { useCallback, useMemo, useState, forwardRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { Button, Icon, Divider, Image } from 'ui';
import { getFiletype } from 'tools/common';
import { formatList, formatBytes } from 'tools/format';

import { FileIcon } from './atoms';
import { DragState, Props } from './file-input.types';
import { MIME_TYPE_BY_FILE } from './file-input.constants';
import styles from './file-input.module.scss';

export const FileInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      accept,
      maxSize = 2 * 1024 * 1024,
      maxFiles = 1,
      name,
      disabled,
      onChange,
      previews = false,
    },
    forwardedRef
  ) => {
    const { t, lang } = useTranslation();

    const [uploadedFiles, setUploadedFiles] = useState<
      (File & { preview: string })[]
    >([]);

    const handleChange = (files: File[]) => {
      setUploadedFiles(
        files.map((file) =>
          Object.assign(file, {
            preview: previews ? URL.createObjectURL(file) : '',
          })
        )
      );
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
      accept: accept?.reduce(
        (acc, filetype) => ({
          ...acc,
          [MIME_TYPE_BY_FILE[filetype]]: [`.${filetype}`],
        }),
        {}
      ),
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

    useEffect(() => {
      return () => {
        if (previews) {
          uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        }
      };
    }, [uploadedFiles, previews]);

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
                  ? 'folder-open'
                  : 'folder-close'
              }
              className={styles.icon}
            />
            <p className={styles.label}>
              {t('common:components.fileInput.dragAndDrop')}
            </p>
            <div className={styles.divider}>
              <Divider label={t('common:texts.or')} />
            </div>
            <Button
              as="button"
              label={t('common:components.fileInput.browse')}
              size="xs"
              disabled={disabled}
              onClick={open}
            />
            <div className={styles.info}>
              {!!accept?.length && (
                <div>
                  <Trans
                    i18nKey="common:components.fileInput.supported"
                    values={{
                      filetypes: formatList(
                        lang,
                        accept.map((filetype) => `.${filetype}`)
                      ),
                    }}
                    components={[<span key="0" />]}
                  />
                </div>
              )}
              <div>
                <Trans
                  i18nKey="common:components.fileInput.max"
                  values={{
                    maxSize: formatBytes(maxSize),
                  }}
                  components={[<span key="0" />]}
                />
              </div>
            </div>
          </div>
        </div>

        {!!uploadedFiles.length && (
          <aside className={styles.files}>
            <h4>{t('common:components.fileInput.files')}</h4>
            <ul className={styles.filesList}>
              {uploadedFiles.map((file, i) => (
                <li
                  className={styles.fileContainer}
                  style={{
                    '--spacing': previews ? 1 : 2,
                  }}
                  key={i}
                >
                  {previews && file.type.split('/')[0]?.includes('image') ? (
                    <div className={styles.preview}>
                      <Image
                        src={file.preview}
                        alt={file.name}
                        sizes={{ width: 118, height: 65.5 }}
                        style={{ objectFit: 'contain' }}
                        onLoad={() => URL.revokeObjectURL(file.preview)}
                      />
                    </div>
                  ) : (
                    <FileIcon type={getFiletype(file.name)} />
                  )}

                  <div className={styles.fileInfo}>
                    <h6>{file.name}</h6>
                    <span>{formatBytes(file.size)}</span>
                  </div>

                  <Button
                    as="button"
                    icon="close"
                    size="xs"
                    variant="secondary"
                    disabled
                    onClick={() =>
                      handleChange(
                        uploadedFiles.filter(
                          (uploaded) => uploaded.name !== file.name
                        )
                      )
                    }
                    title={t('common:components.fileInput.remove')}
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

FileInput.displayName = 'FileInput';
