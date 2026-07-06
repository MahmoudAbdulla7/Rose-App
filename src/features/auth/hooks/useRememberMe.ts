import { useEffect } from 'react';
import type { FieldValues, Path, UseFormSetFocus, UseFormSetValue } from 'react-hook-form';

const REMEMBER_KEY = 'login-remember-me';
const USERNAME_KEY = 'login-remembered-username';

type UseRememberMeParams<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
  setFocus: UseFormSetFocus<T>;
};

export function useRememberMe<T extends FieldValues>({
  setValue,
  setFocus,
}: UseRememberMeParams<T>) {
  useEffect(() => {
    const remembered = localStorage.getItem(REMEMBER_KEY) === 'true';
    const username = localStorage.getItem(USERNAME_KEY);

    if (remembered && username) {
      setValue('username' as Path<T>, username as T[Path<T>]);
      setValue('rememberMe' as Path<T>, true as T[Path<T>]);
      setFocus('password' as Path<T>);
    }
  }, [setValue, setFocus]);

  const saveRememberedUser = (remember: boolean, username: string) => {
    if (remember) {
      localStorage.setItem(REMEMBER_KEY, 'true');
      localStorage.setItem(USERNAME_KEY, username);
    } else {
      localStorage.removeItem(REMEMBER_KEY);
      localStorage.removeItem(USERNAME_KEY);
    }
  };

  return { saveRememberedUser };
}
