import React, { useEffect, useState } from 'react';
import { Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import HeaderReport from "@/pages/components/apps/reporting/componentReporting/headerReport";

const StatCuration = ({ solutions, chartImage, isCuratedSolution }) => {

    const [statDataCuration, setStatDataCuration] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);
        const generateStatData = () => {
            setLoading(true);
            if (isCuratedSolution) {
                const totalSolutions = solutions.length;

                const solutionsByPoles = solutions.reduce((acc, solution) => {
                    const poleName = solution.curatorInfo.pole.data.name;
                    acc[poleName] = (acc[poleName] || 0) + 1;
                    return acc;
                }, {});

                const totalOrganisations = new Set(solutions.map(solution => solution.curatorInfo.organisation.data.name)).size;

                const polesByOrganisations = solutions.reduce((acc, solution) => {
                    const organisationName = solution.curatorInfo.organisation.data.name;
                    const poleName = solution.curatorInfo.pole.data.name;
                    acc[organisationName] = new Set([...(acc[organisationName] || []), poleName]);
                    return acc;
                }, {});

                setStatDataCuration({ totalSolutions, solutionsByPoles, totalOrganisations, polesByOrganisations });
                setLoading(false);
            }
        }

        generateStatData();
    }, [solutions, isCuratedSolution]);

    const styles = StyleSheet.create({
        heading: {
            fontSize: 15, marginBottom: 10, color: "#333", textDecoration: "underline"
        }, text: {
            fontSize: 8, marginBottom: 5, color: "#333",
        }, graphiqueContainer: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }, graphiqueImage: {
            padding: 5
        },
    });

    return (
        <Page style={styles.page}>
            <HeaderReport />
            {isCuratedSolution && !loading && statDataCuration.totalSolutions > 0 ? (
                <>
                    <View style={styles.section}>
                        <Text style={styles.heading}>{"Statistiques"}</Text>
                        <Text style={styles.text}>{"Nombre total de solutions curées"} : {statDataCuration.totalSolutions}</Text>
                        <Text style={styles.text}>{"Nombre total d'organisations"} : {statDataCuration.totalOrganisations}</Text>

                        {Object.entries(statDataCuration.solutionsByPoles).map(([pole, count]) => (
                            <Text key={pole} style={styles.text}>
                                {"Nombre de solutions pour le pôle"} {pole} : {count}
                            </Text>
                        ))}
                        {Object.entries(statDataCuration.polesByOrganisations).map(([organisation, poles]) => (
                            <Text key={organisation} style={styles.text}>
                                {"Nombre de pôles pour l'organisation"} {organisation} : {poles.size}
                            </Text>
                        ))}
                    </View>
                </>
            ) : (
                <View></View>
            )}

            <View style={styles.graphiqueContainer}>
                <View>
                    <Text style={styles.heading}>{"Solution curée par thématique"}</Text>
                </View>
                <View style={styles.graphiqueImage}>
                    {chartImage && <Image src={chartImage} style={{ width: 300, height: 300 }} alt={"stat thematique curation"} />}
                </View>
            </View>
        </Page>
    );
};

export default StatCuration;
