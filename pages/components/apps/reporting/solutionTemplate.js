import React, { useEffect, useState } from "react";
import { Document, Page, PDFViewer, Text, View } from "@react-pdf/renderer";
import { Col } from "react-bootstrap";
import axios from "@/pages/api/axios";

import { styles } from "@/pages/services/services.reporting";
import SolutionDetail from "@/pages/components/apps/reporting/componentReporting/solutionDetail";
import InnovateurDetail from "@/pages/components/apps/reporting/componentReporting/innovateurDetail";
import CuratorDetail from "@/pages/components/apps/reporting/componentReporting/curatorDetail";
import NotationCurator from "@/pages/components/apps/reporting/componentReporting/notationCurator";
import StatCuration from "@/pages/components/apps/reporting/componentReporting/statCuration";
import HeaderReport from "@/pages/components/apps/reporting/componentReporting/headerReport";

const SolutionTemplate = ({ solutions, chartImage, isCuratedSolution }) => {

    const [enhancedSolutions, setEnhancedSolutions] = useState([]);
    const [quotations, setQuotations] = useState();

    useEffect(() => {
        const fetchCuratorsInfo = async () => {
            if (isCuratedSolution) {
                const enhancedData = await Promise.all(solutions.map(async (solution) => {
                    try {
                        const curatorInfoResponse = await axios.get(`/users/${solution.feedbacks[0]?.userId}`);

                        const poleResponse = await axios.get(`/poles/${curatorInfoResponse?.data?.data?.poleId}`);
                        const organisationResponse = await axios.get(`/organisations/${curatorInfoResponse?.data?.data?.organisationId}`);
                        return {
                            ...solution, curatorInfo: {
                                ...curatorInfoResponse.data,
                                pole: poleResponse.data,
                                organisation: organisationResponse.data
                            }
                        };
                    } catch (error) {
                        console.log("Error fetching curator info:", error);
                        return solution;
                    }
                }));
                setEnhancedSolutions(enhancedData);
            }
        };
        const fetchQuotations = async () => {
            if(isCuratedSolution){
                try {
                    const responseQuotations = await axios.get("/quotations")
                    setQuotations(responseQuotations?.data?.data.map((quotation) => {
                        return { id: quotation.id, average: quotation.average, mention: quotation.mention }
                    }))
                } catch (e) {
                    console.log(e)
                }
            }
        }

        fetchCuratorsInfo();

        fetchQuotations();

    }, [solutions, isCuratedSolution]);

    return (
        <Col>
            <PDFViewer width="100%" height="600px">
                <Document>
                    <StatCuration solutions={enhancedSolutions} chartImage={chartImage} isCuratedSolution={isCuratedSolution} />
                    {
                        (isCuratedSolution ? enhancedSolutions : solutions).map((solution, index) =>
                            (
                                <Page key={index} style={styles.page}>
                                    <HeaderReport />
                                    <View style={styles.section}>
                                        <Text style={styles.heading}>{index + 1}. {solution.name}</Text>

                                        <InnovateurDetail solution={solution} />

                                        <SolutionDetail solution={solution} hiddenDetails={true} />

                                        {isCuratedSolution && <CuratorDetail solution={solution} />}

                                        {isCuratedSolution && <NotationCurator solution={solution} quotations={quotations} />}

                                    </View>
                                </Page>
                            )
                        )
                    }
                </Document>
            </PDFViewer>
        </Col>
    );
};

SolutionTemplate.propTypes = {};

SolutionTemplate.defaultProps = {};

SolutionTemplate.layout = "Contentlayout";

export default SolutionTemplate;
