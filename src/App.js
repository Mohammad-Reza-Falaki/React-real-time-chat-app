import { Switch, Route } from 'react-router-dom';


// components
import Login from './components/Login';
import Chats from "./components/Chats";

// contexts
import AuthContextProvider from './contexts/AuthContextProvider';


import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/chats" component={Chats} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
