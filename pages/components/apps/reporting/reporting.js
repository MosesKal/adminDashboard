import React from "react";
import {Col, Row} from "react-bootstrap";

import GenerateCurratedSolutionsPdf from "@/pages/components/apps/reporting/generateCurratedSolutionsPdf";


const Reporting = ({curratedSolutions}) => {

    console.log("CurratedSolutions=========>", curratedSolutions);

    return (
        <Row>
            <Col>
                <GenerateCurratedSolutionsPdf curratedSolutions={curratedSolutions}/>
            </Col>
        </Row>

    );
};
export default Reporting;