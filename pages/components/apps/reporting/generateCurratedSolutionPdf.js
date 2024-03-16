import {Document, Page, Text, View, PDFViewer} from "@react-pdf/renderer";
import {styles} from "@/pages/services/services.reporting";
import InnovateurDetail from "@/pages/components/apps/reporting/componentReporting/innovateurDetail";
import SolutionDetail from "@/pages/components/apps/reporting/componentReporting/solutionDetail";
import HeaderReport from "@/pages/components/apps/reporting/componentReporting/headerReport";

const GenerateCurratedSolutionPdf = ({curratedSolution}) => {

    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <PDFViewer width="100%" height="100%">
            <Document>
                <Page style={styles.page}>
                    <HeaderReport/>
                    <View style={styles.section}>
                        <Text style={styles.heading}>{curratedSolution?.name}</Text>
                        <InnovateurDetail solution={curratedSolution}/>
                        <SolutionDetail solution={curratedSolution} hiddenDetails={false}/>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

GenerateCurratedSolutionPdf.propTypes = {};

GenerateCurratedSolutionPdf.defaultProps = {};

GenerateCurratedSolutionPdf.layout = "Contentlayout";

export default GenerateCurratedSolutionPdf;
