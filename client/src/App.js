import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WordAdmin from './components/WordAdmin';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/*' element={<WordAdmin />} />
        <Route path='*' element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
