import './App.css';
import Todo from './components/Todo/Todo';
import { Provider } from 'react-redux';
import store from './redux/todo/store';

function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}

export default App;
