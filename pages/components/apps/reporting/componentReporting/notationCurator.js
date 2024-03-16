import React from 'react'
import {Text, View} from "@react-pdf/renderer";
import {CRITERIA, styles} from "@/pages/services/services.reporting";

const NotationCurator = ({solution, quotations}) => {
    return (
        <>
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
        </>
    )
}
export default NotationCurator
