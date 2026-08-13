import { apiClient } from '../../auth/api/axios';

export const userApi = {
  getProfile: async () => {
    const response = await apiClient.get('/user/profile');
    return response.data;
  },

  updateProfile: async (data: { name?: string }) => {
    const response = await apiClient.patch('/user/profile', data);
    return response.data;
  },

  uploadAvatar: async (formData: FormData) => {
    const response = await apiClient.patch('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteAccount: async () => {
    const response = await apiClient.delete('/user/account');
    return response.data;
  },

  changePassword: async (data: any) => {
    const response = await apiClient.post('/auth/change-password', data);
    return response.data;
  },
};
