import { Button, type ButtonProps } from '@mui/material';
import type { FC, ReactNode } from 'react';
import { ApiBaseUrl } from './config';

interface Props extends ButtonProps {
  text: string;
  icon: ReactNode;
  authUrlPath: string;
}

export const AuthProviderButton: FC<Props> = ({ text, icon, authUrlPath, ...rest }) => {
  const fullAuthUrl = `${ApiBaseUrl}${authUrlPath}`;

  return (
    <Button variant="contained" href={fullAuthUrl} startIcon={icon} {...rest}>
      {text}
    </Button>
  );
};
