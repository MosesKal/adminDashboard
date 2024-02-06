import React, { useEffect, useState } from "react";
import { Button, Row, Dropdown, Modal } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as Switcherdata from "../../data/switcher/Switcherdata";
import Link from "next/link";
import { useRouter } from "next/router";

//Images
import free from "../../../public/assets/switcher/img/free.png";
import img16 from "../../../public/assets/switcher/img/16.jpg";
import img14 from "../../../public/assets/switcher/img/14.jpg";
import img15 from "../../../public/assets/switcher/img/15.jpg";
import moneybag from "../../../public/assets/switcher/img/money-bag.png";

export default function Switcher() {
  let { basePath } = useRouter();
  const [Basic, setShow1] = useState(false);
  useEffect(() => {
    Switcherdata.localStorageBackUp();
  });
  function changePrimaryColor() {
    var userColor = document.getElementById("colorID").value;
    localStorage.setItem("nowaPrimaryColor", userColor);
    // to store value as opacity 0.95 we use 95
    localStorage.setItem("nowaprimaryHoverColor", userColor + 95);
    localStorage.setItem("nowaprimaryBorderColor", userColor);
    localStorage.setItem("nowaprimaryTransparent", userColor + 20);

    const dynamicPrimaryLight = document.querySelectorAll(
      "input.color-primary-light"
    );

    Switcherdata.dynamicLightPrimaryColor(dynamicPrimaryLight, userColor);

    document.getElementById("myonoffswitch1").checked = true;
    document.getElementById("myonoffswitch3").checked = true;
    document.getElementById("myonoffswitch6").checked = true;

    // Adding
    document.querySelector("body")?.classList.add("light-theme");

    // Removing
    document.querySelector("body")?.classList.remove("dark-theme");
    document.querySelector("body")?.classList.remove("transparent-theme");
    document.querySelector("body")?.classList.remove("bg-img1");
    document.querySelector("body")?.classList.remove("bg-img2");
    document.querySelector("body")?.classList.remove("bg-img3");
    document.querySelector("body")?.classList.remove("bg-img4");

    localStorage.removeItem("nowadarkPrimaryColor");
    localStorage.removeItem("nowatransparentPrimaryColor");
    localStorage.removeItem("nowatransparentBgColor");
    localStorage.removeItem("nowatransparent-bgImgPrimaryColor");
    localStorage.removeItem("nowaBgImage");

    Switcherdata.name();
  }
  function darkPrimaryColor() {
    var userColor = document.getElementById("darkPrimaryColorID").value;
    localStorage.setItem("nowadarkPrimaryColor", userColor);
    localStorage.setItem("nowaprimaryHoverColor", userColor + 95);
    localStorage.setItem("nowaprimaryBorderColor", userColor);
    localStorage.setItem("nowaprimaryTransparent", userColor + 20);
    const dynamicPrimaryDark = document.querySelectorAll(
      "input.color-primary-dark"
    );

    Switcherdata.dynamicDarkPrimaryColor(dynamicPrimaryDark, userColor);

    document.getElementById("myonoffswitch2").checked = true;
    document.getElementById("myonoffswitch5").checked = true;
    document.getElementById("myonoffswitch8").checked = true;
    // Adding
    document.querySelector("body")?.classList.add("dark-theme");

    // Removing
    document.querySelector("body")?.classList.remove("light-theme");
    document.querySelector("body")?.classList.remove("transparent-theme");
    document.querySelector("body")?.classList.remove("bg-img1");
    document.querySelector("body")?.classList.remove("bg-img2");
    document.querySelector("body")?.classList.remove("bg-img3");
    document.querySelector("body")?.classList.remove("bg-img4");

    localStorage.removeItem("nowaPrimaryColor");
    localStorage.removeItem("nowaprimaryHoverColor");
    localStorage.removeItem("nowaprimaryBorderColor");
    localStorage.removeItem("nowaprimaryTransparent");
    localStorage.removeItem("nowatransparentPrimaryColor");
    localStorage.removeItem("nowatransparentBgColor");
    localStorage.removeItem("nowatransparent-bgImgPrimaryColor");
    localStorage.removeItem("nowaBgImage");

    Switcherdata.name();
  }
  function transparentPrimaryColor() {
    var userColor = document.getElementById("transparentPrimaryColorID").value;

    localStorage.setItem("nowatransparentPrimaryColor", userColor);
    localStorage.setItem("nowaprimaryHoverColor", userColor + 95);
    localStorage.setItem("nowaprimaryBorderColor", userColor);
    localStorage.setItem("nowaprimaryTransparent", userColor + 20);
    const PrimaryTransparent = document.querySelectorAll(
      "input.color-primary-transparent"
    );

    Switcherdata.dynamicTransparentPrimaryColor(PrimaryTransparent, userColor);

    document.getElementById("myonoffswitchTransparent").checked = true;

    // Adding
    document.querySelector("body")?.classList.add("transparent-theme");

    // Removing
    document.querySelector("body")?.classList.remove("light-theme");
    document.querySelector("body")?.classList.remove("dark-theme");
    document.querySelector("body")?.classList.remove("bg-img1");
    document.querySelector("body")?.classList.remove("bg-img2");
    document.querySelector("body")?.classList.remove("bg-img3");
    document.querySelector("body")?.classList.remove("bg-img4");

    localStorage.removeItem("nowaPrimaryColor");
    localStorage.removeItem("nowaprimaryHoverColor");
    localStorage.removeItem("nowaprimaryBorderColor");
    localStorage.removeItem("nowaprimaryTransparent");
    localStorage.removeItem("nowadarkPrimaryColor");
    localStorage.removeItem("nowatransparent-bgImgPrimaryColor");
    localStorage.removeItem("nowaBgImage");

    Switcherdata.name();
  }
  function BgTransparentBackground() {
    var userColor = document.getElementById("transparentBgColorID").value;

    localStorage.setItem("nowatransparentBgColor", userColor);

    const dynamicBackgroundColor = document.querySelectorAll(
      "input.color-bg-transparent"
    );

    Switcherdata.dynamicBgTransparentBackground(
      dynamicBackgroundColor,
      userColor
    );

    document.getElementById("myonoffswitchTransparent").checked = true;

    // Adding
    document.querySelector("body")?.classList.add("transparent-theme");

    // Removing
    document.querySelector("body")?.classList.remove("light-theme");
    document.querySelector("body")?.classList.remove("dark-theme");
    document.querySelector("body")?.classList.remove("bg-img1");
    document.querySelector("body")?.classList.remove("bg-img2");
    document.querySelector("body")?.classList.remove("bg-img3");
    document.querySelector("body")?.classList.remove("bg-img4");
    document.querySelector("body")?.classList.remove("light-header");
    document.querySelector("body")?.classList.remove("color-header");
    document.querySelector("body")?.classList.remove("dark-header");
    document.querySelector("body")?.classList.remove("gradient-header");
    document.querySelector("body")?.classList.remove("light-menu");
    document.querySelector("body")?.classList.remove("color-menu");
    document.querySelector("body")?.classList.remove("dark-menu");
    document.querySelector("body")?.classList.remove("gradient-menu");
    localStorage.removeItem("nowaPrimaryColor");
    localStorage.removeItem("nowaprimaryHoverColor");
    localStorage.removeItem("nowaprimaryBorderColor");
    localStorage.removeItem("nowaprimaryTransparent");
    localStorage.removeItem("nowadarkPrimaryColor");
    localStorage.removeItem("nowatransparent-bgImgPrimaryColor");
    localStorage.removeItem("nowaBgImage");

    Switcherdata.name();
  }
  function BgImgTransparentPrimaryColor() {
    var userColor = document.getElementById(
      "transparentBgImgPrimaryColorID"
    ).value;

    localStorage.setItem("nowatransparent-bgImgPrimaryColor", userColor);

    const dynamicPrimaryImgTransparent = document.querySelectorAll(
      "input.color-primary-transparent"
    );

    Switcherdata.dynamicBgImgTransparentPrimaryColor(
      dynamicPrimaryImgTransparent,
      userColor
    );
    // console.log(dynamicPrimaryImgTransparent);
    document.getElementById("myonoffswitchTransparent").checked = true;

    // Adding
    document.querySelector("body")?.classList.add("transparent-theme");

    // Removing
    document.querySelector("body")?.classList.remove("light-theme");
    document.querySelector("body")?.classList.remove("dark-theme");
    document.querySelector("body")?.classList.remove("light-header");
    document.querySelector("body")?.classList.remove("color-header");
    document.querySelector("body")?.classList.remove("dark-header");
    document.querySelector("body")?.classList.remove("gradient-header");
    document.querySelector("body")?.classList.remove("light-menu");
    document.querySelector("body")?.classList.remove("color-menu");
    document.querySelector("body")?.classList.remove("dark-menu");
    document.querySelector("body")?.classList.remove("gradient-menu");
    localStorage.removeItem("nowaPrimaryColor");
    localStorage.removeItem("nowaprimaryHoverColor");
    localStorage.removeItem("nowaprimaryBorderColor");
    localStorage.removeItem("nowaprimaryTransparent");
    localStorage.removeItem("nowadarkPrimaryColor");
    localStorage.removeItem("nowatransparentPrimaryColor");
    localStorage.removeItem("nowatransparentBgColor");

    document.querySelector("html").style.removeProperty("--transparent-body");

    if (
      document.querySelector("body")?.classList.contains("bg-img1") === false &&
      document.querySelector("body")?.classList.contains("bg-img2") === false &&
      document.querySelector("body")?.classList.contains("bg-img3") === false &&
      document.querySelector("body")?.classList.contains("bg-img4") === false
    ) {
      document.querySelector("body")?.classList.add("bg-img1");
      localStorage.setItem("nowaBgImage", "bg-img1");
    }
    Switcherdata.name();
  }
  return (
    <div>
      <div className="switcher-wrapper">
        <div className="demo_changer">
          <div className="form_holder sidebar-right1">
            <PerfectScrollbar className="sidebarright2">
              <Row>
                <div className="predefined_styles">
                  <div className="swichermainleft text-center"></div>
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
                              onClick={() => Switcherdata.RtltoLtr()}
                              className="onoffswitch2-checkbox"
                              defaultChecked="checked"
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
                              onClick={() => Switcherdata.LtrtoRtl()}
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
                    <h4>Navigation Style</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Vertical Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch15"
                              id="myonoffswitch34"
                              onClick={() => Switcherdata.VerticalMenu()}
                              className="onoffswitch2-checkbox"
                              defaultChecked="checked"
                            />
                            <label
                              htmlFor="myonoffswitch34"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Horizantal Click Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch15"
                              id="myonoffswitch35"
                              onClick={Switcherdata.horizontal}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch35"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Horizantal Hover Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch15"
                              id="myonoffswitch111"
                              onClick={() => Switcherdata.HorizontalHoverMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch111"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft leftmenu-styles">
                    <h4>Styles de Menu Gauche</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Menu Clair</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch3"
                              onClick={() => Switcherdata.LightMenu()}
                              className="onoffswitch2-checkbox"
                              defaultChecked="checked"
                            />
                            <label
                              htmlFor="myonoffswitch3"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Menu Coloré</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch4"
                              onClick={() => Switcherdata.ColorMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch4"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Menu Foncé</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch5"
                              onClick={() => Switcherdata.DarkMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch5"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Menu Dégradé</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch25"
                              onClick={() => Switcherdata.GradientMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch25"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swichermainleft leftmenu-styles">
                    <h4>Styles de Menu Gauche</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Menu Clair</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch3"
                              onClick={() => Switcherdata.LightMenu()}
                              className="onoffswitch2-checkbox"
                              defaultChecked="checked"
                            />
                            <label
                              htmlFor="myonoffswitch3"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Menu Coloré</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch4"
                              onClick={() => Switcherdata.ColorMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch4"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Menu Foncé</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch5"
                              onClick={() => Switcherdata.DarkMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch5"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Menu Dégradé</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch25"
                              onClick={() => Switcherdata.GradientMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch25"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swichermainleft header-styles">
                    <h4>Styles d'en-tête</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">En-tête Clair</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch6"
                              onClick={() => Switcherdata.Lightheader()}
                              className="onoffswitch2-checkbox"
                              defaultChecked="checked"
                            />
                            <label
                              htmlFor="myonoffswitch6"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">En-tête Coloré</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch7"
                              onClick={() => Switcherdata.Colorheader()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch7"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">En-tête Foncé</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch8"
                              onClick={() => Switcherdata.Darkheader()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch8"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">En-tête Dégradé</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch26"
                              onClick={() => Switcherdata.gradientheader()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch26"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swichermainleft">
                    <h4>Styles de Largeur de la Mise en Page</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Pleine Largeur</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch4"
                              id="myonoffswitch9"
                              onClick={() => Switcherdata.FullWidth()}
                              className="onoffswitch2-checkbox"
                              defaultChecked="checked"
                            />
                            <label
                              htmlFor="myonoffswitch9"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">En Boîte</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch4"
                              id="myonoffswitch10"
                              onClick={() => Switcherdata.Boxed()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch10"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swichermainleft">
                    <h4>Positions de la mise en page</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Fixe</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch5"
                              id="myonoffswitch11"
                              onClick={() => Switcherdata.Fixed()}
                              className="onoffswitch2-checkbox"
                              defaultChecked="checked"
                            />
                            <label
                              htmlFor="myonoffswitch11"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Défilable</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch5"
                              id="myonoffswitch12"
                              onClick={() => Switcherdata.Scrollable()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch12"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swichermainleft">
                    <h4>Options par défaut</h4>
                    <div className="skin-body">
                      <div className="switch_section my-4">
                        <Button
                          variant=""
                          className="btn btn-danger btn-block"
                          onClick={() => {
                            localStorage.clear();
                            document.querySelector("html").style = "";
                            Switcherdata.name();
                            Switcherdata.resetData();
                          }}
                          type="button"
                        >
                          Réinitialiser
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
}
Switcher.propTypes = {};

Switcher.defaultProps = {};
