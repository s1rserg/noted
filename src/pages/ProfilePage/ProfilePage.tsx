import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Loader } from 'components/Loader';
import { useEffect, useState, type FC } from 'react';
import { useUserStore } from 'store';
import { useModal } from 'hooks';
import { handleApiError, httpClient, userApiService, type UserAvatarMedia } from 'api';
import { useTranslation } from 'react-i18next';
import { AvatarSlider, UploadAvatarModal } from './components';

export const ProfilePage: FC = () => {
  const { t } = useTranslation('profilePage');

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const initUser = useUserStore((state) => state.initUser);
  const { isOpen, openModal, closeModal } = useModal();

  const [allAvatars, setAllAvatars] = useState<UserAvatarMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAvatars = async (signal?: AbortSignal) => {
    setIsLoading(true);
    try {
      const config = userApiService.getAllAvatars(signal);
      const response = await httpClient<UserAvatarMedia[]>(config);
      setAllAvatars(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadAvatar = async (file: File): Promise<void> => {
    try {
      const avatar = (await httpClient<UserAvatarMedia>(userApiService.uploadAvatar(file))).data;
      if (!user) return;
      setUser({ ...user, avatar });
      await fetchAvatars();
      closeModal();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleSetMainAvatar = async (mediaId: UserAvatarMedia['id']) => {
    try {
      const avatar = (await httpClient<UserAvatarMedia>(userApiService.setMainAvatar(mediaId)))
        .data;
      if (!user) return;
      setUser({ ...user, avatar });
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteAvatar = async (mediaId: UserAvatarMedia['id']) => {
    try {
      await httpClient(userApiService.deleteAvatar(mediaId));
      await initUser();
      setAllAvatars((prev) => prev.filter((avatar) => avatar.id !== mediaId));
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    void fetchAvatars(controller.signal);

    return () => controller.abort();
  }, []);

  if (!user || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box p={4} display="flex" justifyContent="center" alignItems="center" gap={4} flexWrap="wrap">
        <AvatarSlider
          avatars={allAvatars}
          mainAvatarId={user.avatar?.id ?? null}
          onUpload={openModal}
          onSetMain={handleSetMainAvatar}
          onDelete={handleDeleteAvatar}
        />

        <Paper sx={{ width: 400, p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h5">{t('title')}</Typography>
            <Typography>
              <strong>{t('labels.email')}: </strong> {user.email}
            </Typography>
            <Typography>
              <strong>{t('labels.name')}: </strong> {user.name ?? '-'}
            </Typography>
            <Typography>
              <strong>{t('labels.surname')}: </strong> {user.surname ?? '-'}
            </Typography>
            <Typography>
              <strong>{t('labels.birthday')}: </strong>
              {user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : '-'}
            </Typography>
            <Typography>
              <strong>{t('labels.joined')}: </strong>
              {new Date(user.createdAt).toISOString().split('T')[0]}
            </Typography>
            <Button variant="contained">{t('buttons.edit')}</Button>
          </Stack>
        </Paper>
      </Box>

      <UploadAvatarModal isOpen={isOpen} onClose={closeModal} onUpload={handleUploadAvatar} />
    </>
  );
};
