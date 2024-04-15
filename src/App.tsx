import React, { useState } from 'react';
import './App.css';

import { CategorizedSpendings, TransactionList } from './components';
import Expenditures from './components/expenditures';
import { LoginView } from './components/login';

function App() {
  
  const [link, setLink] = useState<string>("")
  return (
    <>
    {link ? 
      <>
        <TransactionList/>
        <CategorizedSpendings/>
        <Expenditures/>
      </>
     : 
    <LoginView setLink={(link) => setLink(link)}/>
    }
    </>
  );
}

export default App;
