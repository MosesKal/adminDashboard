import React, {useEffect, useState} from "react";
import {Document, Page, Text, View, StyleSheet, PDFViewer, Image} from "@react-pdf/renderer";
import moment from "moment";
import axios, {imageBaseUrl} from "@/pages/api/axios";


const imagePath = "../../../../assets/img/faces/";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column", padding: 20,
    }, section: {
        margin: 10, padding: 10, flexGrow: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5,
    }, heading: {
        fontSize: 20, marginBottom: 20, color: "#333", textDecoration: "underline"
    }, label: {
        fontSize: 12, fontWeight: "bold", marginBottom: 5, color: "#666", marginTop: 5
    }, text: {
        fontSize: 12, marginBottom: 5, color: "#333",
    }, profileImage: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        border: "1px dash #ccc",
        paddingLeft: 20,
        paddingBottom: 10
    }, profileImg: {
        borderRadius: 5, width: 100, height: 100, objectFit: "cover", marginRight: 10,
    }, profDetails: {
        flexDirection: "column",

    }, containerTextDetail: {
        display: "flex", flexDirection: "row", marginBottom: 3, marginTop: 5
    }, containerIcon: {
        marginRight: 15, marginTop: 5
    }, constainerText: {
        marginTop: 5
    }, containerTextDetailOther: {
        display: "flex", flexDirection: "row",
    }, profDetailOther: {
        fontSize: 10
    }, containerIconOther: {
        marginRight: 15, marginTop: 5
    }, containerTextOther: {
        paddingTop: 6
    }, profDetailsText: {
        fontSize: 20, color: "black", textTransform: "uppercase"
    }, icons: {
        width: 15,
    }, fontWeightSemibold: {
        fontWeight: "bold",
    }, textMuted: {
        color: "#666",
    }, curatorContainer: {
        display: "flex", border: "1px dash #ccc", padding: 10, margin: 5, flexDirection: "row",
    }, curatorContainerBloc: {
        display: "flex", flexDirection: "column",
    }, curatorContainerBlocTow: {
        display: "flex", flexDirection: "column", marginLeft: 10
    }, describeCuratorContainer: {
        width: 100, paddingLeft: 20, display: "flex", flexDirection: "row", border: "1px solid black"
    }, textIconCurator: {
        display: "flex", flexDirection: "row",
    }, iconCuratorContainer: {
        marginRight: 10

    }, iconCurator: {
        width: 15
    }, textContainer: {},
    section1: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    heading1: {
        fontSize: 20,
        marginBottom: 10,
        color: "#333",
        textDecoration: "underline"
    },
    quotationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    quotationLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#666",
        marginRight: 5,
    },
    quotationValue: {
        fontSize: 12,
        color: "#333",
    },
    totalPercentageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    label1: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#666",
        marginRight: 5,
    },
    text1: {
        fontSize: 12,
        color: "#333",
    },
});

const isImageValid = (url) => {
    const validExtensions = [".jpeg", ".jpg", ".png", ".gif"];
    if (url) {
        const lowercasedUrl = url.toLowerCase();
        return validExtensions.some((extension) =>
            lowercasedUrl.endsWith(extension)
        );
    } else {
        return false;
    }
};

const UserDetail = ({icon, text}) => (
    <View style={styles.containerTextDetailOther}>
        <View style={styles.containerIconOther}>
            <Image src={`${imagePath}${icon}.png`} style={styles.icons}/>
        </View>
        <View style={styles.containerTextOther}>
            <Text style={styles.profDetailOther}>{text}</Text>
        </View>
    </View>
);


