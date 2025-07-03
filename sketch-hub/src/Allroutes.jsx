import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Login } from './pages/login/Login'
import {Home} from './pages/home/Home'
import Explore from './component/Explore/Explore'
import Upload from './component/Upload/Upload'
import Services from './pages/Services/services'
import Singup from './pages/singup/singup'
import Contact from './component/Contact/Contact'
import Cart from './pages/Cart/Cart' 
import ImageGallery from './component/fetch_images'
import Footer from './component/Footer/Footer'
import About from './component/About/About'
import AdminDashboard from './Admin/Dashboard'
import AdminSidebar from './Admin/AdminSidebar'
import Manageusers from './Admin/users/Manageusers'
import UserDashboard from './pages/Userdashboard/UserDashboard'
import Testimonials from './component/Testimonials/Testimonials'
import Wishlist from './pages/wishlist/Wishlist'
import AdminProduct from './Admin/product/AdminProduct'
import AdminWishlistTable from './Admin/wishlist/AdminWishlist'
import AdminCartTable from './Admin/cart/AdminCart'
import OrderForm from './pages/order/Order'
import AdminOrdersTable from './Admin/order/AdminOrder'
import FeaturedSketches from './component/featured/FeaturedSketches'
import OrderHistory from './pages/orderhistory/OrderHistory'
import OrderPayment from './pages/Cart/CartOrder'
import AdminLogin from './Admin/adminlogin/AdminLogin'



const getUserRole = () => {
  return sessionStorage.getItem("role");
} ;

export default function Allroutes() {
  const role = getUserRole();
  return (
    <Routes>
      <Route path='/' element={<Home />} index />
        <Route path='/login' element={<Login/>}/>
        <Route path='/singup' element={<Singup/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/imagegallery' element={<ImageGallery/>}/>
        <Route path='/services' element={<Services/>}/>
       <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orderpayment' element={<OrderPayment/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/order' element={<OrderForm/>}/>
      <Route path='/userdashboard' element={<UserDashboard/>}/>
        <Route path='/footer' element={<Footer/>}/>
        <Route path='/orderhistory' element={<OrderHistory/>}/>
        <Route path='/testimonials' element={<Testimonials/>}/>
        <Route path='/featured' element={<FeaturedSketches/>}/>


        {/* ADMIN ROUTING */}
        {/* {role === "admin" ? ( */}
          <>
          <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/adminsidebar' element={<AdminSidebar/>}/>
       <Route path='/manageusers' element={<Manageusers/>}/>
       <Route path='/adminproduct' element={<AdminProduct/>}/>
       <Route path='/admincart' element={<AdminCartTable/>}/>
       <Route path='/adminwishlist' element={<AdminWishlistTable/>}/>
       <Route path='/adminorder' element={<AdminOrdersTable/>}/>
       <Route path='/adminlogin' element={<AdminLogin/>}/>
          </>
        {/* ) :( */}
          <Route path='/admin/*' element={<Navigate to="/login" />}/>
        {/* )} */}
        <Route path='*' element={<Navigate to="/"/>}/>
         
    </Routes>
  )
}
