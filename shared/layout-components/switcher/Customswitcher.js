import React, { useEffect, useState } from "react";
import { Button, Row, Dropdown, Modal  } from 'react-bootstrap'
import Link from 'next/link'
import * as Switcherdatacustam from "../../../shared/data/switcher/Switcherdatacustam";
//Images
import free from "../../../public/assets/switcher/img/free.png"
import img16 from "../../../public/assets/switcher/img/16.jpg"
import img14 from "../../../public/assets/switcher/img/14.jpg"
import img15 from "../../../public/assets/switcher/img/15.jpg"
import moneybag from "../../../public/assets/switcher/img/money-bag.png"

export default function Custompagesswitcher() {
  useEffect(() => {
    Switcherdatacustam.localStorageBackUp();
  });

  function changePrimaryColor() {
    var userColor = document.getElementById("colorID").value;
    localStorage.setItem("primaryColor", userColor);
    // to store value as opacity 0.95 we use 95
    localStorage.setItem("primaryHoverColor", userColor + 95);
    localStorage.setItem("primaryBorderColor", userColor);
    localStorage.setItem("primaryTransparent", userColor + 20);

    const dynamicPrimaryLight = document.querySelectorAll(
      "input.color-primary-light"
    );
    document.getElementById("myonoffswitch1").checked = true;
    Switcherdatacustam.dynamicLightPrimaryColor(dynamicPrimaryLight, userColor);

    // Adding
    document.querySelector("body")?.classList.add("light-theme");

    // Removing
    document.querySelector("body")?.classList.remove("dark-theme");

    localStorage.removeItem("darkPrimaryColor");

    Switcherdatacustam.name();
  }
  function darkPrimaryColor() {
    var userColor = document.getElementById("darkPrimaryColorID").value;

    localStorage.setItem("darkPrimaryColor", userColor);

    const dynamicPrimaryDark = document.querySelectorAll(
      "input.color-primary-dark"
    );

    Switcherdatacustam.dynamicDarkPrimaryColor(dynamicPrimaryDark, userColor);

    document.getElementById("myonoffswitch2").checked = true;

    // Adding
    document.querySelector("body")?.classList.add("dark-theme");
    document.querySelector("body")?.classList.add("dark-theme");

    // Removing
    document.querySelector("body")?.classList.remove("light-theme");
    localStorage.removeItem("primaryColor");
    localStorage.removeItem("primaryHoverColor");
    localStorage.removeItem("primaryBorderColor");

    Switcherdatacustam.name();
  }
  const [Basic, setShow1] = useState(false);
  return (

    <div className="switcher-wrapper">
      <div className="demo_changer">
        <div className="form_holder sidebar-right1">
          <Row>
            <div className="predefined_styles">
              <div className="swichermainleft text-center">
                <div className="p-3 d-grid gap-2">
                  <Link
                    href="../../index.html"
                    className="btn ripple btn-primary mt-0"
                  >
                    View Demo
                  </Link>
                  <Link
                    href="#!"
                    onClick={() => setShow1(!Basic)}
                    className="btn ripple btn-info"
                  >
                    Buy Now
                  </Link>
                  {/* <!-- buynow modal --> */}
                  <Modal className='buynow buynow-btn' size='lg' show={Basic}>
                        <Modal.Body className='p-0 overflow-hidden'>
                          <div className="modal-content-demo cover-image py-5" style={{ backgroundImage: `url(${img16.src})` }}>
                              <h3 className=" text-center mb-4 text-white licenses-colour" style={{ zIndex: 1 }}>Licenses</h3>
                            <div className="row justify-content-center py-4 px-0 mx-3  Licenses-img">
                              <button aria-label="Close" onClick={() => setShow1(!Basic)} className="btn-close" data-bs-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button>
                              <div className="col-sm-10 col-md-8 col-xl-5 col-lg-5">
                                <div className="card  border-0 regular-license">
                                  <div className="card-body imag-list cover-image" style={{ backgroundImage: `url(${img14.src})` }}>
                                    <div className="text-white">
                                      <img src={free.src} alt="" className="w-55 free-img" />
                                      <div className="text-center">
                                        <div className="tx-26"><span className="font-weight-medium ">Regular</span> Licenses</div>
                                        <p className="fw-semi-bold mb-sm-2 mb-0">You <span className="text-success font-weight-semibold">{`can't`} charge </span> from your <br /><span className="op-8">End Product  End Users</span> </p>
                                        <Dropdown>
                                          <Dropdown.Toggle className='btn w-lg mt-1' variant="info" id="dropdown-basic">Buy Now</Dropdown.Toggle>
                                          <Dropdown.Menu className='py-0' style={{ marginTop: '0px' }}>
                                            <Dropdown.Item className='border-bottom px-3' target="_blank" href="https://1.envato.market/Vy1YaO">
                                              <div><p className="tx-14 mb-0 lh-xs font-bold">Buy Now</p><span className="tx-12 op-7 ">6 months support</span></div></Dropdown.Item>
                                            <Dropdown.Item className='px-3' target="_blank" href="https://1.envato.market/ORjnjN">
                                              <div><p className="tx-14 mb-0 lh-xs font-bold">Buy Now</p><span className="tx-12 op-7 ">12 months support</span></div></Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-10 col-md-8 col-xl-5 col-lg-5">
                                <div className="card border-0 ">
                                  <div className='imag-list card-body cover-image' style={{ backgroundImage: `url(${img15.src})` }}>
                                    <div className="text-white">
                                      <img src={moneybag.src} alt="" className="w-55 free-img" />
                                      <div className="text-center">
                                        <div className="tx-26"><span className="font-weight-medium ">Extended</span> Licenses</div>
                                        <p className="fw-semi-bold mb-sm-2 mb-0">You  <span className="text-warning font-weight-semibold">can charge</span> from your  <br /><span className="op-8">End Product  End Users</span></p>
                                        <Dropdown>
                                          <Dropdown.Toggle className='btn w-lg mt-1' variant="info" id="dropdown-basic">Buy Now</Dropdown.Toggle>
                                          <Dropdown.Menu className='py-0' style={{ marginTop: '0px' }}>
                                            <Dropdown.Item className='border-bottom px-3' target="_blank" href="https://1.envato.market/n1mEkA">
                                              <div>
                                                <p className="tx-14 mb-0 lh-xs font-bold">Buy Now</p><span className="tx-12 op-7 ">6 months support</span>
                                              </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item className='px-3' target="_blank" href="https://1.envato.market/3PGjGB">
                                              <div>
                                                <p className="tx-14 mb-0 lh-xs font-bold">Buy Now</p><span className="tx-12 op-7 ">12 months support</span>
                                              </div>
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="license-view" style={{ zIndex: 1 }}>
                                <a href="https://spruko.com/licenses" target="_blank" className="modal-title text-center mb-3 tx-14 text-white" rel="noreferrer">View license details</a>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                      {/* <!-- End buynow modal --> */}
                  <Link
                    href="https://themeforest.net/user/spruko/portfolio"
                    className="btn ripple btn-danger"
                  >
                    Our Portfolio
                  </Link>
                </div>
              </div>
              <div className="swichermainleft text-center">
                <h4>LTR AND RTL VERSIONS</h4>
                <div className="skin-body">
                  <div className="switch_section">
                    <div className="switch-toggle d-flex mt-2">
                      <span className="me-auto">LTR</span>
                      <p className="onoffswitch2 my-0">
                        <input
                          type="radio"
                          name="onoffswitch25"
                          id="myonoffswitch54"
                          onClick={() => Switcherdatacustam.RtltoLtr()}
                          className="onoffswitch2-checkbox"
                          defaultChecked
                        />
                        <label
                          htmlFor="myonoffswitch54"
                          className="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div className="switch-toggle d-flex mt-2">
                      <span className="me-auto">RTL</span>
                      <p className="onoffswitch2 my-0">
                        <input
                          type="radio"
                          name="onoffswitch25"
                          id="myonoffswitch55"
                          onClick={() => Switcherdatacustam.LtrtoRtl()}
                          className="onoffswitch2-checkbox"
                        />
                        <label
                          htmlFor="myonoffswitch55"
                          className="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swichermainleft">
                <h4>Light Theme Style</h4>
                <div className="skin-body">
                  <div className="switch_section">
                    <div className="switch-toggle d-flex">
                      <span className="me-auto">Light Theme</span>
                      <p className="onoffswitch2 my-0">
                        <input
                          type="radio"
                          name="onoffswitch1"
                          id="myonoffswitch1"
                          onClick={() => Switcherdatacustam.LightTheme()}
                          className="onoffswitch2-checkbox"
                          defaultChecked
                        />
                        <label
                          htmlFor="myonoffswitch1"
                          className="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                    <div className="switch-toggle d-flex mt-2">
                      <span className="me-auto">Dark Theme</span>
                      <p className="onoffswitch2 my-0">
                        <input
                          type="radio"
                          name="onoffswitch1"
                          id="myonoffswitch2"
                          onClick={() => Switcherdatacustam.dark()}
                          className="onoffswitch2-checkbox"
                        />
                        <label
                          htmlFor="myonoffswitch2"
                          className="onoffswitch2-label"
                        ></label>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swichermainleft">
                <h4>Dark Theme Style</h4>
                <div className="skin-body">
                  <div className="switch_section">
                    <div className="switch-toggle d-flex">
                      <span className="me-auto">Light Primary</span>
                      <div className="">
                        <input
                          className="wd-25 ht-25 input-color-picker color-primary-light"
                          defaultValue="#38cab3"
                          id="colorID"
                          onInput={() => changePrimaryColor()}
                          type="color"
                          data-id="bg-color"
                          data-id1="bg-hover"
                          data-id2="bg-border"
                          data-id7="transparentcolor"
                          name="lightPrimary"
                        />
                      </div>
                    </div>
                    <div className="switch-toggle d-flex mt-2">
                      <span className="me-auto">Dark Primary</span>
                      <div className="">
                        <input
                          className="wd-25 ht-25 input-dark-color-picker color-primary-dark"
                          defaultValue="#38cab3"
                          id="darkPrimaryColorID"
                          onInput={() => darkPrimaryColor()}
                          type="color"
                          data-id="bg-color"
                          data-id1="bg-hover"
                          data-id2="bg-border"
                          data-id3="primary"
                          data-id8="transparentcolor"
                          name="darkPrimary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swichermainleft">
                <h4>Reset All Styles</h4>
                <div className="skin-body">
                  <div className="switch_section my-4">
                    <Button
                      variant=""
                      className="btn btn-danger btn-block"
                      onClick={() => {
                        localStorage.clear();
                        document.querySelector("html").style = "";
                        Switcherdatacustam.name();
                        Switcherdatacustam.resetData();
                      }}
                      type="button"
                    >
                      Reset All
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
}
