import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import DonorList from './pages/Donorlist';
import RegisterDonor from './pages/RegisterDonor';
import Signup from './pages/signin';
import Login from './pages/login';
import Home from './pages/home';
import DonorDetail from './pages/bonorcord';
import Homehero from './pages/homehero';  
import Loader from './pages/loder';
import Loadersapp from './pages/loderapp';
import BloodGroupStats from './pages/bloodgroup';
import RequestForm from './pages/requestform';
import ReviewForm from './pages/ReviewForm';
import DashboardReviews from './pages/DashboardReviews';
import Footer from './components/footer';

function App() {
  // ✅ Call the hook so that WebSocket stays active globally

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
          <Route path="/bloodgroup" element={<BloodGroupStats />} />
          <Route path="/request/:id" element={<RequestForm />} />
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/dashboard" element={<DashboardReviews />} />
          
        
        </Routes> 
        <Footer />
      </BrowserRouter>

      
    </>
  );
}

export default App;
