import React, {useEffect, useState, useRef} from "react";
import {Document, Page, Text, View, StyleSheet, PDFViewer, Image} from "@react-pdf/renderer";
import {Col, Row} from "react-bootstrap";
import moment from "moment";
import axios from "@/pages/api/axios";
import tinycolor from "tinycolor2";
import {Chart} from "chart.js";
import htmlToImage from "html-to-image";


const imagePath = "../../../../assets/img/faces/";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column", padding: 20,
    }, section: {
        margin: 10, padding: 10, flexGrow: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5,
    }, heading: {
        fontSize: 20, marginBottom: 10, color: "#333", textDecoration: "underline"
    }, label: {
        fontSize: 12, fontWeight: "bold", marginBottom: 5, color: "#666",
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

const generateStatistics = ({enhancedSolutions}) => {

    const totalSolutions = enhancedSolutions.length;

    const solutionsByPoles = enhancedSolutions.reduce((acc, solution) => {
        const poleName = solution.curatorInfo.pole.data.name;
        acc[poleName] = (acc[poleName] || 0) + 1;
        return acc;
    }, {});

    const totalOrganisations = new Set(enhancedSolutions.map(solution => solution.curatorInfo.organisation.data.name)).size;

    const polesByOrganisations = enhancedSolutions.reduce((acc, solution) => {
        const organisationName = solution.curatorInfo.organisation.data.name;
        const poleName = solution.curatorInfo.pole.data.name;
        acc[organisationName] = (acc[organisationName] || new Set()).add(poleName);
        return acc;
    }, {});

    return {totalSolutions, solutionsByPoles, totalOrganisations, polesByOrganisations};
};

const chartToImage = (chart) => {
    return new Promise((resolve, reject) => {
        htmlToImage.toPng(chart.canvas)
            .then((dataUrl) => {
                resolve(dataUrl);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const Reporting = ({curratedSolutions}) => {

    const [enhancedSolutions, setEnhancedSolutions] = useState([]);
    const [quotations, setQuotations] = useState();
    const [thematiqueData, setThematiqueData] = useState([]);
    const [chartReady, setChartReady] = useState(false);
    const chartContainerRef = useRef(null);
    const criteria = [
        'Pertinence par rapport aux ODD/thématique',
        'Impact local',
        'Innovation',
        'Échelle de mise en œuvre',
    ];


    useEffect(() => {
        const fetchCuratorsInfo = async () => {
            const enhancedData = await Promise.all(curratedSolutions.map(async (solution) => {
                try {
                    const curatorInfoResponse = await axios.get(`/users/${solution.feedbacks[0]?.userId}`);

                    const poleResponse = await axios.get(`/poles/${curatorInfoResponse?.data?.data?.poleId}`);
                    const organisationResponse = await axios.get(`/organisations/${curatorInfoResponse?.data?.data?.organisationId}`);
                    const enhancedSolution = {
                        ...solution, curatorInfo: {
                            ...curatorInfoResponse.data,
                            pole: poleResponse.data,
                            organisation: organisationResponse.data
                        }
                    };
                    return enhancedSolution;
                } catch (error) {
                    console.log("Error fetching curator info:", error);
                    return solution;
                }
            }));
            setEnhancedSolutions(enhancedData);
        };
        const fetchQuotations = async () => {
            try {
                const responseQuotations = await axios.get("/quotations")
                setQuotations(responseQuotations?.data?.data.map((quotation) => {
                    return {id: quotation.id, average: quotation.average, mention: quotation.mention}
                }))
            } catch (e) {
                console.log(e)
            }
        }
        const fetchThematiqueData = async () => {
            try {
                const response = await axios.get("/thematics");
                setThematiqueData(response.data.data);
            } catch (err) {
                console.error("Error fetching thematique data:", err);
            }
        };

        const DoughnutData = {
            labels: thematiqueData?.map((thematic) => thematic.name),
            datasets: [
                {
                    data: countSolutionsByThematic(),
                    backgroundColor: thematiqueData?.map((thematic, index) =>
                        getThematicColor(index)
                    ),
                },
            ],
        };


        const doughnutChart = new Chart(chartContainerRef.current, {
            type: "doughnut",
            data: DoughnutData,
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                        align: "start",
                    },
                },
                responsive: true,
                animation: {
                    onComplete: () => {
                        setChartReady(true);
                    },
                },
            },
        });

        fetchCuratorsInfo();
        fetchQuotations();
        fetchThematiqueData();

        return () => {
            doughnutChart.destroy();
        };

    }, [curratedSolutions]);


    const statistics = generateStatistics({enhancedSolutions});
    const countSolutionsByThematic = () => {

        const solutionsCountByThematic = thematiqueData?.reduce((acc, thematic) => {
            acc[thematic.name] = 0;
            return acc;
        }, {});

        enhancedSolutions.forEach((solution) => {
            const thematicName = solution?.thematic.name;
            solutionsCountByThematic[thematicName]++;
        });

        return Object.values(solutionsCountByThematic);
    };

    const getDefaultColors = () => {
        return ["#6d26be", "#ffbd5a", "#027333", "#4ec2f0", "#1a9c86"];
    };

    const getThematicColor = (index) => {
        const defaultColors = getDefaultColors();
        const defaultColor = "#a0a0a0";

        if (thematiqueData[index]?.color) {
            return thematiqueData[index].color;
        }

        const color = defaultColors[index % defaultColors.length] || defaultColor;

        return tinycolor(color).toString();
    };


    useEffect(() => {
        if (chartReady) {
            chartToImage(document.getElementById('chartContainer'))
                .then((dataUrl) => {
                    // Utiliser l'URL de l'image dans votre application
                    console.log(dataUrl); // À remplacer par votre utilisation réelle
                })
                .catch((error) => {
                    console.error('Erreur lors de la conversion du graphique en image :', error);
                });
        }
    }, [chartReady]);


    return (<Row>
        <Col>

            <PDFViewer width="100%" height="600px">
                <Document>

                    <Page style={styles.page}>
                        <View style={styles.section}>
                            <Text style={styles.heading}>Statistiques</Text>
                            <Text
                                style={styles.text}>{"Nombre total de solutions curées"} : {statistics.totalSolutions}</Text>
                            <Text
                                style={styles.text}>{"Nombre total d'organisations"} : {statistics.totalOrganisations}</Text>

                            {Object.entries(statistics.solutionsByPoles).map(([pole, count]) => (
                                <Text key={pole} style={styles.text}>Nombre de solutions pour le
                                    pôle {pole} : {count}</Text>
                            ))}

                            {Object.entries(statistics.polesByOrganisations).map(([organisation, poles]) => (
                                <Text key={organisation}
                                      style={styles.text}>{"Nombre de pôles pour l'organisation"} {organisation} : {poles.size}</Text>
                            ))}
                        </View>


                        <canvas id="chartContainer" ref={chartContainerRef}/>

                    </Page>

                    {enhancedSolutions.map((solution, index) => (<Page key={index} style={styles.page}>
                        {/*<ExampleSvg/>*/}
                        <View style={styles.section}>
                            <Text style={styles.heading}>{index + 1}. {solution.name}</Text>
                            <View>
                                <Text>{"Informations de l'innovateur"}</Text>
                            </View>
                            <View style={styles.profileImage}>
                                <Image style={styles.profileImg} src={"../../../../assets/img/faces/profile.jpg"}/>
                                <View style={styles.profDetails}>
                                    <UserDetail icon="person" text={solution.user.name}/>
                                    <UserDetail icon="address" text={solution.user.address}/>
                                    <UserDetail icon="phone" text={solution.user.phoneNumber}/>
                                    <UserDetail icon="email" text={solution.user.email}/>
                                    <UserDetail icon="calendar"
                                                text={`${moment(solution.user.createdAt).format("DD MMMM YYYY [à] HH:mm")} (Date d'inscription)`}/>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text>Détails de la solution</Text>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    <Text style={styles.label}>Description:</Text>
                                    <Text style={styles.text}>{solution.description}</Text>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    <Text style={styles.label}>Thème:</Text>
                                    <Text style={styles.text}>{solution.thematic.name}</Text>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    <Text style={styles.label}>Challenges:</Text>
                                    {solution.challenges.map((challenge, index) => (
                                        <Text key={index} style={styles.text}>
                                            {challenge.name}
                                        </Text>))}
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text>Informations du Curateur</Text>
                                </View>
                                <View style={styles.curatorContainer}>
                                    <View style={styles.curatorContainerBloc}>
                                        <View style={styles.textIconCurator}>
                                            <View style={styles.iconCuratorContainer}>
                                                <Image src={`${imagePath}person.png`}
                                                       style={styles.iconCurator}/>
                                            </View>
                                            <View>
                                                <Text
                                                    style={styles.text}>{solution.curatorInfo.data.name}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.textIconCurator}>
                                            <View style={styles.iconCuratorContainer}>
                                                <Image src={`${imagePath}email.png`}
                                                       style={styles.iconCurator}/>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text
                                                    style={styles.text}>{solution.curatorInfo.data.email}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.textIconCurator}>
                                            <View style={styles.iconCuratorContainer}>
                                                <Image src={`${imagePath}phone.png`}
                                                       style={styles.iconCurator}/>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text
                                                    style={styles.text}>{solution.curatorInfo.data.phoneNumber}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.curatorContainerBlocTow}>
                                        <View style={styles.textIconCurator}>
                                            <View style={styles.iconCuratorContainer}>
                                                <Image src={`${imagePath}organisation.png`} style={styles.iconCurator}/>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text
                                                    style={styles.text}>{solution.curatorInfo.organisation.data.name}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.textIconCurator}>
                                            <View style={styles.iconCuratorContainer}>
                                                <Image src={`${imagePath}pole.png`} style={styles.iconCurator}/>
                                            </View>
                                            <View style={styles.textContainer}>
                                                <Text
                                                    style={styles.text}>{solution.curatorInfo.pole.data.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.heading}>Côte</Text>
                                {solution.feedbacks[0]?.quotations.split(',').map((quotationId, index) => {
                                    const quotation = quotations.find(q => q.id === Number(quotationId.trim()));
                                    return (
                                        <View key={index} style={styles.quotationContainer}>
                                            <Text style={styles.quotationLabel}>{criteria[index]} : </Text>
                                            <Text style={styles.quotationLabel}>{quotation?.mention} - </Text>
                                            <Text style={styles.quotationValue}>{quotation?.average}</Text>
                                        </View>
                                    );
                                })}
                                <View style={styles.totalPercentageContainer}>
                                    <Text style={styles.label}>Pourcentage total : </Text>
                                    <Text style={styles.text}>
                                        {solution.feedbacks[0]?.quotations.split(',').reduce((total, quotationId) => {
                                            const quotation = quotations.find(q => q.id === Number(quotationId.trim()));
                                            return total + quotation?.average;
                                        }, 0) / 40 * 100}%
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Page>))}
                </Document>
            </PDFViewer>
        </Col>

    </Row>);
};
export default Reporting;