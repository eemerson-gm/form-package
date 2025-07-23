import React from 'react';
import { useForm } from '../contexts/FormContext';
import { Button } from 'antd';



export const CoolButton = () => {
  const { setValue } = useForm();

  return (
    <Button onClick={() => {
      setValue('test', 'hello');
    }} >Click Me</Button>
  );
};