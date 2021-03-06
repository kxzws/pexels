import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './views/Main/Main';
import Category from './views/Category/Category';
import NotFound from './components/NotFound/NotFound';
import './App.scss';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/search">
          <Route path=":search" element={<Category />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
