import React from 'react';
import tinycolor from "tinycolor2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

const GenerateDoughnoutChart = ({ solutions, thematiques, graphiqueId }) => {

    let DoughnutData;

    if(solutions && thematiques && graphiqueId) {
        const countSolutionsByThematic = () => {
            const solutionsCountByThematic = thematiques?.reduce((acc, thematic) => {
                acc[thematic.name] = 0;
                return acc;
            }, {});

            solutions.forEach((solution) => {
                const thematicName = solution.thematic.name;
                solutionsCountByThematic[thematicName]++;
            });

            return Object.values(solutionsCountByThematic);
        };

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

        const countSolutions = countSolutionsByThematic();

        const filteredData = countSolutions.filter((value) => value !== 0);

        const filteredLabels = thematiques.map((thematic) => thematic.name).filter((_, index) => countSolutions[index] !== 0);

        DoughnutData = {
            labels: filteredLabels,
            datasets: [
                {
                    data: filteredData,
                    backgroundColor: filteredLabels.map((_, index) => getThematicColor(index)),
                },
            ],
        };
    }

    return (
        <>
            {solutions && thematiques && graphiqueId && (
                <Doughnut
                    data={DoughnutData}
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
                                formatter: (value) => {
                                    return value;
                                },
                            },
                        },
                        responsive: true,
                    }}
                    plugins={[ChartDataLabels]}
                />
            )}
        </>
    );

};

export default GenerateDoughnoutChart;
