import React from 'react';
import {Image, View} from "@react-pdf/renderer";
import {IMAGEPATH} from "@/pages/services/services.reporting";

const HeaderReport = () => {
    return (
        <View>
            <Image src={`${IMAGEPATH}entete.png`} />
        </View>
    )
}
export default HeaderReport
