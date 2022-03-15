import { useEffect, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  IconName,
  TextInput,
  Map,
  mapIcon,
  MapDragendEvent,
  usePoint,
  Point,
  useSearchByCoordinates,
  DEFAULT_CENTER,
} from 'ui';
import { routes } from 'config/routes';
import { getRouteParam } from 'tools/common/getRouteParam';
import { InfoBlock } from 'components/account/atoms';
import { useUpdateLocation } from 'domain/companies/companies.mutations';
import { useActiveCompany } from 'domain/companies/companies.queries';

import { Values } from './company-edit-location.types';
import { INITIAL_VALUES } from './company-edit-location.constants';
import styles from './company-edit-location.module.scss';

export const CompanyEditLocation: VFC = () => {
  const { t } = useTranslation();
  const { query, push } = useRouter();

  const slug = getRouteParam(query.slug);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: INITIAL_VALUES,
  });

  const { data: company } = useActiveCompany();
  const { mutate: updateLocation, isLoading } = useUpdateLocation({
    onSuccess: () => {
      push(routes.account.companies.one.index.replace(':slug', slug));
    },
  });

  const { point, updatePoint } = usePoint({
    lat: company?.location.coordinates[1] ?? 0,
    lng: company?.location.coordinates[0] ?? 0,
  });
  const { location } = useSearchByCoordinates({
    lat: point.lat,
    lng: point.lng,
  });

  const center: Point = {
    lat: point.lat || DEFAULT_CENTER.lat,
    lng: point.lng || DEFAULT_CENTER.lng,
  };

  console.log(center);
  console.log(location);

  useEffect(() => {
    reset({
      address: company?.address,
    });
  }, [reset, company]);

  const onSubmit: SubmitHandler<Values> = ({ address }) => {
    const companyId = company?._id;

    if (!companyId) return;

    updateLocation({
      id: companyId,
      form: {
        lat: point.lat,
        lng: point.lng,
        address: address || location?.display_name || '',
      },
    });
  };

  return (
    <div className={styles.content}>
      <InfoBlock
        title={t('account:companies.location.title')}
        icon={IconName.Info}
        columns={1}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldset} disabled={isLoading}>
            <TextInput
              {...register('address')}
              label={t('account:companies.location.form.address.label')}
              error={errors.address?.message}
            />
          </fieldset>

          <div className={styles.map}>
            <Map
              center={{
                lat: center.lat + 0.00025,
                lng: center.lng,
              }}
              zoom={point.lat && point.lng ? 18 : 7}
            >
              {({
                leaflet: { icon },
                reactLeaflet: { Marker, Popup, useMap },
                custom: { SearchBar },
              }) => (
                <>
                  <SearchBar useMap={useMap} onChange={updatePoint} />

                  <Marker
                    draggable
                    position={center}
                    icon={icon(mapIcon({ name: 'pin', size: 48 }))}
                    eventHandlers={{
                      dragend: (e) => {
                        const { lat, lng } = (e as MapDragendEvent).target
                          ._latlng;

                        updatePoint({ lat, lng });
                      },
                      add: (e) => {
                        e.target.openPopup();
                      },
                    }}
                  >
                    <Popup className={styles.popup}>
                      {location?.display_name ?? '-'}
                    </Popup>
                  </Marker>
                </>
              )}
            </Map>
          </div>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="ghost"
              size="sm"
              url={routes.account.companies.one.index.replace(':slug', slug)}
            />

            <Button
              label={t('common:actions.save')}
              variant="primary"
              size="sm"
              attributes={{
                type: 'submit',
                disabled: isLoading,
              }}
            />
          </div>
        </form>
      </InfoBlock>
    </div>
  );
};
