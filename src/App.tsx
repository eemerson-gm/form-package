import { Input } from 'antd';
import "antd/dist/antd.css";
import './App.css';
import { FormProvider } from './contexts/FormContext';
import { useEffect, useState } from 'react';
import { CoolInput } from './components/CoolInput';
import { CoolButton } from './components/CoolButton';

function App() {
  const [stuff, setStuff] = useState('');

  return (
    <FormProvider defaultValues={stuff ? { stuff } : undefined}>
      <div className="App">
        <CoolButton />
        <CoolInput />
      </div>
    </FormProvider>
  );
}

export default App;
