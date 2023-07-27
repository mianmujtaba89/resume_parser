import {React, memo,useRef}  from "react";
import { Link } from "react-router-dom";
import ProfileDP from "../../assets/images/icon/ProfileIcon.png";
import topMsg from "../../assets/images/icon/topMsg1.png";
import topAlert from "../../assets/images/icon/topAlert1.png";
import topOption from "../../assets/images/icon/topOption1.png";
import { OverlayPanel } from 'primereact/overlaypanel';
import { BiPencil, BiLogOutCircle, BiHelpCircle } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

 function Navbar() {
  const op = useRef(null);
  console.log("render")
  return (
    <>
    <header className="headerOne ">
      <nav className="navbar   navbar-expand-lg navFirst">
        <div className="container-fluid">
          <a className="navbar-brand  " href="/"></a>
          <div className="topMenu ">
            <Link to="#">
              Home
            </Link>
          </div>
        </div>
      </nav>
    </header>
       <OverlayPanel ref={op} appendTo={document.body} my="left top" at="left bottom" >
       <div class="header-popup surface-border shadow-3 border-round-xl">
         <div class="popup-head d-flex justify-content-between align-items-center bg-white border-bottom pb-3">
           <div class="d-flex align-items-center">
             <div className="position-relative">
               <img class="img-sm rounded-circle shadow-sm" src={ProfileDP}/>
               <span class="edit"><BiPencil/></span>
             </div>
             <div class="pl-3">
               <p class="m-0 cc-blue fw-500">Khubaib Ul Amin</p>
               <p class="text-xs m-0">Cedar Financial - Pakistan</p>
             </div>
           </div>
   
           <div >
             <span class="img-sm cursor-pointer icon-sm mr-2 cc-blue"><BiLogOutCircle/></span>
           </div>
         </div>
   
         <div class="mh-48 py-3 d-flex align-items-center justify-content-between surface-base border-bottom">
           <div class="d-flex align-items-center">
             <div>
               <i class="demo-icon accounticon-cedar text-2xl text-grey"> </i>
             </div>
             <div>
               <p class="pl-3 cc-blue-grey fw-500">ACCOUNTS </p>
             </div>
           </div>
   
           <div>
           <span class="img-sm cursor-pointer icon-sm mr-2 cc-blue"><RiAccountCircleLine/></span>
           </div>
         </div>
   
         <div class="mh-48 py-3 d-flex align-items-center justify-content-between surface-base border-bottom">
           <div class="d-flex align-items-center">
             <div>
               <i class="demo-icon settingsicon-cedar text-2xl text-grey"></i>
             </div>
             <div>
               <p class="pl-3 cc-blue-grey fw-500">SETTINGS</p>
             </div>
           </div>
   
           <div>
           <span class="img-sm cursor-pointer icon-sm mr-2"><IoSettingsOutline/></span>
           </div>
         </div>
   
         <div class="mh-48 py-3 d-flex align-items-center justify-content-between surface-base border-bottom">
           <div class="d-flex align-items-center">
             <div>
               <i class="demo-icon helpicon-cedar text-2xl text-grey"></i>
             </div>
             <div>
               <p class="pl-3 cc-blue-grey fw-500">HELP</p>
             </div>
           </div>
   
           <div>
           <span class="img-sm cursor-pointer icon-sm mr-2"><BiHelpCircle/></span>
           </div>
         </div>
   
         <div class="d-flex justify-content-between pt-3 pb-0">
           <p class="m-0 fs-xs text-left ml-1 text-grey cc-blue-grey fw-500">V_1.0.1</p>
           <p class="m-0 fs-xs text-right text-grey cc-blue-grey fw-500">BY_ATS_DEV</p>
         </div>
       </div>
       </OverlayPanel>
       </>
  );
}

export default memo(Navbar);