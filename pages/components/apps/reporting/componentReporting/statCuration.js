import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assurez-vous d'avoir correctement configuré Axios dans votre application
import { Page, Text, View } from '@react-pdf/renderer';
import { Chart } from 'chart.js';
import { chartToImage, styles } from '@/pages/services/services.reporting'; // Assurez-vous que le chemin d'importation est correct
import tinycolor from 'tinycolor2';
import htmlToImage from 'html-to-image';

const StatCuration = ({ solutions }) => {
    const [statDataCuration, setStatDataCuration] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const generateStatData = () => {
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
        };

        generateStatData();
    }, [solutions]);

    console.log('statDataCuration', statDataCuration);

    return (
        <Page style={styles.page}>
            {!loading && statDataCuration.totalSolutions > 0 ? (
                <View style={styles.section}>
                    <Text style={styles.heading}>Statistiques</Text>
                    <Text style={styles.text}>Nombre total de solutions curées : {statDataCuration.totalSolutions}</Text>
                    <Text style={styles.text}>Nombre total d'organisations : {statDataCuration.totalOrganisations}</Text>

                    {Object.entries(statDataCuration.solutionsByPoles).map(([pole, count]) => (
                        <Text key={pole} style={styles.text}>
                            Nombre de solutions pour le pôle {pole} : {count}
                        </Text>
                    ))}
                    {Object.entries(statDataCuration.polesByOrganisations).map(([organisation, poles]) => (
                        <Text key={organisation} style={styles.text}>
                            Nombre de pôles pour l'organisation {organisation} : {poles.size}
                        </Text>
                    ))}
                </View>
            ) : (
                <View>
                    <Text style={styles.heading}>Statistiques</Text>
                    <Text style={styles.text}>Aucune donnée disponible</Text>
                </View>
            )}
        </Page>
    );
};

export default StatCuration;
