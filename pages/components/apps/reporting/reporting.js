import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { Col, Row } from "react-bootstrap";
import CardInnovateur from "../solution/cardInnovateur";

const Reporting = ({ curratedSolutions, conformedSolutions, solutions }) => {

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
      fontSize: 24,
      marginBottom: 10,
      color: "#333",
    },
    label: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#666",
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
      color: "#333",
    },
  });


  return (
    // <Row>
    //   <Col>
    //     <PDFViewer width="100%" height="600px">
    //       <Document>
    //         {curratedSolutions.map((solution, index) => (
    //           <Page key={index} style={styles.page}>
    //             <View style={styles.section}>
    //               <Text style={styles.heading}>{index + 1} {solution.name}</Text>
    //               {solution.user && (
    //                 <View style={{ marginBottom: 10 }}>
    //                   <Text style={styles.label}>Innovateur:</Text>
    //                   <CardInnovateur profileInnovateur={solution.user} />
    //                 </View>
    //               )}
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Description:</Text>
    //                 <Text style={styles.text}>{solution.description}</Text>
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Thème:</Text>
    //                 <Text style={styles.text}>{solution.thematic.name}</Text>
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Challenges:</Text>
    //                 {solution.challenges.map((challenge, index) => (
    //                   <Text key={index} style={styles.text}>
    //                     {challenge.name}
    //                   </Text>
    //                 ))}
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Statut:</Text>
    //                 <Text style={styles.text}>{solution.status.name}</Text>
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Utilisateur:</Text>
    //                 <Text style={styles.text}>{solution.user.name}</Text>
    //               </View>
    //             </View>
    //           </Page>
    //         ))}
    //       </Document>
    //     </PDFViewer>
    //   </Col>
    //   <Col>
    //     <PDFViewer width="100%" height="600px">
    //       <Document>
    //         {conformedSolutions.map((solution, index) => (
    //           <Page key={index} style={styles.page}>
    //             <View style={styles.section}>
    //               <Text style={styles.heading}>{index + 1} {solution.name}</Text>
    //               {solution.user && (
    //                 <View style={{ marginBottom: 10 }}>
    //                   <Text style={styles.label}>Innovateur:</Text>
    //                   <CardInnovateur profileInnovateur={solution.user} />
    //                 </View>
    //               )}
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Description:</Text>
    //                 <Text style={styles.text}>{solution.description}</Text>
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Thème:</Text>
    //                 <Text style={styles.text}>{solution.thematic.name}</Text>
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Challenges:</Text>
    //                 {solution.challenges.map((challenge, index) => (
    //                   <Text key={index} style={styles.text}>
    //                     {challenge.name}
    //                   </Text>
    //                 ))}
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Statut:</Text>
    //                 <Text style={styles.text}>{solution.status.name}</Text>
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Utilisateur:</Text>
    //                 <Text style={styles.text}>{solution.user.name}</Text>
    //               </View>
    //             </View>
    //           </Page>
    //         ))}
    //       </Document>
    //     </PDFViewer>
    //   </Col>
    //   <Col>
    //     <PDFViewer width="100%" height="600px">
    //       <Document>
    //         {solutions.map((solution, index) => (
    //           <Page key={index} style={styles.page}>
    //             <View style={styles.section}>
    //               <Text style={styles.heading}>{index + 1} {solution.name}</Text>
    //               {solution.user && (
    //                 <View style={{ marginBottom: 10 }}>
    //                   <Text style={styles.label}>Innovateur:</Text>
    //                   <CardInnovateur profileInnovateur={solution.user} />
    //                 </View>
    //               )}
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Description:</Text>
    //                 <Text style={styles.text}>{solution.description}</Text>
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Thème:</Text>
    //                 <Text style={styles.text}>{solution.thematic.name}</Text>
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Challenges:</Text>
    //                 {solution.challenges.map((challenge, index) => (
    //                   <Text key={index} style={styles.text}>
    //                     {challenge.name}
    //                   </Text>
    //                 ))}
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Statut:</Text>
    //                 <Text style={styles.text}>{solution.status.name}</Text>
    //               </View>
    //               <View style={{ marginBottom: 10 }}>
    //                 <Text style={styles.label}>Utilisateur:</Text>
    //                 <Text style={styles.text}>{solution.user.name}</Text>
    //               </View>
    //             </View>
    //           </Page>
    //         ))}
    //       </Document>
    //     </PDFViewer>
    //   </Col>
    // </Row>
    <></>

  );
};

export default Reporting;
