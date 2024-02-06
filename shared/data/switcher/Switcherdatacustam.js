// Direction
export const LtrtoRtl = () => {
  document.querySelector(".error-page1").classList.add("rtl");
  document.querySelector("html[lang=en]").setAttribute("dir", "rtl");
  // document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.rtl.min.css")
  document.querySelector(".error-page1").classList.remove("ltr");

  localStorage.setItem("nowaltr", true);
  localStorage.removeItem("nowartl");
};
export const RtltoLtr = () => {
  document.querySelector(".error-page1").classList.add("ltr");
  document.querySelector("html[lang=en]").setAttribute("dir", "ltr");
  // document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.min.css")
  document.querySelector(".error-page1").classList.remove("rtl");

  localStorage.setItem("nowartl", true);
  localStorage.removeItem("nowaltr");
};
// Color theme
export const LightTheme = () => {
  document.querySelector(".error-page1").classList.add("light-theme");

  document.querySelector(".error-page1").classList.remove("transparent-theme");
  document.querySelector(".error-page1").classList.remove("dark-theme");
  document.querySelector("body")?.classList.remove("dark-header");
  document.querySelector("body")?.classList.remove("color-header");
  document.querySelector("body")?.classList.remove("gradient-header");
  document.querySelector("body")?.classList.remove("dark-menu");
  document.querySelector("body")?.classList.remove("color-menu");
  document.querySelector("body")?.classList.remove("gradient-menu");

  document.querySelector("html").style = "";
  name();
  localStorage.clear();
};
export const dark = () => {
  document.querySelector(".error-page1").classList.add("dark-theme");

  document.querySelector(".error-page1").classList.remove("transparent-theme");
  document.querySelector(".error-page1").classList.remove("light-theme");
  document.querySelector("body")?.classList.remove("light-header");
  document.querySelector("body")?.classList.remove("color-header");
  document.querySelector("body")?.classList.remove("gradient-header");
  document.querySelector("body")?.classList.remove("light-menu");
  document.querySelector("body")?.classList.remove("color-menu");
  document.querySelector("body")?.classList.remove("gradient-menu");

  document.querySelector("html").style = "";
  name();
  localStorage.clear();
};

export function handleThemeUpdate(cssVars) {
  const root = document.querySelector(":root");
  const keys = Object.keys(cssVars);

  keys.forEach((key) => {
    root.style.setProperty(key, cssVars[key]);
  });
}
// to check the value is hexa or not
const isValidHex = (hexValue) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue);

const getChunksFromString = (st, chunkSize) =>
  st.match(new RegExp(`.{${chunkSize}}`, "g"));
// convert hex value to 256
const convertHexUnitTo256 = (hexStr) =>
  parseInt(hexStr.repeat(2 / hexStr.length), 16);
// get alpha value is equla to 1 if there was no value is asigned to alpha in function
const getAlphafloat = (a, alpha) => {
  if (typeof a !== "undefined") {
    return a / 255;
  }
  if (typeof alpha != "number" || alpha < 0 || alpha > 1) {
    return 1;
  }
  return alpha;
};
// convertion of hex code to rgba code
export function hexToRgba(hexValue, alpha = 1) {
  if (!isValidHex(hexValue)) {
    return null;
  }
  const chunkSize = Math.floor((hexValue.length - 1) / 3);
  const hexArr = getChunksFromString(hexValue.slice(1), chunkSize);
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
}

