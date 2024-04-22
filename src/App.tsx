import './App.css';
import ChessDesk from './components/ChessDesk';
import ChessHistory from './components/ChessHistory';

function App() {

  return (
    <div className="chess">
      <ChessDesk />
      <ChessHistory />
    </div>
  );
}

export default App;
