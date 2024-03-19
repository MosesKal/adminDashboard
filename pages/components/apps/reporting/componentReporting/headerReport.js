import React from 'react';
import {Image, View} from "@react-pdf/renderer";
const IMAGEPATH = "/assets/img/faces/";

const HeaderReport = () => {
    return (
        <View>
            <Image src={`${IMAGEPATH}entete.png`} alt={"entete.png"}/>
        </View>
    )
}
export default HeaderReport
