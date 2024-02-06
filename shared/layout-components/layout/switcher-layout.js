import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import dynamic from "next/dynamic";
import Rightside from "../right-sidebar/right-sidebar";
import TabToTop from "../tab-to-top/tab-to-top";
import { useRouter } from "next/router";
import Header from "../header/header2";
const Switcher = dynamic(() => import("../switcher/switcher"), { ssr: false });
const Sidebar = dynamic(() => import("../sidebar/sidebar"), { ssr: false });

const SwitcherLayout = ({ children }) => {
  let firstAdd = ()=>{
    //The created store
    document.querySelector("body").classList.add("ltr", "main-body", "app", "sidebar-mini");
    document.querySelector("body").classList.remove("error-page1", "bg-primary");
    var gone = window.matchMedia("(max-width: 1024px)")
  Sidebargone(gone) // Call listener function at run time
  gone.addListener(Sidebargone)
  }
  const responsiveSidebarclose = () => {
    //leftsidemenu
    if (window.innerWidth < 992){
    document.querySelector(".app").classList.remove("sidenav-toggled");
  }
    //rightsidebar
    document.querySelector(".sidebar-right").classList.remove("sidebar-open");
    //swichermainright
    document.querySelector(".demo_changer").classList.remove("active");
    document.querySelector(".demo_changer").style.right = "-270px";
  };
  function Sidebargone(gone) {
    if (gone.matches) { // If media query matches
      document.querySelector("body").classList.add("sidebar-gone");
    } else {
      document.querySelector("body").classList.remove("sidebar-gone");
      document.querySelector("body").classList.remove("sidenav-toggled");
    }
  }

  useEffect(() => {
    firstAdd()
  }, [])
  
  return (
    <>
      <Provider store={store}>
        <div className="horizontalMenucontainer">
              <TabToTop />
        <div className="page">
        <div className="open">
            <Header />
            <Sidebar />
        </div>
        <div className="main-content app-content"  onClick={() => {
                      responsiveSidebarclose();
                    }}>
         <div className="side-app">
         <div className="main-container container-fluid">
         {children}
         </div>
        </div>
        </div>
        <Rightside />
        <Switcher />
        <Footer />
        </div>
        </div>
      </Provider>
    </>
  );
};

export default SwitcherLayout;
