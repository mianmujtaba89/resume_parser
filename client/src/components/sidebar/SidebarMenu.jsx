import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { useEffect } from "react";
import featherCalendar from "../../assets/images/icon/feather-calendar.svg";
import featherHome from "../../assets/images/icon/feather-home.svg";
import ionicIosPersonAdd from "../../assets/images/icon/ionic-ios-person-add.svg";
import materialGroup from "../../assets/images/icon/material-group.svg";
import materialPayment from "../../assets/images/icon/material-payment.svg";
import {BiBriefcase} from "react-icons/bi";
import logout from "../../assets/images/icon/logout.svg";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import joobseekerlogo from "../../assets/images/logo/joobseekerlogo.png";
import jobsekericon from "../../assets/images/logo/jobsekericon.png";
import Navbar from "../header/Navbar";
const routes = [
  {
    path: "home",
    name: "Dashboard",
    icon: featherHome,
  },
  {
    path: "screen-resumes",
    name: "Screen Resumes",
    icon: ionicIosPersonAdd,
  },
  {
    path: "candidates",
    name: "Candidates",
    icon: materialGroup,
  },
  {
    path: "postjob",
    name: "Post a Job",
    icon: ionicIosPersonAdd,
  },
  
  {
    path: "/postedjob",
    name: "Posted Job",
    icon: materialGroup,
  },
  // {
  //   path: "/payments",
  //   name: "Payments",
  //   icon: materialPayment,
  // },
  {
    path: "calender",
    name: "Calender",
    icon: featherCalendar,
  },
];

export default function SideMenuBar({ children, props }) {
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState("home");
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    document.title = `JST - ${path}`;
  });

  const clearUserDetails = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = await fetch("http://127.0.0.1:8000/api/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('recruiter-token')}`,
        "Cookie": `csrftoken=${localStorage.getItem('csrf_token')}; sessionid=${localStorage.getItem('session_id')}`,
      },
    })

    const json = data;
    
    if(json.status == 200) {

      // Clear cookies
      document.cookie = "csrftoken=; sessionid=;";
      // Clear local storage
      localStorage.clear();
      navigate("/");
    } else{
      // navigate("/candidates");
      alert('Server Error')
    }
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "288px" : "98px",
            transition: {
              duration: 0,
              type: "spring",
              damping: 10,
            },
            borderRadius: isOpen ? "0px 40px 0px 0px" : "0px",
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen ? (
                <motion.img
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                  src={joobseekerlogo}
                  onClick={() => {
                    navigate("welcome");
                  }}
                ></motion.img>
              ) : (
                <motion.img
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logoSecond"
                  src={jobsekericon}
                  onClick={() => {
                    navigate("welcome");
                  }}
                ></motion.img>
              )}
            </AnimatePresence>
          </div>
         

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  // activeClassName="active"
                  style={{ marginLeft: isOpen ? "62px" : "22px" }}
                  onClick={() => setPath(route.path)}
                >
                  <div className="icon">
                    <img width={20} height={23} src={route.icon} />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          <motion.div className="bars">
            {isOpen ? (
              <BsArrowLeftShort onClick={toggle} />
            ) : (
              <BsArrowRightShort onClick={toggle} />
            )}
          </motion.div>
          <div className="logout">
            <a href="/" className="LogoutIcon" onClick={clearUserDetails}>
              <i>
                <img src={logout} />
              </i>
              <span style={{ display: isOpen ? "inline-block" : "none" }}>
                Logout
              </span>
            </a>
          </div>
        </motion.div>

        <motion.main
        
          // animate={{
          //   width: isOpen ? "calc(100vw - 288px)" : "calc(100vw - 94px)",
          //   transition: {
          //     duration: 0.5,
          //     type: "spring",
          //     damping: 10,
          //   },
          // }}
          animate={{
            width: isOpen ? "calc(100vw - 288px)" : "calc(100vw - 94px)",
            transition: {
              duration: 0.5,
              type: "tween", // Change the type to "tween"
              damping: 10,
            },
          }}
        >
          {children}
        </motion.main>
      </div>
    </>
  );
}

