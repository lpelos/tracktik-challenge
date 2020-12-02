import React from 'react';

import { Provider as ReduxProvider } from "react-redux";

import './App.css';
import configureStore from "./redux/store";

const store = configureStore();

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <div className="App">TODO</div>
    </ReduxProvider>
  );
}

export default App;
