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
import { SignInLocalSchema, type SignInLocalDto } from 'api';
import { useState, type FC } from 'react';
import { AppRoutes } from 'routes';
import { FormDefaultValues } from './config';

interface Props {
  onSubmit: (authData: SignInLocalDto) => Promise<boolean>;
  isLoading: boolean;
}

export const LoginForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<SignInLocalDto>({
    resolver: zodResolver(SignInLocalSchema),
    defaultValues: FormDefaultValues,
    reValidateMode: 'onSubmit',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleFormSubmit = handleSubmit(async (data) => {
    if (await onSubmit(data)) {
      reset();
    }
  });

  return (
    <Box component="form" onSubmit={(e) => void handleFormSubmit(e)} noValidate>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1" gutterBottom>
          Welcome back
        </Typography>
        <Link href={AppRoutes.REGISTER}>Don't have an account? Sign up.</Link>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
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
              <InputLabel htmlFor="password-field">Password</InputLabel>
              <OutlinedInput
                {...field}
                id="password-field"
                type={showPassword ? 'text' : 'password'}
                label="Password"
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 2, py: 1.5 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
        </Button>
      </Stack>
    </Box>
  );
};
