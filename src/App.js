import { BrowserRouter as Router, } from 'react-router-dom';
import './App.css';
import View from './components/view';

function App() {
  return (
    <div className="App">
          <Router>
          <View/>    </Router>

    </div>
  );
}

export default App;
