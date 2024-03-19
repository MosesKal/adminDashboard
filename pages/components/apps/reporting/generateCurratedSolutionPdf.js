import React from "react";
import { Document, Page, Text, View, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import InnovateurDetail from "@/pages/components/apps/reporting/componentReporting/innovateurDetail";
import SolutionDetail from "@/pages/components/apps/reporting/componentReporting/solutionDetail";
import HeaderReport from "@/pages/components/apps/reporting/componentReporting/headerReport";

const GenerateCurratedSolutionPdf = ({ curratedSolution }) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
            padding: 20,
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
        },
        heading: {
            fontSize: 15,
            marginBottom: 10,
            color: "#333",
            textDecoration: "underline",
        },
        text: {
            fontSize: 8,
            marginBottom: 5,
            color: "#333",
        },
        profileImg: {
            borderRadius: 5,
            width: 100,
            height: 100,
            objectFit: "cover",
            marginRight: 10,
        },
        profDetails: {
            flexDirection: "column",
        },
    });

    return (
        <PDFViewer width="100%" height="100%">
            <Document>
                <Page style={styles.page}>
                    <HeaderReport />
                    <View style={styles.section}>
                        <Text style={styles.heading}>{curratedSolution?.name}</Text>
                        <InnovateurDetail solution={curratedSolution} />
                        <SolutionDetail solution={curratedSolution} hiddenDetails={false} />
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default GenerateCurratedSolutionPdf;
