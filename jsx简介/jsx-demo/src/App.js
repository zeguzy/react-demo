import logo from './logo.svg';
import './App.css';
import './test.css'

function App() {
// jsx 的一个demo
const name = 'test name'
const element = <h3 class='th3'> 我是 一个 jsx 的测试 {name} </h3>

  return (
    <div className="App">
      {element}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
