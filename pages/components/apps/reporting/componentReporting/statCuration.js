import React, {useEffect} from 'react'
import axios from "@/pages/api/axios";
import {Chart} from "chart.js";
import {chartToImage, styles} from "@/pages/services/services.reporting";
import tinycolor from "tinycolor2";
import {Page, Text, View} from "@react-pdf/renderer";
import htmlToImage from "html-to-image";


const StatCuration = ({solutions}) => {



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

        return (
            <>
                <Page style={styles.page}>
                    {/*<View style={styles.section}>*/}
                    {/*    <Text style={styles.heading}>Statistiques</Text>*/}
                    {/*    <Text*/}
                    {/*        style={styles.text}>{"Nombre total de solutions curées"} : {statistics?.totalSolutions}</Text>*/}
                    {/*    <Text*/}
                    {/*        style={styles.text}>{"Nombre total d'organisations"} : {statistics?.totalOrganisations}</Text>*/}

                    {/*    {Object?.entries(statistics?.solutionsByPoles).map(([pole, count]) => (*/}
                    {/*        <Text key={pole} style={styles.text}>Nombre de solutions pour le*/}
                    {/*            pôle {pole} : {count}</Text>*/}
                    {/*    ))}*/}
                    {/*    {*/}
                    {/*        Object.entries(statistics.polesByOrganisations).map(([organisation, poles]) => (*/}
                    {/*            <Text key={organisation}*/}
                    {/*                  style={styles.text}>{"Nombre de pôles pour l'organisation"} {organisation} : {poles.size}</Text>*/}
                    {/*        ))}*/}
                    {/*</View>*/}
                    {/*<canvas id="chartContainer" ref={chartContainerRef}/>*/}
                </Page>
            </>
        )
    }
    export default StatCuration
