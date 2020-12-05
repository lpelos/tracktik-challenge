import React from "react";

import { Provider as ReduxProvider } from "react-redux";

import "./App.css";
import configureStore from "./redux/store";
import SiteListContainer from "./containers/SiteListContainer";

const store = configureStore();

const App: React.FC = () => {
  return (
    <div className="App">
      <ReduxProvider store={store}>
        <SiteListContainer />
      </ReduxProvider>
    </div>
  );
};

export default App;
