import routes from './config/routes';
import Navbar from './components/NavbarComponents/NavBar';
import Footer from './components/FooterComponents/Footer';

function App() {
  return (
    <>
      <Navbar/>
      { routes }
      <Footer/>
    </>
  );
}

export default App;
