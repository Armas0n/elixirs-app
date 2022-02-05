import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Cart, Home, NoMatch } from './pages';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
