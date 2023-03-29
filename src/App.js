import React from "react";
import ProblemList from "./components/ProblemList.js";
import Problem from "./components/Problem.js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          <Routes>
            <Route path="/" element={<ProblemList />} />
            <Route path="/problem/:id" element={<Problem />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
