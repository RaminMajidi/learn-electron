import { useMemo } from 'react';
import './App.css';
import { BaseChart } from './components/BaseChart';
import useStatistics from './hooks/useStatistics';
import Chart from './components/Chart';

function App() {

  const statistics = useStatistics(10);
  const cpuUsage = useMemo(() => statistics.map(stat => stat.cpuUsage), [statistics]);


  return (
    <div className="App">
      <div style={{ height: 120 }}>
        <Chart data={cpuUsage} maxDataPoints={10} />
      </div>
    </div>
  );
}

export default App;
