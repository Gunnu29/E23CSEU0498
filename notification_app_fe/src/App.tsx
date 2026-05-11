import { useState, useEffect } from 'react'
import { Log, initLogger } from 'logger-middleware'
import './App.css'

initLogger({ token: 'frontend-token-456' });

/**
 * Serves as the primary visual interface for users to generate and monitor telemetry events.
 */
function App() {
  const [clickCounter, setClickCounter] = useState(0)

  useEffect(() => {
    Log('frontend', 'info', 'component', 'App component mounted');
  }, []);

  const handleCounterIncrement = () => {
    const nextCounter = clickCounter + 1;
    setClickCounter(nextCounter);
    Log('frontend', 'debug', 'state', `Count updated to ${nextCounter}`);
  };

  const executeSimulatedNetworkRequest = async () => {
    Log('frontend', 'info', 'api', 'Starting simulated API call');
    try {
      await new Promise(resolveTimer => setTimeout(resolveTimer, 500));
      throw new Error("Simulated network failure");
    } catch (networkException: any) {
      Log('frontend', 'error', 'api', `API call failed: ${networkException.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Logging Middleware Demo</h1>
      <div className="card">
        <button onClick={handleCounterIncrement}>
          count is {clickCounter}
        </button>
        <button onClick={executeSimulatedNetworkRequest} style={{ marginLeft: '10px' }}>
          Simulate API Error
        </button>
      </div>
      <p className="read-the-docs">
        Check the console and the backend test server for log events.
      </p>
    </div>
  )
}

export default App
