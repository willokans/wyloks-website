import { useRef, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const useRecaptcha = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const executeRecaptcha = useCallback(async () => {
    const recaptchaValue = await recaptchaRef.current?.executeAsync();
    return recaptchaValue;
  }, []);

  const resetRecaptcha = useCallback(() => {
    recaptchaRef.current?.reset();
  }, []);

  return {
    recaptchaRef,
    executeRecaptcha,
    resetRecaptcha,
  };
};