import React from "react";
import {Text, View} from "@react-pdf/renderer";
import {styles} from "@/pages/services/services.reporting";

const curatorDetail = ({solution}) => (
    <View>
        <View>
            <Text>Détails de la solution</Text>
        </View>
        <View style={{marginBottom: 10}}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.text}>{solution.description}</Text>
        </View>
        <View style={{marginBottom: 10}}>
            <Text style={styles.label}>Thème:</Text>
            <Text style={styles.text}>{solution.thematic.name}</Text>
        </View>
        <View style={{marginBottom: 10}}>
            <Text style={styles.label}>Challenges:</Text>
            {solution.challenges.map((challenge, index) => (
                <Text key={index} style={styles.text}>
                    {challenge.name}
                </Text>))}
        </View>
    </View>
);

export default curatorDetail;