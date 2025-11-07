import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from "./components/footer";
import DonorList from './pages/Donorlist';
import RegisterDonor from './pages/RegisterDonor';
import Signup from './pages/signin';
import Login from './pages/login';
import Home from './pages/home';
import DonorDetail from './pages/bonorcord';
import Homehero from './pages/homehero';
import Loader from './pages/loder';
import Loadersapp from './pages/loderapp';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"  element={<Loadersapp/>} />
        <Route path="/homehero" element={<Homehero />} />
        <Route path="/donors" element={<DonorList />} />
        <Route path="/register" element={<RegisterDonor />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/donor/:id" element={<DonorDetail />} />
        <Route path="/loder"  element={<Loader />} />
        


      </Routes> 
    </BrowserRouter>

    <Footer />
</>
    
  );
}

export default App;
