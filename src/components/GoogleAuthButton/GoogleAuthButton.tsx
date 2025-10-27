import { type FC } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Box, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface Props {
  onSuccess: (credential: string) => void;
}

export const GoogleAuthButton: FC<Props> = ({ onSuccess }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <GoogleLogin
        onSuccess={({ credential }) => credential && onSuccess(credential)}
        onError={() => toast.error(t('googleErrorMsg'))}
        theme={theme.palette.mode === 'dark' ? 'filled_black' : 'outline'}
        shape="rectangular"
        locale={i18n.language}
        useOneTap
        use_fedcm_for_button
        use_fedcm_for_prompt
      />
    </Box>
  );
};
