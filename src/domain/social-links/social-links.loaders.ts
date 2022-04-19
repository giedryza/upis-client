import { IncomingMessage } from 'http';

import { endpoints } from 'config/endpoints';
import { Request, getJsonBody } from 'tools/services/request';
import { Pagination } from 'types/common';

import {
  SocialLink,
  SocialType,
  SocialLinksFilters,
} from './social-links.types';

export const loaders = {
  getSocialLinks: ({
    req,
    params,
  }: { req?: IncomingMessage; params?: SocialLinksFilters } = {}) =>
    new Request<SocialLink[], Pagination>(endpoints.socialLinks.index, {
      req,
      params,
    }).get(),
  getSocialLink: ({ req, id }: { req?: IncomingMessage; id: string }) =>
    new Request<SocialLink>(endpoints.socialLinks.one.replace(':id', id), {
      req,
    }).get(),
  addSocialLink: ({
    form,
    hostId,
  }: {
    form: { url: string; type: SocialType };
    hostId: string;
  }) =>
    new Request<SocialLink>(endpoints.socialLinks.index, {
      body: getJsonBody({ ...form, host: hostId }),
    }).post(),
  updateSocialLink: ({
    form,
    id,
  }: {
    form: Partial<{ url: string; type: SocialType }>;
    id: string;
  }) =>
    new Request<SocialLink>(endpoints.socialLinks.one.replace(':id', id), {
      body: getJsonBody(form),
    }).patch(),
  deleteSocialLink: ({ id }: { id: string }) =>
    new Request(endpoints.socialLinks.one.replace(':id', id)).delete(),
};
