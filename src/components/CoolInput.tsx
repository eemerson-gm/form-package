import { Input, InputRef } from "antd"
import { useForm } from "../contexts/FormContext"
import { useEffect, useRef } from "react";

export const CoolInput = () => {
  const { formState, register, errors, getValue, setValue } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setValue('myname', 'tacos2');
    }, 4000);
  }, []);

  return (
    <Input
      {...register('myname')}
      type="text"
      placeholder="Text..."
    />
  )
}