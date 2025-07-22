import { InputRef } from "antd";
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react";

interface FormContextType {
  formState: Record<string, any>;
  register: (name: string) => any;
  errors: Record<string, string>;
  getValue: (name: string) => string
  setValue: (name: string, value: string) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  defaultValues?: Record<string, any>;
}

export const FormProvider: React.FC<
  React.PropsWithChildren<FormProviderProps>
> = ({ children, defaultValues }) => {
  const [formState, setFormState] = useState<Record<string, any>>(defaultValues || {});
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [isFormInitialized, setIsFormInitialized] = useState(!!defaultValues);
  const inputRefs = useRef<Record<string, InputRef>>({});
  // const [inputRefs, setInputRefs] = useState<Record<string, InputRef>>({})

  console.log('defaultValues', defaultValues);
  console.log('formState', formState);

  useEffect(() => {
    if (!isFormInitialized && defaultValues) {
      setFormState(defaultValues)
      setIsFormInitialized(true)
    }
  }, [defaultValues, isFormInitialized]);

  const getValue = (name: string) => {
    return formState[name];
  }

  const setValue = (name: string, value: string) => {
    console.log('inputRefs', inputRefs);
    // @ts-ignore
    inputRefs.current[name].input.value = value;
    // document.getElementById(name).value = "hello"
    console.log(value);
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  const register = (name: string) => {
    // @ts-ignore
    // setInputRefs((prev) => ({ ...prev, [name]: createRef() }));
    return {
      id: name,
      ref: (element: any) => inputRefs.current[name] = element,
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        setValue(name, e.target.value);
      }
    }
  }

  return (
    <FormContext.Provider value={{
      formState, register, errors, getValue, setValue
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
