import { Step1DefaultValues } from './config';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { type SignUpLocalDto } from 'api';
import { useMemo, useState, type FC } from 'react';
import { getSignUpFormSchema } from './schemas';
import type { SignUpFormInput } from './types';
import { AppRoutes } from 'routes';
import { useTranslation } from 'react-i18next';

interface Props {
  onSubmit: (authData: SignUpLocalDto) => Promise<boolean>;
  isLoading: boolean;
}

export const Step1Form: FC<Props> = ({ onSubmit, isLoading }) => {
  const { t } = useTranslation('registerPage');
  const signUpFormSchema = useMemo(() => getSignUpFormSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: Step1DefaultValues,
    reValidateMode: 'onSubmit',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              label={t('step1.labels.email')}
              fullWidth
              required
              autoComplete="email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              onFocus={() => clearErrors('email')}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth required variant="outlined" error={!!errors.password}>
              <InputLabel htmlFor="password-field">{t('step1.labels.password')}</InputLabel>
              <OutlinedInput
                {...field}
                id="password-field"
                type={showPassword ? 'text' : 'password'}
                label={t('step1.labels.password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onFocus={() => clearErrors('password')}
              />
              {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth required variant="outlined" error={!!errors.confirmPassword}>
              <InputLabel htmlFor="confirm-password-field">
                {t('step1.labels.confirmPassword')}
              </InputLabel>
              <OutlinedInput
                {...field}
                id="confirm-password-field"
                type={showPassword ? 'text' : 'password'}
                label={t('step1.labels.confirmPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onFocus={() => clearErrors('confirmPassword')}
              />
              {errors.confirmPassword && (
                <FormHelperText>{errors.confirmPassword.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 2, py: 1.5 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : t('step1.button')}
        </Button>
      </Stack>
    </Box>
  );
};
