import React from "react";
import {Image, Text, View} from "@react-pdf/renderer";
import {styles} from "@/pages/services/services.reporting";
import moment from "moment/moment";
import {imageBaseUrl} from "@/pages/api/axios";


const isImageValid = (url) => {
    const validExtensions = [".jpeg", ".jpg", ".png", ".gif"];
    if (url) {
        const lowercasedUrl = url.toLowerCase();
        return validExtensions.some((extension) => lowercasedUrl.endsWith(extension));
    } else {
        return false;
    }
};

const SolutionDetail = ({solution, hiddenDetails}) => {

    const imageLinks = [];
    let isValidImageFound = false;

    if (solution) {
        if (solution?.imageLink) {
            imageLinks.push({link: solution?.imageLink});
        }
        if (solution.images && solution?.images?.length > 0) {
            solution?.images?.forEach((image) => {
                imageLinks?.push({link: image?.imageLink});
            });
        }
    }

    return (<View>
            <View>
                <Text style={{fontSize: "8", textDecoration: "underline"}}>Détails de la solution</Text>
            </View>
            <View style={{marginBottom: 10}}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.text}>{solution?.description}</Text>
            </View>
            {!hiddenDetails && (<>
                    <View style={{marginBottom: 5}}>
                        <Text style={styles.label}>{"Thématique"}:</Text>
                        <Text style={styles.text}>{solution?.thematic?.name}</Text>
                    </View>

                    <View style={{marginBottom: 5}}>
                        <Text style={styles.label}>{"Défis"} : </Text>
                        {solution?.challenges.map((challenge, index) => (<Text key={index} style={styles.text}> kd
                                {challenge?.name}
                            </Text>))}
                    </View>

                    <View style={{marginBottom: 5}}>
                        <Text style={styles.label}>{"Date de soumission"}:</Text>
                        <Text style={styles.text}>
                            {`Le ${moment(solution?.createdAt).format("DD MMMM YYYY [à] HH:mm")} (Date d'inscription)`}
                        </Text>
                    </View>

                    <View style={{marginBottom: 5}}>
                        {solution?.videoLink && (<>
                                <Text style={styles.label}>{"Lien Vidéo"} : </Text>
                                <Text style={styles.text}>
                                    {solution?.videoLink}
                                </Text>
                            </>)}
                    </View>

                    <View>
                        {imageLinks?.length > 0 && imageLinks[0].link !== null ? (isValidImageFound = imageLinks.some((imageLink) => isImageValid(imageLink.link))) : (isValidImageFound = false)}

                        {isValidImageFound ? (<>
                                <Text style={styles.label}>{"Image(s)"} : </Text>
                                <View style={{display: "flex", flexDirection: "row", marginTop: 5}}>
                                    {imageLinks
                                        .filter((imageLink) => imageLink && imageLink.link && isImageValid(imageLink.link))
                                        .map((imageLink, index) => (<View style={{
                                                border: "1px solid #ccc", borderRadius: 5, marginRight: 10
                                            }} key={index}>
                                                <Image
                                                    src={`${imageBaseUrl}/${imageLink.link}`}
                                                    style={{height: "150", width: "150"}}
                                                />
                                            </View>))}
                                </View>
                            </>) : (<>

                            </>)}

                    </View>
                </>)}

        </View>)

}

export default SolutionDetail;