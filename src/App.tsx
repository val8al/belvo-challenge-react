import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@mui/material/Button';
import { CategorizedSpendings, TransactionList } from './components';
import Expenditures from './components/expenditures';

function App() {
  
  return (
    <>
      <TransactionList/>
      <CategorizedSpendings/>
      <Expenditures/>
    </>
  );
}

export default App;
