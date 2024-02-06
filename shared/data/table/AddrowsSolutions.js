import React, { useState, Fragment, useEffect } from "react";
import { Button, Modal, Table, Pagination, Spinner } from "react-bootstrap";
import { nanoid } from "nanoid";
import axios from "@/pages/api/axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

export const SavetableSolutions = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [detailsSolutionId, setDetailsSolutionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useRouter();

  const [solutions, setSolutions] = useState([]);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        setIsLoadingSolution(true);
        const responseSolution = await axios.get("/solutions");
        setSolutions(responseSolution.data.data);
        setIsLoadingSolution(false);
      } catch (error) {
        setIsLoadingSolution(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchSolution();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleDetailsClick = (solutionId) => {
    setDetailsSolutionId(solutionId);
  };

  const handleDetailsClose = () => {
    setDetailsSolutionId(null);
  };

  const ReadOnlyRow = ({ solution, handleDetailsClick, handleDeleteClick }) => {
    return (
      <tr>
        <td className="wd-5p text-center">{solution.id}</td>
        <td>{truncateText(solution.name, 20)}</td>
        {/* <td>{truncateText(solution.description, 20)}</td> */}
        <td>{truncateText(solution.targetedProblem, 20)}</td>
        <td> {moment(solution.createdAt).format("DD MMMM YYYY [à] HH:mm")}</td>
        <td>{truncateText(solution.thematic.name, 30)}</td>
        <td>
          {/* <Button
            variant=""
            className="btn btn-primary me-1"
            type="button"
            onClick={() => handleDetailsClick(solution.id)}
          >
            Details
          </Button> */}

          <Link
            className="btn btn-primary me-1"
            href={`/components/apps/solution?id=${solution.id}&innovateurId=${solution.userId}&thematiqueId=${solution.thematicId}`}
            as="/components/apps/solution"
          >
            Details
          </Link>

          {/* <Button
            variant=""
            className="btn btn-danger me-1"
            type="button"
            onClick={() => handleDeleteClick(solution.id)}
          >
            Delete
          </Button> */}
        </td>
      </tr>
    );
  };
  

  const getSolutionDetails = (solutionId) => {
    const solution = solutions.find((s) => s.id === solutionId);

    if (!solution) {
      return <p>Solution not found.</p>;
    }

    return (
      <div>
        <p>
          <strong>Name:</strong> {solution.name}
        </p>
        <p>
          <strong>Description:</strong> {solution.description}
        </p>
        <p>
          <strong>Targeted Problem:</strong> {solution.targetedProblem}
        </p>
        <p>
          <strong>Created At:</strong> {solution.createdAt}
        </p>
        {/* Ajoutez d'autres détails au besoin */}
      </div>
    );
  };

  const handleDeleteClick = (solutionId) => {
    const newSolutions = [...solutions];

    const index = solutions.findIndex((solution) => solution.id === solutionId);

    newSolutions.splice(index, 1);

    setSolutions(newSolutions);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  if (isLoadingSolution) {
    return (
      <div className="app-container mg-b-20 text-center">
        <Spinner animation="border" role="status" >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    const currentItems = solutions.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <div className="app-container">
        <Table className="table table-bordered text-nowrap border-bottom">
          <thead>
            <tr>
              <th className="wd-5p text-center">ID</th>
              <th>Nom</th>
              {/* <th>Description</th> */}
              <th>Target</th>
              <th>Date création</th>
              <th>Thématique</th>
              <th>{"Action"}</th>
            </tr>
          </thead>
          <tbody>
            {solutions &&
              currentItems.map((solution) => (
                <Fragment key={solution.id}>
                  <ReadOnlyRow
                    solution={solution}
                    handleDetailsClick={handleDetailsClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                </Fragment>
              ))}
          </tbody>
        </Table>
        <Pagination>
          {Array.from({
            length: Math.ceil(solutions.length / itemsPerPage),
          }).map((item, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>

        <Modal
          show={detailsSolutionId !== null}
          onHide={handleDetailsClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Solution Details
            </Modal.Title>
            <Button
              variant=""
              className="btn btn-close"
              onClick={handleDetailsClose}
            >
              x
            </Button>
          </Modal.Header>
          <Modal.Body>{getSolutionDetails(detailsSolutionId)}</Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-primary wd-20p"
              onClick={handleDetailsClose}
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};
