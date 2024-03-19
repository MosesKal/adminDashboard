import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import GenerateCurratedSolutionsPdf from "@/pages/components/apps/reporting/generateCurratedSolutionsPdf";
import axios from "@/pages/api/axios";
import GenerateDoughnoutChart from "@/pages/components/apps/reporting/generateDoughnutChart";
import GenerateStatsCharts from "@/pages/components/apps/reporting/generateStatsCharts";
import LoaderPdf from "@/pages/components/apps/reporting/loaderPdf";


const Reporting = ({ curratedSolutions, conformedSolutions, solutions }) => {
    const [thematiques, setThematiques] = useState([]);
    const [chartImageConformedSolutions, setChartImageConformedSolutions] = useState();
    const [chartImageCurratedSolutions, setChartImageCurratedSolutions] = useState();
    const [chartImageAllSolutions, setChartImageAllSolutions] = useState();
    const [isLoading, setIsLoading] = useState(false); // Ajouter un état pour contrôler l'affichage du loader

    useEffect(() => {
        const fetchThematiqueData = async () => {
            try {
                const response = await axios.get("/thematics");
                setThematiques(response.data.data);
            } catch (err) {
                console.error("Error fetching thematique data:", err);
            }
        };

        fetchThematiqueData();
    }, []);

    const handleGenerateCuratedSolutionsImage = () => {
        setIsLoading(true); // Afficher le loader lorsque le bouton est cliqué
        captureCuratedImageSolutions();
    };

    const handleGenerateStatsChartsImage = () => {
        setIsLoading(true); // Afficher le loader lorsque le bouton est cliqué
        captureChartImageConformedSolutions();
        captureCuratedImageSolutions();
        captureAllImageSolutions();
    };

    const captureChartImageConformedSolutions = () => {
        const canvas = document.getElementById("doughnut-chart-conformed-solutions");
        const chartImage = canvas.toDataURL("image/png");
        setChartImageConformedSolutions(chartImage);
        setIsLoading(false)
    };

    const captureCuratedImageSolutions = () => {
        const canvas = document.getElementById("doughnut-chart-curated-solutions");
        const chartImage = canvas.toDataURL("image/png");
        setChartImageCurratedSolutions(chartImage);
        setIsLoading(false)
    };

    const captureAllImageSolutions = () => {
        const canvas = document.getElementById("doughnut-chart-all-solutions");
        const chartImage = canvas.toDataURL("image/png");
        setChartImageAllSolutions(chartImage);
        setIsLoading(false)
    };

    return (
        <>
            {isLoading && <LoaderPdf />} {/* Afficher le loader si isLoading est true */}
            {!isLoading && solutions && curratedSolutions && conformedSolutions && (
                <>
                    <Row>
                        <Col>
                            <h3 className={"text-center p-2"}>{"Solution(s) curée(s)"}</h3>
                            <GenerateDoughnoutChart
                                thematiques={thematiques}
                                graphiqueId={"doughnut-chart-curated-solutions"}
                                solutions={curratedSolutions}
                            />
                        </Col>
                        <Col>
                            <h3 className={"text-center p-2"}>{"Solution(s) conforme(s)"}</h3>
                            <GenerateDoughnoutChart
                                thematiques={thematiques}
                                graphiqueId={"doughnut-chart-conformed-solutions"}
                                solutions={conformedSolutions}
                            />
                        </Col>
                        <Col>
                            <h3 className={"text-center p-2"}>{"Toutes les Solutions"}</h3>
                            <GenerateDoughnoutChart
                                thematiques={thematiques}
                                graphiqueId={"doughnut-chart-all-solutions"}
                                solutions={solutions}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
                                <Button onClick={handleGenerateCuratedSolutionsImage}>{"Générer le rapport de la curation"}</Button>
                            </div>
                        </Col>
                        <Col xl={8}>
                            <div style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
                                <Button onClick={handleGenerateStatsChartsImage}>{"Générer le rapport de la répartition des solutions par thématique"}</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <GenerateCurratedSolutionsPdf curratedSolutions={curratedSolutions} chartImage={chartImageCurratedSolutions} isCuratedSolution={true} />
                        </Col>
                        <Col xl={8}>
                            <GenerateStatsCharts
                                chartImageConformedSolutions={chartImageConformedSolutions}
                                chartImageCurratedSolutions={chartImageCurratedSolutions}
                                chartImageAllSolutions={chartImageAllSolutions}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default Reporting;
