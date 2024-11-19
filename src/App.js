import React, { useState } from "react";

import "./App.css";
import HistoryLength from "./components/history-lenghth";
import PopulationChart from "./components/chart";

const App = () => {
    const [historyLength, setHistoryLength] = useState(3);

    return (
        <div className="app-container">
            <h1>US Population Evolution</h1>
            <HistoryLength onChange={setHistoryLength} />
            <PopulationChart historyLength={historyLength} />
        </div>
    );
};

export default App;
