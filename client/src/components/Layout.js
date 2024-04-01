import React, { useState } from "react";
import Chatbot from "react-simple-chatbot";
import "../styles/Layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { Segment } from "semantic-ui-react";
const Layout = ({ children }) => {
  const [showChatbot, setShowChatbot] = useState(false); 
  const [collpsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate()
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-6-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-heart-line",
    },
  ];
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-2-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const sidebarBackgroundColor = user?.isAdmin ? "#E52D34" : user?.isDoctor ? "#1FA42D" : "#3066BE";
  const steps = [
    {
      id: "Greet",
      message: "Welcome to CarePlus",
      trigger: "next",
    },
    {
      id: "next",
      message: "How can I help You?",
      trigger: "options",
    },
    {
      id: "options",
      options: [
        {
            value:'website',//unique identifiers (it is like a key)( in this case key=1)
          label: "Tell me about the website",
          trigger: "website",
        },
        {
            value:'appointment',//(in this case key=2)
          label: "How do I book an appointment with a doctor?",
          trigger: "appointment",
        },
        {
            value:'apply',//(in this case key=2)
          label: "How do I apply to become a doctor on this platform?",
          trigger: "apply",
        },
        {
            value:'end',
          label: "Thank you",
          trigger: "end",
        },
      ],
    },
    {
      id: "apply",
      message: "You have go to 'Apply Doctor' and enter the details shown there, after that you have to submit the form and wait for the admin to approve your request.",
      trigger: "options",
    },
    {
      id: "website",
      message: "CarePlus offers a comprehensive platform for patients to book appointments with available doctors and for aspiring medical professionals to apply for positions.\n\t Regular users has benefits of applying for their desired doctor, emergency phone services and AI-driven chat support.\n\t Doctors enjoy elevated privileges, including appointment review and management capabilities.",
      trigger: "options",
    },
    {
      id: "appointment",
      message: "You can book appointment going to the 'Home' tab on the sidebar and selecting a doctor, after that you need to select date and time and check for availability, if its available then you can book the appointment, Now you have to wait for doctor to approve your request.",
      trigger: "options",
    },
    {
      id: "end",
      message: "Thank you and have a nice day.",
      end:true
    },
  ];
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className={`${collpsed ? "collapsed-sidebar" : "sidebar"}`} style={{backgroundColor:sidebarBackgroundColor}}>
          <div className="sidebar-header">
            <h1 className={collpsed && "collapsed-text"} id="logo">
              Care +
            </h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collpsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div className={`d-flex menu-item`} onClick={()=>{
              localStorage.clear()
              navigate('/login')
            }} >
              <i className='ri-logout-box-line'></i>
              {!collpsed && <Link to='/login'>Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collpsed ? (
              <i
                className="ri-menu-2-fill  header-action-icons"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-menu-line header-action-icons"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
            
              <Link className="anchor">
                {user && user.name}
              </Link>
              <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')} >
                <i className="ri-notification-line header-action-icons px-3"></i>
              </Badge>
              <Link className="no-u-line" to='/phone'>
                <i class="ri-phone-line header-action-icons" ></i>
              </Link>
              <Link className="no-u-line"  onClick={() => setShowChatbot(!showChatbot)} >  
                <i class="ri-chat-4-line header-action-icons pl-25"></i>
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
      {showChatbot && (
        <Segment
        style={{
          position: "fixed",
          bottom: 20, // Adjust as needed to fit within the visible area
          right: 20, // Adjust as needed to fit within the visible area
        }}
        >
          <Chatbot
            steps={steps}
            bubbleStyle={{
              backgroundColor: "#3066BE",
              color: "#fff",
            }}
          />
        </Segment>
      )}
    </div>
  );
};

export default Layout;
