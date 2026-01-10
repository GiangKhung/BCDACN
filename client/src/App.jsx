import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import PropertyList from './pages/PropertyList'
import PropertyDetail from './pages/PropertyDetail'
import ForSale from './pages/ForSale'
import ForRent from './pages/ForRent'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Wiki from './pages/Wiki'
import WikiDetail from './pages/WikiDetail'
import Analysis from './pages/Analysis'
import AnalysisDetail from './pages/AnalysisDetail'
import Directory from './pages/Directory'
import SavedProperties from './pages/SavedProperties'
import Login from './pages/Login'
import Register from './pages/Register'
import PostProperty from './pages/PostProperty'
import MyProperties from './pages/MyProperties'
import Profile from './pages/Profile'
import AgentDetail from './pages/AgentDetail'
import Admin from './pages/Admin'
import Payment from './pages/Payment'
import MyPayments from './pages/MyPayments'
import AdminDashboard from './pages/AdminDashboard'
import AdminPayments from './pages/AdminPayments'
import AdminRemovalRequests from './pages/AdminRemovalRequests'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/for-sale" element={<ForSale />} />
          <Route path="/for-rent" element={<ForRent />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/wiki/:id" element={<WikiDetail />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/analysis/:id" element={<AnalysisDetail />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/saved" element={<SavedProperties />} />
          <Route path="/saved-properties" element={<SavedProperties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-property" element={<PostProperty />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/agent/:id" element={<AgentDetail />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/payment/:propertyId" element={<Payment />} />
          <Route path="/my-payments" element={<MyPayments />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/removal-requests" element={<AdminRemovalRequests />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
