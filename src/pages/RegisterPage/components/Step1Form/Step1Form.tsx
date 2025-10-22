import { Step1DefaultValues } from './config';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress, Link, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { type SignUpLocalDto } from 'api';
import { type FC } from 'react';
import { SignUpFormSchema } from './schemas';
import type { SignUpFormInput } from './types';
import { AppRoutes } from 'routes';
import { useTranslation } from 'react-i18next';
import { FormInput } from 'components/FormInput';
import { PasswordInput } from 'components/PasswordInput';

interface Props {
  onSubmit: (authData: SignUpLocalDto) => Promise<boolean>;
  isLoading: boolean;
}

export const Step1Form: FC<Props> = ({ onSubmit, isLoading }) => {
  const { t } = useTranslation('registerPage');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<SignUpFormInput>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: Step1DefaultValues,
    reValidateMode: 'onSubmit',
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    const { confirmPassword: _confirmPassword, ...dto } = data;
    if (await onSubmit(dto)) {
      reset();
    }
  });

  return (
    <Box component="form" onSubmit={(e) => void handleFormSubmit(e)} noValidate>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1" gutterBottom>
          {t('step1.title')}
        </Typography>
        <Link href={AppRoutes.LOGIN}>{t('step1.link')}</Link>
        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="email"
          label={t('step1.labels.email')}
          fullWidth
          required
          margin="normal"
          errorMsg={t(errors.email?.message || '')}
        />
        <PasswordInput
          control={control}
          clearErrors={clearErrors}
          name="password"
          label={t('step1.labels.password')}
          fullWidth
          required
          margin="normal"
          errorMsg={t(errors.password?.message || '')}
        />
        <PasswordInput
          control={control}
          clearErrors={clearErrors}
          name="confirmPassword"
          label={t('step1.labels.confirmPassword')}
          fullWidth
          required
          margin="normal"
          errorMsg={t(errors.confirmPassword?.message || '')}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 2, py: 1.5 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : t('step1.buttons.continue')}
        </Button>
      </Stack>
    </Box>
  );
};
