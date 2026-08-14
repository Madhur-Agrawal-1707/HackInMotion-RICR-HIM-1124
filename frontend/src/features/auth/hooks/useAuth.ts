import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth.store';
import { authApi } from '../api/auth.api';
import type { LoginFormValues, RegisterFormValues, ForgotPasswordFormValues, ResetPasswordFormValues } from '../schemas/auth.schema';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { login: storeLogin, logout: storeLogout } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormValues) => authApi.register(data),
    onSuccess: (data) => {
      if (data.success && data.data?.user) {
        storeLogin(data.data.user, data.data.accessToken, data.data.refreshToken);
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => authApi.login(data),
    onSuccess: (data) => {
      if (data.success && data.data?.user) {
        storeLogin(data.data.user, data.data.accessToken, data.data.refreshToken);
      }
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: (idToken: string) => authApi.googleLogin(idToken),
    onSuccess: (data) => {
      if (data.success && data.data?.user) {
        storeLogin(data.data.user, data.data.accessToken, data.data.refreshToken);
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      storeLogout();
      queryClient.clear();
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordFormValues) => authApi.forgotPassword(data),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordFormValues & { token: string }) => authApi.resetPassword(data),
  });

  return {
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    googleLogin: googleLoginMutation.mutateAsync,
    isGoogleLoggingIn: googleLoginMutation.isPending,

    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,

    forgotPassword: forgotPasswordMutation.mutateAsync,
    isSubmittingForgot: forgotPasswordMutation.isPending,

    resetPassword: resetPasswordMutation.mutateAsync,
    isSubmittingReset: resetPasswordMutation.isPending,
  };
};
