import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserSchema, type UpdateUserDto } from 'api';
import { type FC } from 'react';
import { Step2DefaultValues } from './config';
import { useTranslation } from 'react-i18next';
import { FormInput } from 'components/FormInput';

interface Props {
  onSubmit: (updateData: UpdateUserDto) => Promise<boolean>;
  onSkip: () => void;
  isLoading: boolean;
}

export const Step2Form: FC<Props> = ({ onSubmit, onSkip, isLoading }) => {
  const { t } = useTranslation('registerPage');

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(UpdateUserSchema) as Resolver<UpdateUserDto>,
    defaultValues: Step2DefaultValues,
    reValidateMode: 'onSubmit',
  });

  const handleFormSubmit = handleSubmit(async (data: UpdateUserDto) => {
    const isDataProvided = Object.values(data).some((value) => value !== '' && value !== undefined);

    if (!isDataProvided) {
      onSkip();
      return;
    }

    if (await onSubmit(data)) {
      reset();
    }
  });

  return (
    <Box component="form" onSubmit={(e) => void handleFormSubmit(e)} noValidate>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1" gutterBottom>
          {t('step2.title')}
        </Typography>

        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="name"
          label={t('step2.labels.name')}
          fullWidth
          autoComplete="given-name"
          margin="normal"
          errorMsg={t(errors['name']?.message || '')}
        />

        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="surname"
          label={t('step2.labels.surname')}
          fullWidth
          autoComplete="family-name"
          margin="normal"
          errorMsg={t(errors['surname']?.message || '')}
        />

        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="birthday"
          label={t('step2.labels.birthday')}
          type="date"
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          errorMsg={t(errors['birthday']?.message || '')}
        />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={onSkip}
            disabled={isLoading}
            sx={{ mt: 2, py: 1.5 }}
          >
            {t('step2.buttons.skip')}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 2, py: 1.5 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : t('step2.buttons.save')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
