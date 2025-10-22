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
  handleApiError,
} from 'api';
import { AppRoutes } from 'routes';
import { localStorageService } from 'utils/LocalStorageService';
import { useTranslation } from 'react-i18next';

export const RegisterPage: FC = () => {
  const { t } = useTranslation('registerPage');
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleStepOneSubmit = async (data: SignUpLocalDto): Promise<boolean> => {
    setIsLoading(true);
    try {
      const requestConfig = authApiService.signUp(data);
      const response = await httpClient<AuthResponse>(requestConfig);

      localStorageService.setAccessToken(response.data.accessToken);

      toast.success(t('step1.successMsg'));

      setStep(2);
      setIsLoading(false);
      return true;
    } catch (error) {
      handleApiError(error);

      setIsLoading(false);
      return false;
    }
  };

  const handleStepTwoSubmit = async (data: UpdateUserDto): Promise<boolean> => {
    setIsLoading(true);
    try {
      const requestConfig = userApiService.updateProfile(data);

      await httpClient(requestConfig);
      toast.success(t('step2.successMsg'));
      void navigate(AppRoutes.TASKS);
      setIsLoading(false);
      return true;
    } catch (error) {
      handleApiError(error);

      setIsLoading(false);
      return false;
    }
  };

  const handleSkip = () => {
    void navigate(AppRoutes.TASKS);
  };

  return (
    <>
      {step === 1 && <Step1Form onSubmit={handleStepOneSubmit} isLoading={isLoading} />}
      {step === 2 && (
        <Step2Form onSubmit={handleStepTwoSubmit} onSkip={handleSkip} isLoading={isLoading} />
      )}
    </>
  );
};
