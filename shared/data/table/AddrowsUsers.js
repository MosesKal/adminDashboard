import React, { useState, Fragment, useEffect } from "react";
import { Button, Modal, Table, Spinner } from "react-bootstrap";
import { nanoid } from "nanoid";
import axios from "@/pages/api/axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

export const SavetableUser = () => {
  const [detailsUserId, setDetailsUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useRouter();

  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoadingUsers(true);
        const responseUser = await axios.get("/users");
        setUsers(responseUser.data.data);
        setIsLoadingUsers(false);
      } catch (error) {
        setIsLoadingUsers(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchUser();
  }, []);

  const handleDetailsClick = (userId) => {
    setDetailsUserId(userId);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const ReadOnlyRow = ({ user }) => {
    return (
      <tr>
        <td className="wd-5p text-center">{user.id}</td>
        <td>{user.name}</td>
        <td>{user.phoneNumber}</td>
        <td> {user.email}</td>
        <td>{truncateText(user.address, 25)}</td>
        <td>
          <Link
            className="btn btn-primary me-1"
            href={`/components/apps/solution`}
            as="/components/apps/solution"
          >
            Details
          </Link>
          <Button
            variant=""
            className="btn btn-danger me-1"
            type="button"
            // onClick={() => handleDeleteClick(solution.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const PaginationComponent = () => {
    const pageNumbers = Array.from({
      length: Math.ceil(users.length / itemsPerPage),
    });

    return (
      <div className="d-flex justify-content-center">
        <Button
          variant=""
          className="btn btn-default tablebutton me-2 d-sm-inline d-block my-1"
          onClick={() =>
            setCurrentPage((prevPage) =>
              prevPage > 1 ? prevPage - 1 : prevPage
            )
          }
          disabled={currentPage === 1}
        >
          {"<"}
        </Button>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant=""
            className="btn btn-default tablebutton me-2 my-1"
            onClick={() => setCurrentPage(number)}
            disabled={number === currentPage}
          >
            {number}
          </Button>
        ))}
        <Button
          variant=""
          className="btn btn-default tablebutton me-2 d-sm-inline d-block my-1"
          onClick={() =>
            setCurrentPage((prevPage) =>
              prevPage < pageNumbers.length ? prevPage + 1 : prevPage
            )
          }
          disabled={currentPage === pageNumbers.length}
        >
          {">"}
        </Button>
      </div>
    );
  };

  return (
    <div className="app-container">
      <Table className="table table-bordered text-nowrap border-bottom">
        <thead>
          <tr>
            <th className="wd-5p text-center">ID</th>
            <th>Nom</th>
            <th>Num Tel</th>
            <th>email</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <Fragment key={user.id}>
              <ReadOnlyRow user={user} />
            </Fragment>
          ))}
        </tbody>
      </Table>


        {/* <Modal
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
        </Modal> */}
      </div>
    );
};
