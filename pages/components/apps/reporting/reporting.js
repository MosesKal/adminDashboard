import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { Col, Row, Button } from "react-bootstrap";
import GenerateCurratedSolutionsPdf from "@/pages/components/apps/reporting/generateCurratedSolutionsPdf";
import axios from "@/pages/api/axios";
import GenerateDoughnoutChart from "@/pages/components/apps/reporting/generateDoughnutChart";
import GenerateStatsCharts from "@/pages/components/apps/reporting/generateStatsCharts";
import LoaderPdf from "@/pages/components/apps/reporting/loaderPdf";


const Reporting = ({ curratedSolutions, conformedSolutions, solutions }) => {

    const [thematiques, setThematiques] = useState([]);

    const [chartImageConformedSolutions, setChartImageConformedSolutions] = useState();
    const [tabImageConformedSolutions, setTabImageConformedSolutions] = useState();

    const [chartImageCurratedSolutions, setChartImageCurratedSolutions] = useState();
    const [tabImageCurratedSolutions, setTabImageCurratedSolutions] = useState();

    const [chartImageAllSolutions, setChartImageAllSolutions] = useState();
    const [isLoading, setIsLoading] = useState(false);


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

    const captureTableImageCuratedSolutions = () => {
        const table = document.getElementById("tab-curated-solutions");
        html2canvas(table)
            .then(canvas => {
                const tableImage = canvas.toDataURL("image/png");
                setTabImageCurratedSolutions(tableImage);
            })
            .catch(error => {
                console.error('Error capturing table image:', error);
            });
    };

    const handleGenerateCuratedSolutionsImage = () => {
        setIsLoading(true);
        captureCuratedImageSolutions();
        const tableImage = captureTableImageCuratedSolutions();
        setTabImageCurratedSolutions(tableImage);
    };

    const handleGenerateStatsChartsImage = () => {
        setIsLoading(true);
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
            {isLoading && <LoaderPdf />}
            {!isLoading && solutions && curratedSolutions && conformedSolutions && (
                <>
                    <Row className="mb-3">
                        <Col xs={12} md={4}>
                            <h3 className="text-center p-2">Solution(s) curée(s)</h3>
                            <GenerateDoughnoutChart
                                thematiques={thematiques}
                                graphiqueId={"doughnut-chart-curated-solutions"}
                                tabId={"tab-curated-solutions"}
                                solutions={curratedSolutions}
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <h3 className="text-center p-2">Solution(s) conforme(s)</h3>
                            <GenerateDoughnoutChart
                                thematiques={thematiques}
                                graphiqueId={"doughnut-chart-conformed-solutions"}
                                solutions={conformedSolutions}
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <h3 className="text-center p-2">Toutes les Solutions</h3>
                            <GenerateDoughnoutChart
                                thematiques={thematiques}
                                graphiqueId={"doughnut-chart-all-solutions"}
                                solutions={solutions}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={4}>
                            <div className="text-center">
                                <Button onClick={handleGenerateCuratedSolutionsImage}>Générer</Button>
                            </div>
                        </Col>
                        <Col xs={12} md={8}>
                            <div className="text-center">
                                <Button onClick={handleGenerateStatsChartsImage}>Générer</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={4}>
                            <GenerateCurratedSolutionsPdf curratedSolutions={curratedSolutions} chartImage={chartImageCurratedSolutions} isCuratedSolution={true} tabImage={tabImageCurratedSolutions}/>
                        </Col>
                        <Col xs={12} md={8}>
                            <GenerateStatsCharts chartImageConformedSolutions={chartImageConformedSolutions} chartImageCurratedSolutions={chartImageCurratedSolutions} chartImageAllSolutions={chartImageAllSolutions}/>
                        </Col>
                    </Row>
                </>
            )}
        </>

    );
};

export default Reporting;
