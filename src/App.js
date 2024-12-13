import Display from './Components/Display/Display';
import { createContext } from 'react';

export const MyContext = createContext();


function App() {

  return (
    <div>
      <Display/>
    </div>
  );
}

export default App;
