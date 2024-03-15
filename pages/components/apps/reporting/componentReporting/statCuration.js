import React, {useEffect} from 'react'
import axios from "@/pages/api/axios";
import {Chart} from "chart.js";
import {chartToImage, styles} from "@/pages/services/services.reporting";
import tinycolor from "tinycolor2";
import {Page, Text, View} from "@react-pdf/renderer";
const generateStatistics = ({solutions}) => {

    if(solutions){
        console.log(solutions);
    }
    // const totalSolutions = solutions.length;

    // const solutionsByPoles = enhancedSolutions.reduce((acc, solution) => {
    //     const poleName = solution.curatorInfo.pole.data.name;
    //     acc[poleName] = (acc[poleName] || 0) + 1;
    //     return acc;
    // }, {});
    //
    // const totalOrganisations = new Set(enhancedSolutions.map(solution => solution.curatorInfo.organisation.data.name)).size;
    //
    // const polesByOrganisations = enhancedSolutions.reduce((acc, solution) => {
    //     const organisationName = solution.curatorInfo.organisation.data.name;
    //     const poleName = solution.curatorInfo.pole.data.name;
    //     acc[organisationName] = (acc[organisationName] || new Set()).add(poleName);
    //     return acc;
    // }, {});

    // return {
    //     totalSolutions,
    //     // solutionsByPoles,
    //     // totalOrganisations,
    //     // polesByOrganisations
    // };
};

const StatCuration = ({solutions}) => {



    if(solutions.length !== 0){
        generateStatistics(solutions);
    }

    // const countSolutionsByThematic = () => {
    //
    //     const solutionsCountByThematic = thematiqueData?.reduce((acc, thematic) => {
    //         acc[thematic.name] = 0;
    //         return acc;
    //     }, {});
    //
    //     solutions.forEach((solution) => {
    //         const thematicName = solution?.thematic.name;
    //         solutionsCountByThematic[thematicName]++;
    //     });
    //
    //     return Object.values(solutionsCountByThematic);
    // };
    // const getDefaultColors = () => {
    //     return ["#6d26be", "#ffbd5a", "#027333", "#4ec2f0", "#1a9c86"];
    // };
    // const getThematicColor = (index) => {
    //     const defaultColors = getDefaultColors();
    //     const defaultColor = "#a0a0a0";
    //
    //     if(thematiqueData[index]?.color) {
    //         return thematiqueData[index].color;
    //     }
    //
    //     const color = defaultColors[index % defaultColors.length] || defaultColor;
    //
    //     return tinycolor(color).toString();
    // };

    // useEffect(() => {
    //     if (chartReady) {
    //         chartToImage(document.getElementById('chartContainer'))
    //             .then((dataUrl) => {
    //                 console.log(dataUrl);
    //             })
    //             .catch((error) => {
    //                 console.error('Erreur lors de la conversion du graphique en image :', error);
    //             });
    //     }
    // }, [chartReady]);

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
