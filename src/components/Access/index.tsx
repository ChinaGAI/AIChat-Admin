import { Access, useAccess } from '@umijs/max';
import React from 'react';

type Props = {
  accessCode: string;
} & Omit<React.ComponentProps<typeof Access>, 'accessible'>;

export const useHasAccess = (accessCodes: string[]) => {
  const access = useAccess();
  return accessCodes.some((code) => !!access[code]);
};

export default ({ accessCode, children, ...props }: Props) => {
  const acesss = useHasAccess([accessCode]);
  return (
    <Access accessible={acesss} {...props}>
      {children}
    </Access>
  );
};
