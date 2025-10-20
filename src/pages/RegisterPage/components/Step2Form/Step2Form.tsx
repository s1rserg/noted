import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserSchema, type UpdateUserDto } from 'api';
import type { FC } from 'react';
import { Step2DefaultValues } from './config';

interface Props {
  onSubmit: (updateData: UpdateUserDto) => Promise<boolean>;
  onSkip: () => void;
  isLoading: boolean;
}

export const Step2Form: FC<Props> = ({ onSubmit, onSkip, isLoading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
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
          Additional Info
        </Typography>

        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              autoComplete="given-name"
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              onFocus={() => clearErrors('name')}
            />
          )}
        />

        <Controller
          control={control}
          name="surname"
          render={({ field }) => (
            <TextField
              {...field}
              label="Surname"
              fullWidth
              autoComplete="family-name"
              margin="normal"
              error={!!errors.surname}
              helperText={errors.surname?.message}
              onFocus={() => clearErrors('surname')}
            />
          )}
        />

        <Controller
          control={control}
          name="birthday"
          render={({ field }) => (
            <TextField
              onBlur={field.onBlur}
              ref={field.ref}
              name={field.name}
              label="Birthday"
              type="date"
              fullWidth
              margin="normal"
              error={!!errors.birthday}
              helperText={errors.birthday?.message}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              onFocus={() => clearErrors('birthday')}
            />
          )}
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
            Skip
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 2, py: 1.5 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
