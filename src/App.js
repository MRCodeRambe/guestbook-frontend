import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";
import GuestBook from "./components/GuestBook";
import GuestMessagesPage from "./components/GuestMessagesPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GuestBook />}></Route>
          <Route path="/play" element={<GuestMessagesPage />}></Route>
          {/* Tambahkan Route untuk halaman lain di sini jika diperlukan */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
