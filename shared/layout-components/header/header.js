import React, {useState, useEffect} from "react";

import {
  Navbar,
  Dropdown,
} from "react-bootstrap";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "../../redux/actions/action";
import { useRouter } from "next/router";
import axios, {apiBaseUrl, imageBaseUrl} from "@/pages/api/axios";

export default function Header() {
  let { basePath } = useRouter();

  const [Lang, setLang] = React.useState(false);
  const [account, setAccount] = React.useState();

  const [profile, setProfile] = useState();


  useEffect(() => {
      const fecthProfile = async () => {
        try {
          const profileResponse = await axios.get(
              `/auth/profile/`
          );
          setProfile(profileResponse.data.data);
        } catch (error) {
          console.log(error);
        }
      }

      fecthProfile();

  }, []);


  const openCloseSidebar = () => {
    document.querySelector("body").classList.toggle("sidenav-toggled");
  };

  const Darkmode = () => {
    document.querySelector(".app").classList.toggle("dark-theme");
    document.querySelector(".app").classList.remove("light-theme");
  };

  const [price, setPrice] = React.useState(0);



  let getdata = useSelector((state) => state.cartreducer.carts);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const [Data, setData] = React.useState([]);


  const { id } = "";

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      console.log(e, id);
      return e.id === id;
    });
    setData(comparedata);
  };

  React.useEffect(() => {
    compare();
    // eslint-disable-next-line
  }, [id]);
  const ondelete = (id) => {
    dispatch(Delete(id));
  };

  function total() {
    let price = 0;
    getdata.map((ele) => {
      price = ele.price * ele.qnty + price;
      return price;
    });
    setPrice(price);
  }

  React.useEffect(() => {
    total();
  });

  React.useEffect(() => {
    
    let navigate;
    const routeChange = () => {
      let path = `/`;
      navigate(path);
    };
    const status = JSON.parse(localStorage.getItem("STATUS_ACCOUNT"));
    if(status.authenticate){
      setAccount(JSON.parse(localStorage.getItem("ACCESS_ACCOUNT")));
    }else{
      routeChange()
    }
  }, []);


  return (
    <Navbar className="main-header side-header sticky nav nav-item">
      <div className="main-container container-fluid">
        <div className="main-header-left ">
          <div className="responsive-logo">
            <Link
              href={`/components/dashboards/dashboard/`}
              className="header-logo"
            >
              <img
                src={`${
                  process.env.NODE_ENV === "production" ? basePath : ""
                }/assets/img/brand/logo.png`}
                className="mobile-logo logo-1"
                alt="logo"
              />
              <img
                src={`${
                  process.env.NODE_ENV === "production" ? basePath : ""
                }/assets/img/brand/logo-white.png`}
                className="mobile-logo dark-logo-1"
                alt="logo"
              />
            </Link>
          </div>
          <div
            className="app-sidebar__toggle"
            data-bs-toggle="sidebar"
            onClick={() => openCloseSidebar()}
          >
            <Link className="open-toggle" href="#!">
              <i className="header-icon fe fe-align-left"></i>
            </Link>
            <Link className="close-toggle" href="#!">
              <i className="header-icon fe fe-x"></i>
            </Link>
          </div>
          <div className="logo-horizontal">
            <Link href={`/dashboard/dashboard-1`} className="header-logo">
              <img
                src={`${
                  process.env.NODE_ENV === "production" ? basePath : ""
                }/assets/img/brand/logo.png`}
                className="mobile-logo logo-1"
                alt="logo"
              />
              <img
                src={`${
                  process.env.NODE_ENV === "production" ? basePath : ""
                }/assets/img/brand/logo-white.png`}
                className="mobile-logo dark-logo-1"
                alt="logo"
              />
            </Link>
          </div>
          <div className="main-header-center ms-4 d-sm-none d-md-none d-lg-block form-group">
          </div>
        </div>
        <div className="main-header-right">
          <Navbar.Toggle
            className="navresponsive-toggler d-lg-none ms-auto"
            type="button"
          >
            <span className="navbar-toggler-icon fe fe-more-vertical"></span>
          </Navbar.Toggle>
          <div className="mb-0 navbar navbar-expand-lg   navbar-nav-right responsive-navbar navbar-dark p-0">
            <Navbar.Collapse className="collapse" id="navbarSupportedContent-4">
              <ul className="nav nav-item header-icons navbar-nav-right ">
                <li className="dropdown nav-item">
                  <a
                    className="new nav-link theme-layout nav-link-bg layout-setting "
                    onClick={() => {
                      Darkmode();
                    }}
                  >
                    <span className="dark-layout">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-icon-svgs"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z" />
                      </svg>
                    </span>
                    <span className="light-layout">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-icon-svgs"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z" />
                      </svg>
                    </span>
                  </a>
                </li>
                <Dropdown className=" main-profile-menu nav nav-item nav-link ps-lg-2">
                  <Dropdown.Toggle
                    className="new nav-link profile-user d-flex"
                    variant=""
                  >
                    {
                      profile && profile.profile ? (
                          <img
                              alt=""
                              // src={`${apiBaseUrl}/uploads/${profile.profile}`}
                              src={`${imageBaseUrl}/${profile.profile}`}
                              className=""
                          />
                      ) : (
                          <img
                              alt=""
                              src={`${
                                  process.env.NODE_ENV === "production" ? basePath : ""
                              }/assets/img/faces/2.png`}
                              className=""
                          />
                      )
                    }
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="menu-header-content p-3 border-bottom">
                      <div className="d-flex wd-100p">
                        <div className="main-img-user">
                          {
                            profile && profile?.profile ? (
                                <img
                                    alt=""
                                    // src={`${apiBaseUrl}/uploads/${profile.profile}`}
                                    src={`${imageBaseUrl}/${profile.profile}`}
                                    className=""
                                />
                            ) : (
                                <img
                                    alt=""
                                    src={`${
                                        process.env.NODE_ENV === "production" ? basePath : ""
                                    }/assets/img/faces/2.png`}
                                    className=""
                                />
                            )
                          }
                        </div>
                        <div className="ms-3 my-auto">
                          <h6 className="tx-15 font-weight-semibold mb-0">
                            {account ? `${account.name}` : ""}
                          </h6>
                          <span className="dropdown-title-text subtext op-6  tx-12">
                            {account ? `${account.email}` : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="dropdown-item"
                      href={
                        account
                          ? `/components/apps/profile/?email=${account.email}`
                          : "/components/apps/profile/"
                      }
                      as="/components/apps/profile/"
                    >
                      <i className="far fa-user-circle"></i>Mon profile
                    </Link>

                    <Link className="dropdown-item" href="/">
                      <i className="far fa-arrow-alt-circle-left"></i> Se
                      deconnecter
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </Navbar.Collapse>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

Header.propTypes = {};

Header.defaultProps = {};
