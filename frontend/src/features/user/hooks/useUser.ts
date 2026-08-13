import { useMutation, useQuery } from '@tanstack/react-query';
import { userApi } from '../api/user.api';
import { useAuthStore } from '../../auth/store/auth.store';

export const useUser = () => {
  const { updateUser: storeUpdateUser, logout: storeLogout } = useAuthStore();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getProfile(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: { name?: string }) => userApi.updateProfile(data),
    onSuccess: (data) => {
      if (data.success && data.data?.user) {
        storeUpdateUser(data.data.user);
      }
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (formData: FormData) => userApi.uploadAvatar(formData),
    onSuccess: (data) => {
      if (data.success && data.data?.user) {
        storeUpdateUser({ avatar: data.data.user.avatar });
      }
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: () => userApi.deleteAccount(),
    onSuccess: () => {
      storeLogout();
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: any) => userApi.changePassword(data),
  });

  return {
    profile: profileQuery.data?.data?.user,
    isLoadingProfile: profileQuery.isLoading,
    profileError: profileQuery.error,

    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,

    uploadAvatar: uploadAvatarMutation.mutateAsync,
    isUploadingAvatar: uploadAvatarMutation.isPending,

    deleteAccount: deleteAccountMutation.mutateAsync,
    isDeletingAccount: deleteAccountMutation.isPending,

    changePassword: changePasswordMutation.mutateAsync,
    isChangingPassword: changePasswordMutation.isPending,
  };
};
