import {Provider} from 'react-redux'
import {store,Counter} from './counter.js'

function App() {
  return (
    <Provider store={store}>
        <Counter/>
    </Provider>
      
  );
}

export default App;
