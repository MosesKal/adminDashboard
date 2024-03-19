import React from 'react';
import {Text, View, StyleSheet} from "@react-pdf/renderer";


const CRITERIA = ['Pertinence par rapport aux ODD/thématique', 'Impact local', 'Innovation', 'Échelle de mise en œuvre'];

const NotationCurator = ({solution, quotations}) => {

    const styles = StyleSheet.create({
        section: {
            margin: 10, padding: 10, flexGrow: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5,
        }, quotationContainer: {
            flexDirection: "row", alignItems: "center", marginTop: 5,
        }, quotationLabel: {
            fontSize: 12, fontWeight: "bold", color: "#666", marginRight: 5,
        }, quotationValue: {
            fontSize: 12, color: "#333",
        }, totalPercentageContainer: {
            flexDirection: "row", alignItems: "center", marginTop: 10,
        }, label: {
            fontSize: 12, fontWeight: "bold", color: "#666", marginRight: 5,
        }, text: {
            fontSize: 12, color: "#333",
        },
    });

    return (
        <>
            {solution && quotations && (
                <View style={styles.section}>
                    <Text style={{fontSize: "8", textDecoration: "underline"}}>Notation</Text>
                    {solution.feedbacks[0]?.quotations.split(',').map((quotationId, index) => {
                        const quotation = quotations.find(q => q.id === Number(quotationId.trim()));
                        return (
                            <View key={index} style={styles.quotationContainer}>
                                <Text style={styles.quotationLabel}>{CRITERIA[index]} : </Text>
                                <Text style={styles.quotationLabel}>{quotation?.mention} - </Text>
                                <Text style={styles.quotationValue}>{quotation?.average}</Text>
                            </View>
                        );
                    })}
                    <View style={styles.totalPercentageContainer}>
                        <Text style={styles.label}>Pourcentage total : </Text>
                        <Text style={styles.text}>
                            {solution.feedbacks[0]?.quotations.split(',').reduce((total, quotationId) => {
                                const quotation = quotations.find(q => q.id === Number(quotationId.trim()));
                                return total + quotation?.average;
                            }, 0) / 40 * 100}%
                        </Text>
                    </View>
                </View>
            )}

        </>
    )
}

NotationCurator.propTypes = {};
NotationCurator.defaultProps = {};
NotationCurator.layout = "Contentlayout";
export default NotationCurator;
