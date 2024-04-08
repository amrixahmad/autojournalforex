import './App.css';
import {Header,Footer} from './components/component-service'
import {Outlet} from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
