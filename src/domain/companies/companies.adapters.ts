import { endpoints } from 'config/endpoints';
import {
  Company,
  SocialLink,
  SocialType,
} from 'domain/companies/companies.types';
import { Http } from 'tools/libs/http/http.lib';
import { Response } from 'tools/libs/http/http.types';

export const adapters = {
  getMyCompany: () =>
    new Http<Response<Company | null>>(endpoints.companies.me).get(),
  updateCompany: ({
    id,
    form,
  }: {
    id: string;
    form: Partial<
      Pick<
        Company,
        'name' | 'phone' | 'email' | 'description' | 'website' | 'address'
      >
    >;
  }) =>
    new Http<Response<Company>>(endpoints.companies.one.replace(':id', id), {
      body: form,
    }).patch(),
  createCompany: ({
    form,
  }: {
    form: Pick<Company, 'name' | 'phone' | 'email' | 'description'>;
  }) =>
    new Http<Response<Company>>(endpoints.companies.index, {
      body: form,
    }).post(),
  updateLocation: ({
    id,
    form,
  }: {
    id: string;
    form: { lat: number; lng: number; address: string };
  }) =>
    new Http<Response<Company>>(endpoints.companies.one.replace(':id', id), {
      body: {
        address: form.address,
        location: {
          coordinates: [form.lng, form.lat],
        },
      },
    }).patch(),
  addSocialLink: ({
    form,
    companyId,
  }: {
    form: { url: string; type: SocialType };
    companyId: string;
  }) =>
    new Http<Response<SocialLink>>(endpoints.socialLinks.index, {
      body: { ...form, host: companyId },
    }).post(),
  updateSocialLink: ({
    form,
    socialLinkId,
  }: {
    form: Partial<{ url: string; type: SocialType }>;
    socialLinkId: string;
  }) =>
    new Http<Response<SocialLink>>(
      endpoints.socialLinks.one.replace(':id', socialLinkId),
      {
        body: form,
      }
    ).patch(),
  deleteSocialLink: ({ socialLinkId }: { socialLinkId: string }) =>
    new Http<Response<SocialLink>>(
      endpoints.socialLinks.one.replace(':id', socialLinkId)
    ).delete(),
};
