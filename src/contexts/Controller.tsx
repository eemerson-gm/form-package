import { JSX, useEffect, useState } from "react";
import { useForm } from "./FormContext";

interface ControllerProps {
  name: string;
  render: (props: {
    field: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
      value: string
    }
  }) => JSX.Element;
  defaultValue: string;
}

export const Controller = ({ name, render, defaultValue }: ControllerProps) => {
  const [inputValue, setInputValue] = useState(defaultValue ?? '');
  const { formState, setValue, clearValue, isFormInitialized } = useForm();

  useEffect(() => {
    console.log('controller set useEffect')
    if (!isFormInitialized) return;
    setInputValue(formState[name]);
  }, [formState, isFormInitialized, name]);

  // Do we want to set this as the default on the form when the input is mounted?
  useEffect(() => {
    if (isFormInitialized) {
      setValue(name, defaultValue)
    }
  }, [])

  useEffect(() => {
    return () => {
      clearValue(name);
    }
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setValue(name, e.target.value);
  }

  return render({ field: { onChange, onBlur, value: inputValue } });
}