export function dynamicLightPrimaryColor(primaryColor, color) {
  primaryColor.forEach((item) => {
    const cssPropName = `--primary-${item.getAttribute("data-id")}`;
    const cssPropName1 = `--primary-${item.getAttribute("data-id1")}`;
    const cssPropName2 = `--primary-${item.getAttribute("data-id2")}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color, 0.9),
      [cssPropName2]: hexToRgba(color),
    });
  });
}
export function dynamicDarkPrimaryColor(primaryColor, color) {
  primaryColor.forEach((item) => {
    const cssPropName = `--primary-${item.getAttribute("data-id")}`;
    const cssPropName1 = `--primary-${item.getAttribute("data-id1")}`;
    const cssPropName2 = `--primary-${item.getAttribute("data-id2")}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}
export function dynamicTransparentPrimaryColor(primaryColor, color) {
  primaryColor.forEach((item) => {
    const cssPropName = `--primary-${item.getAttribute("data-id")}`;
    const cssPropName1 = `--primary-${item.getAttribute("data-id1")}`;
    const cssPropName2 = `--primary-${item.getAttribute("data-id2")}`;
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}
export function dynamicBgTransparentBackground(primaryColor, color) {
  primaryColor.forEach((item) => {
    const cssPropName1 = `--transparent-${item.getAttribute("data-id5")}`;
    handleThemeUpdate({
      [cssPropName1]: hexToRgba(color),
    });
  });
}
export function dynamicBgImgTransparentPrimaryColor(primaryColor, color) {
  primaryColor.forEach((item) => {
    const cssPropName = `--primary-${item.getAttribute("data-id")}`;
    const cssPropName1 = `--primary-${item.getAttribute("data-id1")}`;
    const cssPropName2 = `--primary-${item.getAttribute("data-id2")}`;
    
    handleThemeUpdate({
      [cssPropName]: hexToRgba(color),
      [cssPropName1]: hexToRgba(color),
      [cssPropName2]: hexToRgba(color),
    });
  });
}

export function resetData() {
  document.querySelector("#myonoffswitch1").checked = true;   //lighttheme
  document.querySelector("#myonoffswitch54").checked = true;  //Ltr
  
  document.querySelector(".error-page1").classList.add("ltr");
  document.querySelector("html[lang=en]").setAttribute("dir", "ltr");
  // document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.rtl.min.css")
  document.querySelector(".error-page1").classList.remove("rtl");
  name();
}

export function name() {
  if(typeof window !== "undefined"){
    let primaryColorVal = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-bg-color")
      .trim();
  
    //get variable
    let myVarVal =
      localStorage.getItem("nowaprimaryColor") ||
      localStorage.getItem("nowadarkPrimaryColor") ||
      localStorage.getItem("nowatransparentPrimaryColor") ||
      localStorage.getItem("nowatransparent-bgImgPrimaryColor") ||
      localStorage.getItem("nowatransparentBgImgPrimary") ||
      primaryColorVal;
  
    let colorData = hexToRgba(myVarVal || "#38cab3", 0.1);
    document.querySelector("html").style.setProperty("--primary01", colorData);
  
    let colorData1 = hexToRgba(myVarVal || "#38cab3", 0.2);
    document.querySelector("html").style.setProperty("--primary02", colorData1);
  
    let colorData2 = hexToRgba(myVarVal || "#38cab3", 0.3);
    document.querySelector("html").style.setProperty("--primary03", colorData2);
  
    let colorData3 = hexToRgba(myVarVal || "#38cab3", 0.6);
    document.querySelector("html").style.setProperty("--primary06", colorData3);
  
    let colorData4 = hexToRgba(myVarVal || "#38cab3", 0.9);
    document.querySelector("html").style.setProperty("--primary09", colorData4);
  }
}
name();

export function localStorageBackUp() {
  let html = document.querySelector("html")?.style;
  let body = document.querySelector("body");
  if (localStorage.getItem("nowaprimaryColor") !== null) {
    body?.classList.add("light-theme");

    document.getElementById("myonoffswitch6").checked = true;

    body?.classList.remove("dark-theme");
    
    html?.setProperty(
      "--primary-bg-color",
      localStorage.getItem("nowaprimaryColor")
    );
    html?.setProperty(
      "--primary-bg-hover",
      localStorage.getItem("nowaprimaryHoverColor")
    );
    html?.setProperty(
      "--primary-bg-border",
      localStorage.getItem("nowaprimaryBorderColor")
    );
  }
  if (localStorage.getItem("nowadarkPrimaryColor") !== null) {
    body?.classList.add("dark-theme");

    document.getElementById("myonoffswitch7").checked = true;

    body?.classList.remove("light-theme");
    

    html?.setProperty(
      "--primary-bg-color",
      localStorage.getItem("nowadarkPrimaryColor")
    );
    html?.setProperty(
      "--primary-bg-hover",
      localStorage.getItem("nowadarkPrimaryColor")
    );
    html?.setProperty(
      "--primary-bg-border",
      localStorage.getItem("nowadarkPrimaryColor")
    );
  }

 
  if (localStorage.nowartl) {
    document.querySelector("body").classList.add("rtl");
    document.querySelector("html[lang=en]").setAttribute("dir", "ltr");
    document.querySelector(".error-page1").classList.remove("rtl");
  }
}
export const Swichermainright = () => {
  document.querySelector(".demo_changer").classList.toggle("active");
  document.querySelector(".demo_changer").style.right = "0px";
};
export const Swichermainrightremove = () => {
  document.querySelector(".demo_changer").classList.remove("active");
  document.querySelector(".demo_changer").style.right = "-270px";
};