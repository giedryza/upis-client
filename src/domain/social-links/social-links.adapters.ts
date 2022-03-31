import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { Request } from 'tools/services/request/request';
import { getJsonBody } from 'tools/services/request/request.utils';
import { ApiResponse } from 'tools/services/request/request.types';
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
    new Request<ApiResponse<SocialLink[], Pagination>>(
      endpoints.socialLinks.index,
      {
        req,
        params,
      }
    ).get(),
  getSocialLink: ({ req, id }: { req?: IncomingMessage; id: string }) =>
    new Request<ApiResponse<SocialLink>>(
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
    new Request<ApiResponse<SocialLink>>(endpoints.socialLinks.index, {
      body: getJsonBody({ ...form, host: hostId }),
    }).post(),
  updateSocialLink: ({
    form,
    id,
  }: {
    form: Partial<{ url: string; type: SocialType }>;
    id: string;
  }) =>
    new Request<ApiResponse<SocialLink>>(
      endpoints.socialLinks.one.replace(':id', id),
      {
        body: getJsonBody(form),
      }
    ).patch(),
  deleteSocialLink: ({ id }: { id: string }) =>
    new Request(endpoints.socialLinks.one.replace(':id', id)).delete(),
};
