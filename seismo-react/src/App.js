import routes from './config/routes';
import Navbar from './components/Navbar/NavBar';

function App() {
  return (
    <>
      <Navbar/>
      { routes }
    </>
  );
}

export default App;
