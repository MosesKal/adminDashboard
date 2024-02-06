
export const options = [
    { value: "eg1", label: " eg1" },
    { value: "saab1", label: " Saab" },
    { value: "eg2", label: " eg2" },
    { value: "eg3", label: " eg3" },
    { value: "eg4", label: " eg1" },
    { value: "saab2", label: " Saab" },
    { value: "eg5", label: " eg2" },
    { value: "eg6", label: " eg3" },
    { value: "eg7", label: " eg1" },
    { value: "saab3", label: " Saab" },
    { value: "eg8", label: " eg2" },
    { value: "eg9", label: " eg3" },
    { value: "eg10", label: " eg1" },
    { value: "saab4", label: " Saab" },
    { value: "eg11", label: " eg2" },
    { value: "eg12", label: " eg3" },
  ];
  
  const optionOptgroupSupport = [
    { label: "Audi", value: "Audi" },
    { value: "BMW", label: "BMW" },
    { value: "volkswagen", label: "volkswagen" },
    { value: "Aston Martin", label: "Aston Martin" },
    { value: "mitsubishi", label: "mitsubishi" },
    { value: "hyundai", label: "hyundai" },
    { value: "fiat", label: "fiat" },
  ];
  const objectArray = [
    { value: "BMW", selected: "true", label: "BMW" },
    { value: "volkswagen", label: "volkswagen" },
    { value: "Aston Martin", label: "Aston Martin" },
    { value: "mitsubishi", label: "mitsubishi" },
    { value: "hyundai", label: "hyundai" },
    { value: "fiat", label: "fiat" },
  ];
  export const groupedOptions = [
    {
      label: "BMW",
      options: objectArray,
    },
    {
      label: "volkswagen",
      options: optionOptgroupSupport,
    },
  ];
 
import Select from "react-select";
import makeAnimated from "react-select/animated";

  // Pre-filled-input
const Prefilledinput = makeAnimated();
const optionset2 = [
  { value: "Firefox", label: "firefox" },
  { value: "Chrome", label: "chrome " },
  { value: "Safari", label: "safari" },
  { value: "Operate", label: "operate" },
  { value: " Internet Explore", label: "internet explore " },
];
export function Prefilledinputs() {
  return (
    <Select
      closeMenuOnSelect={false}
      defaultValue={[optionset2[4], optionset2[5]]}
      components={Prefilledinput}
      classNamePrefix="selectform"
      //
      isMulti
      options={optionset2}
    />
  );
}

// multiple
const animatedComponents = makeAnimated();
const options23 = [
  { value: "Firefox", label: "firefox" },
  { value: "Chrome", label: "chrome " },
  { value: "Safari", label: "safari" },
  { value: "Operate", label: "operate" },
  { value: " Internet Explore", label: "internet explore " },
];
export function AnimatedMulti() {
  return (
    <Select
      classNamePrefix="selectform"
      closeMenuOnSelect={true}
      components={animatedComponents}
      //
      isMulti
      options={options23}
    />
  );
}