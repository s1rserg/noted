import { Box } from '@mui/material';
import { Step1Form, Step2Form } from './components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState, type FC } from 'react';
import {
  httpClient,
  authApiService,
  type SignUpLocalDto,
  userApiService,
  type UpdateUserDto,
  type AuthResponse,
  type ApiError,
} from 'api';
import { AppRoutes } from 'routes';
import { type AxiosResponse } from 'axios';
import { localStorageService } from 'utils/LocalStorageService';

export const RegisterPage: FC = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleStepOneSubmit = async (data: SignUpLocalDto): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const requestConfig = authApiService.signUp(data);
      const response: AxiosResponse<AuthResponse> = await httpClient(requestConfig);

      localStorageService.setAccessToken(response.data.accessToken);

      toast.success('Account created successfully!');

      setStep(2);
      setIsLoading(false);
      return true;
    } catch (error) {
      //TODO: replace this
      toast.error((error as ApiError).response.data.message);

      setIsLoading(false);
      return false;
    }
  };

  const handleStepTwoSubmit = async (data: UpdateUserDto): Promise<boolean> => {
    setIsLoading(true);
    try {
      const requestConfig = userApiService.updateProfile(data);

      await httpClient(requestConfig);
      toast.success('Profile updated!');
      void navigate(AppRoutes.TASKS);
      setIsLoading(false);
      return true;
    } catch (error) {
      //TODO: replace this
      toast.error((error as ApiError).response.data.message);

      setIsLoading(false);
      return false;
    }
  };

  const handleSkip = () => {
    void navigate(AppRoutes.TASKS);
  };

  return (
    <Box
      sx={{
        width: {
          xs: '100vw',
          sm: '90vw',
          md: '70vw',
          lg: '20vw',
        },
      }}
    >
      {step === 1 && <Step1Form onSubmit={handleStepOneSubmit} isLoading={isLoading} />}
      {step === 2 && (
        <Step2Form onSubmit={handleStepTwoSubmit} onSkip={handleSkip} isLoading={isLoading} />
      )}
    </Box>
  );
};
