import ToDoList from './component/ToDoList'
import {store} from './redux/store'
import  {Provider} from 'react-redux'
function App() {
  return (
    <Provider store={store}>
        <ToDoList />  
    </Provider>
  );
}

export default App;
