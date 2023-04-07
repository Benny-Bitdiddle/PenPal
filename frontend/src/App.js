import React, { useState } from "react";
import InputForm from "./components/InputForm";
import SummaryDisplay from "./components/SummaryDisplay";
import "./App.css";

function App() {
  const [summary, setSummary] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">SummaryBuddy</h1>
      </header>
      <main>
        <InputForm setSummary={setSummary} />
        <SummaryDisplay summary={summary} />
      </main>
    </div>
  );
}

export default App;
