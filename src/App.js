import './App.css';  
import Bg from './components/bg';
import CookieBanner from './components/CookieBanner';
import Footer from './components/footer';
import Header from './components/header';
import Carousel from './components/main/carousel';
import Forma from './components/main/forma';
import Hero from './components/main/hero';




function App() {

  return ( 
    <>
       <Bg/>
        <Header/>
        <main className='main'>
          <Hero/>
          <Carousel/>
          <Forma/>
        </main> 
        <Footer/> 
        <CookieBanner/>
    </>
  );
}

export default App;
