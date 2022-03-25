import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { Http } from 'tools/libs/http/http.lib';
import { getJsonBody } from 'tools/libs/http/http.utils';
import { Response, ResponseWithMeta } from 'tools/libs/http/http.types';
import { Pagination } from 'types/common';

import {
  SocialLink,
  SocialType,
  SocialLinksFilters,
} from './social-links.types';

export const adapters = {
  getSocialLinks: ({
    req,
    params,
  }: { req?: IncomingMessage; params?: SocialLinksFilters } = {}) =>
    new Http<ResponseWithMeta<SocialLink[], Pagination>>(
      endpoints.socialLinks.index,
      {
        req,
        params,
      }
    ).get(),
  getSocialLink: ({ req, id }: { req?: IncomingMessage; id: string }) =>
    new Http<Response<SocialLink>>(
      endpoints.socialLinks.one.replace(':id', id),
      {
        req,
      }
    ).get(),
  addSocialLink: ({
    form,
    hostId,
  }: {
    form: { url: string; type: SocialType };
    hostId: string;
  }) =>
    new Http<Response<SocialLink>>(endpoints.socialLinks.index, {
      body: getJsonBody({ ...form, host: hostId }),
    }).post(),
  updateSocialLink: ({
    form,
    id,
  }: {
    form: Partial<{ url: string; type: SocialType }>;
    id: string;
  }) =>
    new Http<Response<SocialLink>>(
      endpoints.socialLinks.one.replace(':id', id),
      {
        body: getJsonBody(form),
      }
    ).patch(),
  deleteSocialLink: ({ id }: { id: string }) =>
    new Http(endpoints.socialLinks.one.replace(':id', id)).delete(),
};
