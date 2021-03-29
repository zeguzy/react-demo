import './App.css';
import StaffPage from './page/staffPage'
import {store} from './redux/store'
import {Provider}  from 'react-redux'


function App() {
  return (
    <Provider store={store}>
      <StaffPage />
    </Provider>
  );
}

export default App;
