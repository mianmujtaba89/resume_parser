import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ScreenResumes from './components/screen_resumes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScreenResumes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
 