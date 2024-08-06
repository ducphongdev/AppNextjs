import { env } from '@/config/environment';

export const API_ROOT = env.API_ENDPOINT;

export const API_ROOT_PHOTO = env.API_ROOT_PHOTO;
export const URL_IMG_DEFAULT = env.URL_IMG_DEFAULT;

export const NAME_MODAL = {
  ADD_BOARD: 'modalAddBoard',
};

export const ENTITY_ERROR_STATUS = 422;
export const AUTHENTICATION_ERROR_STATUS = 401;
export const NOT_FOUND_STATUS = 404;
