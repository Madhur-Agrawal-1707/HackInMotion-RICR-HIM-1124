import { apiClient } from './axios';
import type { LoginFormValues, RegisterFormValues, ForgotPasswordFormValues, ResetPasswordFormValues } from '../schemas/auth.schema';

export const authApi = {
  register: async (data: RegisterFormValues) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginFormValues) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  googleLogin: async (idToken: string) => {
    const response = await apiClient.post('/auth/google', { idToken });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordFormValues) => {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordFormValues & { token: string }) => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },
};
