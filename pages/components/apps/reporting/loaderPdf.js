import React from 'react'
import { Spinner } from 'react-bootstrap';

const LoaderPdf = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Chargement en cours...</span>
            </Spinner>
        </div>
    );
}
export default LoaderPdf
