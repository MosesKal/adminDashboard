import React, {useEffect, useState} from "react";
import {Col, Row, Button} from "react-bootstrap";
import GenerateCurratedSolutionsPdf from "@/pages/components/apps/reporting/generateCurratedSolutionsPdf";
import axios from "@/pages/api/axios";
import GenerateDoughnoutChart from "@/pages/components/apps/reporting/generateDoughnutChart";
import GenerateConformsSolutionsPdf from "@/pages/components/apps/reporting/generateConformsSolutionsPdf";
import GenerateAllSolutionsPdf from "@/pages/components/apps/reporting/generateAllSolutionsPdf";


const Reporting = ({curratedSolutions, conformedSolutions, solutions}) => {

    const [thematiques, setThematiques] = useState([]);
    const [chartImageConformedSolutions, setChartImageConformedSolutions] = useState();
    const [chartImageCurratedSolutions, setChartImageCurratedSolutions] = useState();
    const [chartImageAllSolutions, setChartImageAllSolutions] = useState();

    console.log("curratedSolutions", curratedSolutions);
    console.log("conformedSolutions", conformedSolutions);
    console.log("solutions", solutions);



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

    const captureChartImageConformedSolutions = () => {
        const canvas = document.getElementById("doughnut-chart-conformed-solutions");
        const chartImage = canvas.toDataURL("image/png");
        setChartImageConformedSolutions(chartImage);
    };

    const captureCuratedImageSolutions = () => {
        const canvas = document.getElementById("doughnut-chart-curated-solutions");
        const chartImage = canvas.toDataURL("image/png");
        setChartImageCurratedSolutions(chartImage);
    };

    const captureAllImageSolutions = () => {
        const canvas = document.getElementById("doughnut-chart-all-solutions");
        const chartImage = canvas.toDataURL("image/png");
        setChartImageAllSolutions(chartImage);
    };

    const handleGenerateCuratedSolutionsImage= () => {
        captureCuratedImageSolutions();
    };

    const handleGenerateConformedSolutionsImage = () => {
        captureChartImageConformedSolutions();
    }

    const handleGenerateAllSolutionsImage = () => {
        captureAllImageSolutions();
    }

    return (
        <>
            <Row>
                <Col>
                    <h3 className={"text-center p-2"}>{"Solution(s) curée(s)"}</h3>
                    <GenerateDoughnoutChart
                        thematiques={thematiques}
                        graphiqueId={"doughnut-chart-curated-solutions"}
                        solutions={curratedSolutions}
                    />
                    <div style={{textAlign: "center", marginTop: 10, marginBottom: 10}}>
                        <Button onClick={handleGenerateCuratedSolutionsImage}>{"Inserer le graphique dans le document"}</Button>
                    </div>
                </Col>

                <Col>
                    <h3 className={"text-center p-2"}>{"Solution(s) conforme(s)"}</h3>
                    <GenerateDoughnoutChart
                        thematiques={thematiques}
                        graphiqueId={"doughnut-chart-conformed-solutions"}
                        solutions={conformedSolutions}
                    />
                    <div style={{textAlign: "center", marginTop: 10, marginBottom: 10}}>
                        <Button onClick={handleGenerateConformedSolutionsImage}>{"Inserer le graphique dans le document"}</Button>
                    </div>
                </Col>

                <Col>
                    <h3 className={"text-center p-2"}>{"Toutes les Solutions"}</h3>
                    <GenerateDoughnoutChart
                        thematiques={thematiques}
                        graphiqueId={"doughnut-chart-all-solutions"}
                        solutions={solutions}
                    />
                    <div style={{textAlign: "center", marginTop: 10, marginBottom: 10}}>
                        <Button onClick={handleGenerateAllSolutionsImage}>{"Inserer le graphique dans le document"}</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <GenerateCurratedSolutionsPdf  curratedSolutions={curratedSolutions} chartImage={chartImageCurratedSolutions} isCuratedSolution={true}/>
                </Col>
                <Col>
                    <GenerateConformsSolutionsPdf conformsSolutions={conformedSolutions} chartImage={chartImageConformedSolutions} isCuratedSolution={false}/>
                </Col>
                <Col>
                    <GenerateAllSolutionsPdf solutions={solutions} chartImage={chartImageAllSolutions} isCuratedSolution={false}/>
                </Col>
            </Row>
        </>
    );
};

export default Reporting;
