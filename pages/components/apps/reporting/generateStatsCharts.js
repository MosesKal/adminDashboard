import {Document, Page, PDFViewer, Text, View, Image, StyleSheet} from "@react-pdf/renderer";
import HeaderReport from "@/pages/components/apps/reporting/componentReporting/headerReport";

const GenerateStatsCharts = ({
                                 chartImageConformedSolutions,
                                 chartImageCurratedSolutions,
                                 chartImageAllSolutions,
                                 tabImageAllSolutions,
                                 tabImageConformedSolutions,
                                 tabImageCurratedSolutions
                             }) => {

    const styles = StyleSheet.create({
        graphiqueContainer: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        graphiqueImage: {
            padding: 5
        },
        heading: {
            fontSize: 15,
            marginBottom: 10,
            color: "#333",
            textDecoration: "underline"
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
        },
        text: {
            fontSize: 8,
            marginBottom: 5,
            color: "#333",
        },
    });

    return (
        <>
            {
                chartImageConformedSolutions && chartImageCurratedSolutions && chartImageAllSolutions && (
                    <PDFViewer width="100%" height="600px">
                        <Document>
                            <Page>
                                <HeaderReport/>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}>
                                    {chartImageAllSolutions &&
                                        <View style={styles.graphiqueContainer}>
                                            <View>
                                                <Text style={styles.text}>Répartition de toutes les solutions par thématique</Text>
                                            </View>
                                            <View style={styles.graphiqueImage}>
                                                <Image src={chartImageAllSolutions} style={{width: 200, height: 200}}
                                                       alt={"chart all solutions"}/>
                                            </View>

                                            <View >
                                                {tabImageAllSolutions && <Image src={tabImageAllSolutions} alt={"tab image"}  style={{width: "auto", }}/>}
                                            </View>


                                        </View>
                                    }

                                </View>
                            </Page>

                            <Page>
                                <HeaderReport/>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}>
                                    {chartImageConformedSolutions &&
                                        <View style={styles.graphiqueContainer}>
                                            <View>
                                                <Text style={styles.heading}>Répartition des solutions conformes par
                                                    thématique</Text>
                                            </View>
                                            <View style={styles.graphiqueImage}>
                                                <Image src={chartImageConformedSolutions} style={{width: 200, height: 200}}
                                                       alt={"image conformed"}/>
                                            </View>

                                            <View >
                                                {tabImageConformedSolutions && <Image src={tabImageConformedSolutions} alt={"tab image"}  style={{width: "auto", }}/>}
                                            </View>
                                        </View>
                                    }
                                </View>
                            </Page>

                            <Page>
                                <HeaderReport/>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}>
                                    {chartImageCurratedSolutions &&
                                        <View style={styles.graphiqueContainer}>
                                            <View>
                                                <Text style={styles.heading}>Répartition des solutions curées par
                                                    thématique</Text>
                                            </View>
                                            <View style={styles.graphiqueImage}>
                                                <Image src={chartImageCurratedSolutions} style={{width: 200, height: 200}}
                                                       alt={"image curate"}/>
                                            </View>

                                            <View >
                                                {tabImageCurratedSolutions && <Image src={tabImageCurratedSolutions} alt={"tab image"}  style={{width: "auto", }}/>}
                                            </View>
                                        </View>
                                    }
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                )
            }

        </>
    );
};

GenerateStatsCharts.propTypes = {};
GenerateStatsCharts.defaultProps = {};
GenerateStatsCharts.layout = "Contentlayout";

export default GenerateStatsCharts;
