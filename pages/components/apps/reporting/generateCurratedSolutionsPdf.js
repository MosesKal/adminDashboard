import React, {useEffect, useState, useRef} from "react";
import {Document, Page, Text, View, PDFViewer} from "@react-pdf/renderer";
import {Col, Row} from "react-bootstrap";
import axios from "@/pages/api/axios";
import tinycolor from "tinycolor2";
import {Chart} from "chart.js";
import {styles} from "@/pages/services/services.reporting";
import SolutionDetail from "@/pages/components/apps/reporting/componentReporting/solutionDetail";
import InnovateurDetail from "@/pages/components/apps/reporting/componentReporting/innovateurDetail";
import CuratorDetail from "@/pages/components/apps/reporting/componentReporting/curatorDetail";
import NotationCurator from "@/pages/components/apps/reporting/componentReporting/notationCurator";
import StatCuration from "@/pages/components/apps/reporting/componentReporting/statCuration";


const GenerateCurratedSolutionsPdf = ({curratedSolutions}) => {

    const [enhancedSolutions, setEnhancedSolutions] = useState([]);
    const [quotations, setQuotations] = useState();
    const [thematiqueData, setThematiqueData] = useState([]);

    // const [chartReady, setChartReady] = useState(false);
    // const chartContainerRef = useRef(null);


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


        // const fetchThematiqueData = async () => {
        //     try {
        //         const response = await axios.get("/thematics");
        //         setThematiqueData(response.data.data);
        //     } catch (err) {
        //         console.error("Error fetching thematique data:", err);
        //     }
        // };


        // const doughnutChart = new Chart(chartContainerRef.current, {
        //     type: "doughnut",
        //     data: DoughnutData,
        //     options: {
        //         plugins: {
        //             legend: {
        //                 display: true,
        //                 position: "top",
        //                 align: "start",
        //             },
        //         },
        //         responsive: true,
        //         animation: {
        //             onComplete: () => {
        //                 setChartReady(true);
        //             },
        //         },
        //     },
        // });

        fetchCuratorsInfo();

        fetchQuotations();

        // fetchThematiqueData();

        // return () => {
        //     doughnutChart.destroy();
        // };

    }, [curratedSolutions]);

    console.log("generateCurratedSolutionsPdf=========>", curratedSolutions)


    return (<Row>
        <Col>
            <PDFViewer width="100%" height="600px">
                <Document>

                     <StatCuration solutions={enhancedSolutions}/>

                    {
                        enhancedSolutions.map((solution, index) =>
                            (
                                <Page key={index} style={styles.page}>

                                    <View style={styles.section}>
                                        <Text style={styles.heading}>{index + 1}. {solution.name}</Text>

                                        <InnovateurDetail solution={solution}/>

                                        <SolutionDetail solution={solution}/>

                                        <CuratorDetail solution={solution}/>

                                        <NotationCurator solution={solution} quotations={quotations}/>

                                    </View>
                                </Page>
                            )
                        )
                    }
                </Document>
            </PDFViewer>
        </Col>
    </Row>);
};

GenerateCurratedSolutionsPdf.propTypes = {};

GenerateCurratedSolutionsPdf.defaultProps = {};

GenerateCurratedSolutionsPdf.layout = "Contentlayout";

export default GenerateCurratedSolutionsPdf;
