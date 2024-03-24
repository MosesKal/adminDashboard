import React, {useMemo} from 'react';
import tinycolor from "tinycolor2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Doughnut} from "react-chartjs-2";
import {Table} from "reactstrap";
import {Col, Row} from "react-bootstrap";

const GenerateDoughnutChart = ({solutions, thematiques, graphiqueId, tabId}) => {

    const countSolutionsByThematic = useMemo(() => {
        const solutionsCountByThematic = thematiques?.reduce((acc, thematic) => {
            acc[thematic.name] = 0;
            return acc;
        }, {});

        solutions?.forEach((solution) => {
            const thematicName = solution.thematic.name;
            solutionsCountByThematic[thematicName]++;
        });

        return solutionsCountByThematic;
    }, [solutions, thematiques]);

    const doughnutData = useMemo(() => {
        if (solutions && thematiques && graphiqueId) {
            const getThematicColor = (index) => {
                const defaultColors = getDefaultColors();
                const defaultColor = "#a0a0a0";

                if (thematiques[index]?.color) {
                    return thematiques[index].color;
                }

                const color = defaultColors[index % defaultColors.length] || defaultColor;

                return tinycolor(color).toString();
            };

            const getDefaultColors = () => {
                return ["#6d26be", "#ffbd5a", "#027333", "#4ec2f0", "#1a9c86"];
            };

            const countSolutions = Object.values(countSolutionsByThematic);
            const filteredData = countSolutions.filter((value) => value !== 0);
            const filteredLabels = thematiques.map((thematic) => thematic.name).filter((_, index) => countSolutions[index] !== 0);

            return {
                labels: filteredLabels,
                datasets: [
                    {
                        data: filteredData,
                        backgroundColor: filteredLabels.map((_, index) => getThematicColor(index)),
                    },
                ],
            };
        }
        return null;
    }, [solutions, thematiques, graphiqueId, countSolutionsByThematic]);

    const totalSolutions = useMemo(() => {
        return Object.values(countSolutionsByThematic).reduce((acc, val) => acc + val, 0);
    }, [countSolutionsByThematic]);

    return (

        <Row className="flex-column ">
            <Col  >
                {doughnutData && (
                    <Doughnut
                        data={doughnutData}
                        id={graphiqueId}
                        className="chartjs-render-monitor"
                        options={{
                            plugins: {
                                legend: {
                                    display: true,
                                    position: "top",
                                    align: "start",
                                },
                                labels: {
                                    render: "label",
                                    display: true,
                                    font: {
                                        size: 14,
                                    },
                                },
                                datalabels: {
                                    color: "#ffffff",
                                    font: {
                                        size: 12,
                                    },
                                    formatter: (value) => value,
                                },
                            },
                            responsive: true,
                        }}
                        plugins={[ChartDataLabels]}
                    />
                )}
            </Col>
            <Col className={"mt-5"} >
                <Table striped bordered hover responsive id={tabId}>
                    <thead>
                    <tr>
                        <th>Thématique</th>
                        <th>Nombre</th>
                        <th>%</th>
                    </tr>
                    </thead>
                    <tbody>
                    {thematiques.map((thematic) => (
                        <tr key={thematic.id}>
                            <td>{thematic.name}</td>
                            <td>{countSolutionsByThematic[thematic.name]}</td>
                            <td>{((countSolutionsByThematic[thematic.name] / totalSolutions) * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>{totalSolutions}</strong></td>
                        <td><strong>100%</strong></td>
                    </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default GenerateDoughnutChart;
