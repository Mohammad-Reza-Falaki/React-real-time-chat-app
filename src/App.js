import { Switch, Route } from 'react-router-dom';



import Login from './components/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
