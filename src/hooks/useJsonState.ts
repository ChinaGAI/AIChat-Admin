import { useEffect, useState } from 'react';

const useJsonState = <T>({
  initialState,
  onChange,
}: {
  initialState?: string;
  onChange?: (value: string) => void;
}): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const [state, setState] = useState<T>();

  useEffect(() => {
    try {
      if (initialState) {
        setState(JSON.parse(initialState));
      }
    } catch (e) {}
  }, [initialState]);

  useEffect(() => {
    onChange?.(JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

export default useJsonState;
