import { CHNAGE_THEME, CHECK_THEME } from './actionTypes';

export const changeTheme = (payload: any) => ({
  type: CHNAGE_THEME,
  payload,
});

export const checkTheme = (payload: any) => ({
  type: CHECK_THEME,
  payload,
});
