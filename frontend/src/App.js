import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import MainLayout from './components/MainLayout';
import Detail from './components/Detail';
import Cart from './components/Cart';
import Register from './components/Register';
import CustomerDetail from './components/CustomerDetail';
import CustomerUpdate from './components/CustomerUpdate';
import { AvatarProvider } from '../src/components/AvatarContext';
import ProductList from './components/ProductList';
import { QuantityProvider } from './components/QuantityContext';
import PaymentInfo from './components/PaymentInfo';
import PaypalCancel from './components/PaypalCancel';
import PaymentPaypal from './components/PaymentPaypal';
import ProductCreate from './components/ProductCreate';
import File404 from './components/File404';
import OAuth2 from './components/OAuth2';
import ListProductNotData from './components/ListProductNotData';
import DataEntry from './components/DataEntry';
import ProductUpdate from './components/ProductUpdate';
import DataEntryUpdate from './components/DataEntryUpdate';
import OrderList from './components/Order';

function App() {
  return (
    <>
      <QuantityProvider>
        <AvatarProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='/oauth2' element={<OAuth2 />}/>
              <Route path='/product/detail/:id' element={<Detail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/product' element={<ProductList />} />
              <Route path='/customer/detail' element={<CustomerDetail />} />
              <Route path='/product/create' element={<ProductCreate />} />
              <Route path='/product/update/:id' element={<ProductUpdate />} />
              <Route path='/product/not-data' element={<ListProductNotData />} />
              <Route path='/order' element={<OrderList />} />
              <Route path='/product/data-entry/:id/:name/:img' element={<DataEntry />} />
              <Route path='/product/data-entry/update/:id/:name/:img' element={<DataEntryUpdate />} />
              <Route path='/customer/detail/update' element={<CustomerUpdate />} />
              <Route path='*' element={<File404 />} />
            </Route>
            <Route path='/payment-info' element={<PaymentInfo/>} />
            <Route path='/paypal-success/:totalPayment/:customerName/:paymentDate/:paymentCode' element={<PaymentPaypal/>}/>
            <Route path='/paypal-error' element={<PaypalCancel />}/>
          </Routes>
        </AvatarProvider>
      </QuantityProvider>
    </>
  );
}

export default App;