const GenerateCurratedSolutionPdf = ({curratedSolution}) => {
    const [quotations, setQuotations] = useState();

    const imageLinks = [];
    let isValidImageFound = false;

    if (curratedSolution) {
        if (curratedSolution?.imageLink) {
            imageLinks.push({link: curratedSolution?.imageLink});
        }
        if (curratedSolution.images && curratedSolution?.images?.length > 0) {
            curratedSolution?.images?.forEach((image) => {
                imageLinks?.push({link: image?.imageLink});
            });
        }
    }

    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const responseQuotations = await axios.get("/quotations");
                setQuotations(responseQuotations?.data?.data.map((quotation) => {
                    return {id: quotation.id, average: quotation.average, mention: quotation.mention};
                }));
            } catch (e) {
                console.log(e);
            }
        };

        const fetchCuratorInfo = async () => {
            try {
                const curatorInfoResponse = await axios.get(`/users/${curratedSolution.feedbacks[0]?.userId}`);
                const poleResponse = await axios.get(`/poles/${curatorInfoResponse?.data?.data?.poleId}`);
                const organisationResponse = await axios.get(`/organisations/${curatorInfoResponse?.data?.data?.organisationId}`);
                const enhancedSolution = {
                    ...curratedSolution,
                    curatorInfo: {
                        ...curatorInfoResponse.data,
                        pole: poleResponse.data,
                        organisation: organisationResponse.data
                    }
                };
                setEnhancedSolution(enhancedSolution);
            } catch (error) {
                console.log("Error fetching curator info:", error);

                // setEnhancedSolution(curratedSolution);
            }
        };

        fetchQuotations();
        fetchCuratorInfo();
    }, []);

    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <PDFViewer width="100%" height="100%">
            <Document>
                <Page style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>{curratedSolution?.name}</Text>
                        <View>
                            <Text style={{marginBottom: "10"}}>{"Informations de l'innovateur"}</Text>
                        </View>
                        <View style={styles.profileImage}>
                            <Image style={styles.profileImg} src={
                                curratedSolution?.user?.profile
                                    ? `${imageBaseUrl}/${curratedSolution?.user?.profile}`
                                    : "../../../assets/img/faces/profile.jpg"
                            }
                            />
                            <View style={styles.profDetails}>
                                <UserDetail icon="person" text={curratedSolution?.user?.name}/>
                                <UserDetail icon="address" text={curratedSolution?.user?.address}/>
                                <UserDetail icon="phone" text={curratedSolution?.user?.phoneNumber}/>
                                <UserDetail icon="email" text={curratedSolution?.user?.email}/>
                                <UserDetail icon="calendar"
                                            text={`${moment(curratedSolution?.user?.createdAt).format("DD MMMM YYYY [à] HH:mm")} (Date d'inscription)`}/>
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text>Détails de la solution</Text>
                            </View>
                            <View style={{marginBottom: 10}}>
                                <Text style={styles.label}>Description:</Text>
                                <Text style={styles.text}>{curratedSolution?.description}</Text>
                            </View>
                            <View style={{marginBottom: 10}}>
                                <Text style={styles.label}>{"Thématique"}:</Text>
                                <Text style={styles.text}>{curratedSolution?.thematic?.name}</Text>
                            </View>
                            <View style={{marginBottom: 10}}>
                                <Text style={styles.label}>{"Défis"} : </Text>
                                {curratedSolution?.challenges.map((challenge, index) => (
                                    <Text key={index} style={styles.text}>
                                        {challenge?.name}
                                    </Text>
                                ))}
                            </View>

                            <View style={{marginBottom: 10}}>
                                <Text style={styles.label}>{"Date de soumission"}:</Text>
                                <Text style={styles.text}>
                                    {`Le ${moment(curratedSolution?.createdAt).format("DD MMMM YYYY [à] HH:mm")} (Date d'inscription)`}
                                </Text>
                            </View>

                            <View style={{marginBottom: 10}}>
                                {curratedSolution?.videoLink && (
                                    <>
                                        <Text style={styles.label}>{"Lien Vidéo"} : </Text>
                                        <Text style={styles.text}>
                                            {curratedSolution?.videoLink}
                                        </Text>
                                    </>
                                )}
                            </View>

                            <View>
                                {imageLinks?.length > 0 && imageLinks[0].link !== null
                                    ? (isValidImageFound = imageLinks.some((imageLink) =>
                                        isImageValid(imageLink.link)
                                    ))
                                    : (isValidImageFound = false)}

                                {isValidImageFound ? (
                                    <>
                                        <Text style={styles.label}>{"Image(s)"} : </Text>
                                        <View style={{display: "flex", flexDirection: "row", marginTop: 5}}>
                                            {imageLinks
                                                .filter(
                                                    (imageLink) =>
                                                        imageLink &&
                                                        imageLink.link &&
                                                        isImageValid(imageLink.link)
                                                )
                                                .map((imageLink, index) => (
                                                    <View style={{
                                                        border: "1px solid #ccc",
                                                        borderRadius: 5,
                                                        marginRight: 10
                                                    }} key={index}>
                                                        <Image
                                                            src={`${imageBaseUrl}/${imageLink.link}`}
                                                            style={{height: "150", width: "150"}}
                                                        />
                                                    </View>
                                                ))}
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        {/*<Carousel.Item className="">*/}
                                        {/*    <img*/}
                                        {/*        alt="img"*/}
                                        {/*        className="d-block w-100"*/}
                                        {/*        src={"../../../assets/img/photos/18.jpg"}*/}
                                        {/*    />*/}
                                        {/*</Carousel.Item>*/}

                                    </>
                                )}

                            </View>

                        </View>

                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

GenerateCurratedSolutionPdf.propTypes = {};

GenerateCurratedSolutionPdf.defaultProps = {};

GenerateCurratedSolutionPdf.layout = "Contentlayout";

export default GenerateCurratedSolutionPdf;
