import { InputRef } from "antd";
import { isEqual } from "lodash";
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react";

interface FormContextType {
  formState: Record<string, any>;
  errors: Record<string, string>;
  getValue: (name: string) => string;
  setValue: (name: string, value: string) => void;
  clearValue: (name: string) => void;
  isDirty: boolean;
  isFormInitialized: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  defaultValues?: Record<string, any>;
}

export const FormProvider: React.FC<
  React.PropsWithChildren<FormProviderProps>
> = ({ children, defaultValues }) => {
  const [defaultFormState, setDefaultFormState] = useState(defaultValues || {});
  const [formState, setFormState] = useState<Record<string, any>>(defaultValues || {});
  const [errors, setErrors] = useState<Record<string, any>>({});

  const [isFormInitialized, setIsFormInitialized] = useState(!!defaultValues);

  // console.log('defaultFormState', defaultFormState);
  // console.log('formState', formState);

  useEffect(() => {
    if (!isFormInitialized && defaultValues) {
      console.log('form initialize useEffect setters')
      setFormState(defaultValues)
      setDefaultFormState(defaultValues)
      setIsFormInitialized(true)
    }
  }, [defaultValues, isFormInitialized]);

  const getValue = (name: string) => {
    return formState[name];
  }

  const setValue = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  const clearValue = (name: string) => {
    setFormState((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  }

  const isDirty = !isEqual(formState, defaultFormState);

  console.log('isDirty in FormProvider', isDirty);

  return (
    <FormContext.Provider value={{
      formState, errors, getValue, setValue, clearValue, isDirty, isFormInitialized
    }}>
      {children}
    </FormContext.Provider>
  );
};

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}
