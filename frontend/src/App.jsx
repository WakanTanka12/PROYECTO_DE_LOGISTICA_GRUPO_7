
import './App.css'
import CustomerList from "./components/Customer/CustomerList.jsx";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx";
import CustomerForm from "./components/Customer/CustomerForm.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<CustomerList/>}></Route>
                <Route path="/customers" element={<CustomerList/>}></Route>
                <Route path="/add-customer" element={<CustomerForm/>}></Route>
                <Route path="/edit-customer/:id" element={<CustomerForm/>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
     </>
  )
}

export default App
