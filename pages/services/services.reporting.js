import htmlToImage from "html-to-image";
import { StyleSheet} from "@react-pdf/renderer";



export const chartToImage = (chart) => {
    return new Promise((resolve, reject) => {
        htmlToImage.toPng(chart.canvas)
            .then((dataUrl) => {
                resolve(dataUrl);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const styles = StyleSheet.create({
    page: {
        flexDirection: "column", padding: 20,
    }, section: {
        margin: 10, padding: 10, flexGrow: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5,
    }, heading: {
        fontSize: 20, marginBottom: 10, color: "#333", textDecoration: "underline"
    }, label: {
        fontSize: 12, fontWeight: "bold", marginBottom: 5, color: "#666",
    }, text: {
        fontSize: 12, marginBottom: 5, color: "#333",
    }, profileImage: {
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        border: "1px dash #ccc",
        paddingLeft: 20,
        paddingBottom: 10
    }, profileImg: {
        borderRadius: 5, width: 100, height: 100, objectFit: "cover", marginRight: 10,
    }, profDetails: {
        flexDirection: "column",

    }, containerTextDetail: {
        display: "flex", flexDirection: "row", marginBottom: 3, marginTop: 5
    }, containerIcon: {
        marginRight: 15, marginTop: 5
    }, constainerText: {
        marginTop: 5
    }, containerTextDetailOther: {
        display: "flex", flexDirection: "row",
    }, profDetailOther: {
        fontSize: 10
    }, containerIconOther: {
        marginRight: 15, marginTop: 5
    }, containerTextOther: {
        paddingTop: 6
    }, profDetailsText: {
        fontSize: 20, color: "black", textTransform: "uppercase"
    }, icons: {
        width: 15,
    }, fontWeightSemibold: {
        fontWeight: "bold",
    }, textMuted: {
        color: "#666",
    }, curatorContainer: {
        display: "flex", border: "1px dash #ccc", padding: 10, margin: 5, flexDirection: "row",
    }, curatorContainerBloc: {
        display: "flex", flexDirection: "column",
    }, curatorContainerBlocTow: {
        display: "flex", flexDirection: "column", marginLeft: 10
    }, describeCuratorContainer: {
        width: 100, paddingLeft: 20, display: "flex", flexDirection: "row", border: "1px solid black"
    }, textIconCurator: {
        display: "flex", flexDirection: "row",
    }, iconCuratorContainer: {
        marginRight: 10

    }, iconCurator: {
        width: 15
    }, textContainer: {},
    section1: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    heading1: {
        fontSize: 20,
        marginBottom: 10,
        color: "#333",
        textDecoration: "underline"
    },
    quotationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    quotationLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#666",
        marginRight: 5,
    },
    quotationValue: {
        fontSize: 12,
        color: "#333",
    },
    totalPercentageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    label1: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#666",
        marginRight: 5,
    },
    text1: {
        fontSize: 12,
        color: "#333",
    },
});

export const CRITERIA = [
    'Pertinence par rapport aux ODD/thématique',
    'Impact local',
    'Innovation',
    'Échelle de mise en œuvre',
];

export  const IMAGEPATH = "../../../../assets/img/faces/";

// export const DoughnutData = {
//     labels: thematiqueData?.map((thematic) => thematic.name),
//     datasets: [
//         {
//             data: countSolutionsByThematic(),
//             backgroundColor: thematiqueData?.map((thematic, index) =>
//                 getThematicColor(index)
//             ),
//         },
//     ],
// };


