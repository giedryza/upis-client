import { IncomingMessage } from 'http';

import { endpoints } from 'config';
import { Request, getJsonBody, loadersFactory } from 'tools/services';
import { Pagination } from 'types/api';
import { generateUrl } from 'tools/common';

import {
  SocialLink,
  SocialType,
  SocialLinksFilters,
} from './social-links.types';

export const { getLoaders, useLoaders } = loadersFactory((locale) => ({
  loaders: {
    getSocialLinks: ({
      req,
      params,
    }: { req?: IncomingMessage; params?: SocialLinksFilters } = {}) =>
      new Request<SocialLink[], Pagination>(
        generateUrl(endpoints.socialLinks.index),
        {
          req,
          params,
          locale,
        }
      ).get(),
    getSocialLink: ({ req, id }: { req?: IncomingMessage; id: string }) =>
      new Request<SocialLink>(generateUrl(endpoints.socialLinks.one, { id }), {
        req,
        locale,
      }).get(),
    addSocialLink: ({
      form,
      hostId,
    }: {
      form: { url: string; type: SocialType };
      hostId: string;
    }) =>
      new Request<SocialLink>(generateUrl(endpoints.socialLinks.index), {
        body: getJsonBody({ ...form, host: hostId }),
        locale,
      }).post(),
    updateSocialLink: ({
      form,
      id,
    }: {
      form: Partial<{ url: string; type: SocialType }>;
      id: string;
    }) =>
      new Request<SocialLink>(generateUrl(endpoints.socialLinks.one, { id }), {
        body: getJsonBody(form),
        locale,
      }).patch(),
    deleteSocialLink: ({ id }: { id: string }) =>
      new Request(generateUrl(endpoints.socialLinks.one, { id }), {
        locale,
      }).delete(),
  },
}));
