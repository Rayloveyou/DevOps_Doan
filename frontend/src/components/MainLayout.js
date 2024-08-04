import { Outlet } from "react-router-dom";
import Header from "./Header";
import Scroll from "./Scroll";
import Footer from "./Footer";



export default function MainLayout(){
    return (
        <>
          <Header />
          {/* <Scroll /> */}
         <div style={{marginTop: '150px'}}>
          <Outlet /> 
          </div> 
          <Footer />
        </>
      );
}
