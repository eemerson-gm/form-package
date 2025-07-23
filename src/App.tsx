import { Input } from 'antd';
import "antd/dist/antd.css";
import './App.css';
import { FormProvider } from './contexts/FormContext';
import { useEffect, useState } from 'react';
import { CoolInput } from './components/CoolInput';
import { CoolButton } from './components/CoolButton';

function App() {
  const [stuff, setStuff] = useState<Record<string, any> | undefined>();
  const [showInput, setShowInput] = useState(true);

  console.log('app rerendering')

  // useEffect(() => {
  //   setTimeout(() => {
  //     setStuff({ test: 'tacos' });
  //   }, 4000);
  // }, []);

  return (
    <FormProvider defaultValues={stuff}>
      <div className="App">
        <CoolButton />
        <button onClick={() => setShowInput(!showInput)}>Toggle Input</button>
        {showInput ? (<CoolInput />) : null}
      </div>
    </FormProvider>
  );
}

export default App;
