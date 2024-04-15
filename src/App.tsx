import React, { useState } from 'react';
import './App.css';

import { CategorizedSpendings, Expenditures, TransactionList } from './components';
import { LoginView } from './components/login';

function App() {
  
  const [link, setLink] = useState<string>("")
  return (
    <>
    {link ? 
      <>
        <TransactionList link={link}/>
        <CategorizedSpendings link={link}/>
        <Expenditures link={link}/>
      </>
     : 
    <LoginView setLink={(link) => setLink(link)}/>
    }
    </>
  );
}

export default App;
