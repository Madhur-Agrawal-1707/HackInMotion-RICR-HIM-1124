import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../auth/store/auth.store';
import { useUser } from '../hooks/useUser';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';
import { changePasswordFormSchema } from '../../auth/schemas/auth.schema';
import type { ChangePasswordFormValues } from '../../auth/schemas/auth.schema';
import { ArrowLeft, Trash2, Upload, User } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Settings() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { updateProfile, uploadAvatar, deleteAccount, changePassword, isUpdatingProfile, isUploadingAvatar, isDeletingAccount, isChangingPassword } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<boolean>(false);
  const [passwordSuccess, setPasswordSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form for Name Update
  const { register: registerName, handleSubmit: handleSubmitName } = useForm({
    defaultValues: { name: user?.name || '' },
  });

  // Form for Password Update
  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    reset: resetPassForm,
    formState: { errors: passErrors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  const onUpdateName = async (data: { name: string }) => {
    try {
      setProfileSuccess(false);
      await updateProfile(data);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const onChangePassword = async (data: ChangePasswordFormValues) => {
    try {
      setPasswordSuccess(false);
      setErrorMsg(null);
      await changePassword(data);
      setPasswordSuccess(true);
      resetPassForm();
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to change password.');
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError('Avatar size must be less than 5 MB.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setAvatarError(null);
      await uploadAvatar(formData);
    } catch (err) {
      setAvatarError('Failed to upload image.');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you absolutely sure you want to delete your account? This is irreversible.')) {
      try {
        await deleteAccount();
        navigate('/login');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/profile')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        {/* Avatar Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your public avatar (JPEG/PNG/WEBP, Max 5MB)</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="outline"
                disabled={isUploadingAvatar}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploadingAvatar ? 'Uploading...' : 'Upload Image'}
              </Button>
              {avatarError && <p className="text-xs text-destructive mt-2">{avatarError}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitName(onUpdateName)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...registerName('name')} />
              </div>
              <div className="flex items-center justify-between">
                <Button type="submit" disabled={isUpdatingProfile}>
                  {isUpdatingProfile ? 'Saving...' : 'Save Profile'}
                </Button>
                {profileSuccess && (
                  <p className="text-sm text-green-600 font-medium">Profile saved successfully!</p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Password settings (Only if login method is LOCAL) */}
        {user?.provider === 'LOCAL' && (
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Keep your account secure with a strong password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPass(onChangePassword)} className="space-y-4">
                {errorMsg && (
                  <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    {errorMsg}
                  </div>
                )}
                <div className="space-y-1">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...registerPass('currentPassword')}
                  />
                  {passErrors.currentPassword && (
                    <p className="text-xs text-destructive">{passErrors.currentPassword.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" {...registerPass('newPassword')} />
                  {passErrors.newPassword && (
                    <p className="text-xs text-destructive">{passErrors.newPassword.message}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Button type="submit" disabled={isChangingPassword}>
                    {isChangingPassword ? 'Changing...' : 'Change Password'}
                  </Button>
                  {passwordSuccess && (
                    <p className="text-sm text-green-600 font-medium">
                      Password updated successfully!
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Danger Zone */}
        <Card className="border-destructive/35 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Actions that cannot be undone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Delete Account</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Permanently delete your profile and account information.
                </p>
              </div>
              <Button
                variant="destructive"
                disabled={isDeletingAccount}
                onClick={handleDeleteAccount}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeletingAccount ? 'Deleting...' : 'Delete Account'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
