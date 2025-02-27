import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Spinner,
  Modal,
  FormGroup,
  Form,
  Tab,
  Tabs,
  Pagination,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { columns as configureColumns, truncateText } from "./solutionslist";
import { columnsCurations as configureColumnsCuration } from "./solutionslistCuration";
import axios from "@/pages/api/axios";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import Reporting from "@/pages/components/apps/reporting/reporting";
import Link from "next/link";

const Solutionslistcom = () => {
  const [solutions, setSolutions] = useState([]);
  const [conformedSolutions, setConformedSolutions] = useState([]);
  const [curratedSolutions, setCurratedSolutions] = useState([]);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [solutionToDelete, setSolutionToDelete] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [optionsThematique, setOptionsThematique] = useState([]);

  const [selectedOptionsThematique, setSelectedOptionsThematique] =
    useState(null);
  const [optionIdThematique, setOptionIdThematique] = useState(null);

  const [optionsStatus, setOptionsStatus] = useState([]);
  const [selectedOptionsStatus, setSelectedOptionsStatus] = useState(null);
  const [optionIdStatus, setOptionIdStatus] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [profile, setProfile] = useState(null);
  const [mentions, setMentions] = useState(null);

  const [filters, setFilters] = useState({
    searchText: "",
    statusFilter: "Tous",
    thematicFilter: "Tous",
  });

  const [optionPole, setOptionPole] = useState();
  const [selectedSolutions, setSelectedSolutions] = useState(null);
  const [optionSolutionId, setOptionSolutionId] = useState();
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchThematique = async () => {
      try {
        const thematiqueResponse = await axios.get("/thematics");
        const data = thematiqueResponse?.data?.data;
        const allThematiqueOption = { value: "Tous", label: "Tous" };
        setOptionsThematique([
          allThematiqueOption,
          ...data.map((option) => ({
            value: option.id,
            label: option.name,
          })),
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStatus = async () => {
      try {
        const statusResponse = await axios.get("/status");
        const data = statusResponse?.data?.data;
        const allStatusOption = { value: "Tous", label: "Tous" };
        setOptionsStatus([
          allStatusOption,
          ...data.map((option) => ({
            value: option.id,
            label: option.name,
          })),
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUser = async () => {
      try {
        setIsLoadingUsers(true);
        const responseUser = await axios.get("/users");
        const dataUser = responseUser?.data?.data;
        setUsers(dataUser);
        setIsLoadingUsers(false);
      } catch (error) {
        setIsLoadingUsers(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    const fetchProfile = async () => {
      try {
        const profileResponse = await axios.get("/auth/profile/");
        setProfile(profileResponse?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPole = async () => {
      let data;

      try {
        const poleResponse = await axios.get("/poles");
        data = poleResponse?.data?.data;
        setOptionPole(
          data.map((option) => ({
            value: option.id,
            label: option.name,
          }))
        );
      } catch (e) {
        console.log(e);
      }
    };

    const fetchMentions = async () => {
      try {
        const mentionsResponse = await axios.get("/quotations");

        const mentions = mentionsResponse?.data?.data;

        setMentions(
          mentions.map((mention) => ({
            id: mention.id,
            average: mention.average,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (localStorage?.getItem("ACCESS_ACCOUNT")) {
      const userRoles = JSON.parse(
        localStorage?.getItem("ACCESS_ACCOUNT")
      )?.roles;
      setIsAdmin(userRoles?.some((role) => role.name === "ADMIN"));
    }

    fetchUser();
    fetchThematique();
    fetchStatus();
    fetchProfile();
    fetchPole();
    fetchMentions();
  }, []);

  const fetchSolutions = async () => {
    try {
      setIsLoadingSolution(true);
      let responseSolution;
      let responseSolutionConforms;
      let responseSolutionCurated;

      if (isAdmin) {
        responseSolution = await axios.get("/solutions");
        responseSolutionConforms = await axios.get("/solutions/conforms/all");
        responseSolutionCurated = await axios.get("/solutions/curated/all");
      } else {
        responseSolution = await axios.get(`/solutions/pole/${profile.poleId}`);
      }

      setSolutions(responseSolution?.data?.data);
      setConformedSolutions(responseSolutionConforms?.data?.data);
      setCurratedSolutions(responseSolutionCurated?.data?.data);
      setIsLoadingSolution(false);
    } catch (error) {
      setIsLoadingSolution(false);
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useMemo(() => {
    if (profile) {
      fetchSolutions();
    }
  }, [profile]);

  const dataMerged = useMemo(() => {
    const mergeData = (solutions, users) => {
      const userMap = {};
      users.forEach((user) => {
        userMap[user.id] = user;
      });

      return solutions.map((solution) => ({
        ...solution,
        user: userMap[solution.userId],
      }));
    };

    return mergeData(solutions, users);
  }, [solutions, users]);

  const dataConformedSolutionsMerged = useMemo(() => {
    const mergeDataConfermedSolution = (solutions, users) => {
      const userMap = {};
      users.forEach((user) => {
        userMap[user.id] = user;
      });

      return solutions?.map((solution) => ({
        ...solution,
        user: userMap[solution.userId],
      }));
    };

    return mergeDataConfermedSolution(conformedSolutions, users);
  }, [conformedSolutions, users]);

  const dataCurratedSolutionsMerged = useMemo(() => {
    const mergeDataCurratedSolutions = (solutions, users) => {
      const userMap = {};
      users.forEach((user) => {
        userMap[user.id] = user;
      });

      return solutions?.map((solution) => ({
        ...solution,
        user: userMap[solution.userId],
      }));
    };

    return mergeDataCurratedSolutions(curratedSolutions, users);
  }, [curratedSolutions, users]);

  const filteredSolutions = useMemo(() => {
    return dataMerged?.filter((solution) => {
      if (!dataMerged) {
        return false;
      }
      const textMatch =
        solution.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.email
          .toLowerCase()
          .includes(filters.searchText.toLowerCase());
      const statusMatch =
        filters.statusFilter === "Tous" ||
        solution?.status?.name === filters.statusFilter;
      const thematicMatch =
        filters.thematicFilter === "Tous" ||
        solution?.thematic?.name === filters.thematicFilter;
      return textMatch && statusMatch && thematicMatch;
    });
  }, [dataMerged, filters]);

  const filteredConformedSolutions = useMemo(() => {
    return dataConformedSolutionsMerged?.filter((solution) => {
      if (!dataConformedSolutionsMerged) {
        return false;
      }
      const textMatch =
        solution.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.email
          .toLowerCase()
          .includes(filters.searchText.toLowerCase());
      const statusMatch =
        filters.statusFilter === "Tous" ||
        solution?.status?.name === filters.statusFilter;
      const thematicMatch =
        filters.thematicFilter === "Tous" ||
        solution?.thematic?.name === filters.thematicFilter;
      return textMatch && statusMatch && thematicMatch;
    });
  }, [dataConformedSolutionsMerged, filters]);

  const filteredCurratedSolutions = useMemo(() => {
    return dataCurratedSolutionsMerged?.filter((solution) => {
      if (!dataCurratedSolutionsMerged) {
        return false;
      }
      const textMatch =
        solution.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.email
          .toLowerCase()
          .includes(filters.searchText.toLowerCase());
      const statusMatch =
        filters.statusFilter === "Tous" ||
        solution?.status?.name === filters.statusFilter;
      const thematicMatch =
        filters.thematicFilter === "Tous" ||
        solution?.thematic?.name === filters.thematicFilter;
      return textMatch && statusMatch && thematicMatch;
    });
  }, [dataCurratedSolutionsMerged, filters]);

  const dataCurratedSolutionsMergedWithCote = useMemo(() => {
    if (isAdmin && filteredCurratedSolutions) {
      return filteredCurratedSolutions
        .map((solution) => {
          const lastFeedback = solution.feedbacks.slice(-1)[0];
          if (lastFeedback) {
            const feedbacks = lastFeedback.quotations
              .split(",")
              .map((id) => parseInt(id, 10));
            const coteTotal = feedbacks.reduce((total, id) => {
              const mention = mentions.find((mention) => mention.id === id);
              return total + (mention ? mention.average : 0);
            }, 0);
            return { ...solution, cote: (coteTotal / 40) * 100 };
          } else {
            return { ...solution, cote: 0 };
          }
        })
        .sort((a, b) => b.cote - a.cote);
    }
  }, [filteredCurratedSolutions, mentions, isAdmin]);

  const handleDelete = async (s) => {
    if (isAdmin) {
      setSolutionToDelete(s);
      setShowDeleteModal(true);

      const id = parseInt(solutionToDelete?.id, 10);
      try {
        await axios.delete(`/solutions/${id}`);
        setShowDeleteModal(false);

        setSolutions((prevSolutions) =>
          prevSolutions.filter((solutionToDelete) => solutionToDelete.id !== id)
        );

        setShowDeleteModal(false);
      } catch (error) {
        console.error("Erreur lors de la suppression de la solution :", error);
      }
    } else {
      setShowAlertModal(true);
    }
  };

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  const handleCloseModalEdit = () => {
    setShowEditModal(false);
  };

  const columns = configureColumns(handleDelete);
  const columnsCurations = configureColumnsCuration(handleDelete);

  columns.forEach((column) => {
    if (column.name === "Actions") {
      column.width = "30%";
    }
  });

  columnsCurations.forEach((column) => {
    if (column.name === "Actions") {
      column.width = "30%";
    }
    if (column.name === "pourcentage") {
      column.width = "10%";
    }
    if (column.name === "Titre") {
      column.width = "20%";
    }
  });

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  function convertArrayOfObjectsToCSV(array) {
    if (!array || array.length === 0) {
      return "";
    }
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        try {
          const value =
            typeof item[key] === "object" && item[key] !== null
              ? item[key]?.props?.alt
              : item[key];
          result += value;
        } catch (e) {}

        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => (
    <Button size="sm" onClick={() => onExport()}>
      Exporter les Solutions
    </Button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(solutions)} />,
    [solutions]
  );

  const contextActions = React.useMemo(() => {
    const Selectdata = () => {
      if (window.confirm(`download:\r ${selectedRows.map((r) => r.id)}?`)) {
        setToggleCleared(!toggleCleared);
        const selectdata = solutions.filter((e) =>
          selectedRows.some((sr) => e.id === sr.id)
        );
        downloadCSV(selectdata);
      }
    };

    return <Export onExport={Selectdata} icon="true" />;
  }, [solutions, selectedRows, toggleCleared]);

  const handleSelectChangeStatus = (selectedOption) => {
    setSelectedOptionsStatus(selectedOption);
    setOptionIdStatus(selectedOption?.value);
    setFilters({
      ...filters,
      statusFilter: String(selectedOption?.label) || "all",
    });
  };

  const handleSelectChangeThematic = (selectedOption) => {
    setSelectedOptionsThematique(selectedOption);
    setOptionIdThematique(selectedOption?.value);
    setFilters({ ...filters, thematicFilter: selectedOption?.label || "all" });
  };

  return (
    <div>
      <Row className="row-sm col-12">
        {isAdmin ? (
          <div className="panel panel-primary tabs-style-2 col-12">
            <div className="tab-menu-heading">
              <div className="tabs-menu1">
                <Tabs
                  defaultActiveKey="Tab 01"
                  className=" panel-tabs main-nav-line "
                >
                  <Tab eventKey="Tab 01" title="Solutions Currées">
                    <div
                      className="panel-body tabs-menu-body main-content-body-right"
                      id="tab4"
                    >
                      <CuratedSolutions
                        users={users}
                        mentions={mentions}
                        isAdmin={isAdmin}
                        handleDelete={handleDelete}
                        optionsThematique={optionsThematique}
                      />
                    </div>
                  </Tab>

                  <Tab eventKey="Tab 02" title="Solutions conformes">
                    <ConformedSolutions
                      users={users}
                      mentions={mentions}
                      isAdmin={isAdmin}
                      handleDelete={handleDelete}
                      optionsThematique={optionsThematique}
                    />
                  </Tab>
                  <Tab eventKey="Tab 03" title="Toutes les Solutions">
                    <AllSolutions
                      users={users}
                      mentions={mentions}
                      isAdmin={isAdmin}
                      handleDelete={handleDelete}
                      optionsThematique={optionsThematique}
                    />
                  </Tab>

                  <Tab eventKey="Tab 04" title="Rapports">
                    <div
                      className="panel-body tabs-menu-body main-content-body-right "
                      id="tab6"
                    >
                      <Col lg={12} className="w-full">
                        <Card className="custom-card">
                          <Card.Body>
                            <Reporting
                              curratedSolutions={
                                dataCurratedSolutionsMergedWithCote
                              }
                              conformedSolutions={conformedSolutions}
                              solutions={solutions}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        ) : (
          <Col lg={12} className="w-full">
            <Card className="custom-card">
              <Card.Body>
                {isLoadingSolution ? (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <div className="table-responsive ">
                    <Row>
                      <Col xs={12} md={12} lg={4} xl={4}>
                        <Form>
                          <FormGroup className="form-group">
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Recherche par titre de la solution, par le nom ou l'email de l'innovateur"
                              value={filters.searchText}
                              onChange={(e) =>
                                setFilters({
                                  ...filters,
                                  searchText: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Form>
                      </Col>

                      <Col xs={12} md={12} lg={4} xl={4}>
                        <div className=" SlectBox">
                          <Select
                            classNamePrefix="selectform"
                            onChange={handleSelectChangeStatus}
                            options={optionsStatus}
                            placeholder="Filtre par Status"
                          />
                        </div>
                      </Col>

                      <Col xs={12} md={12} lg={4} xl={4}>
                        <div className=" SlectBox">
                          <Select
                            classNamePrefix="selectform"
                            onChange={handleSelectChangeThematic}
                            options={optionsThematique}
                            placeholder="Filtre par Thématique"
                          />
                        </div>
                      </Col>
                    </Row>
                    <span className="datatable">
                      <span className="uselistdata">
                        <DataTable
                          columns={columns}
                          data={filteredSolutions}
                          actions={actionsMemo}
                          contextActions={contextActions}
                          onSelectedRowsChange={handleRowSelected}
                          clearSelectedRows={toggleCleared}
                          defaultSortField="id"
                          defaultSortAsc={false}
                          selectableRows
                          pagination
                        />
                      </span>
                    </span>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Body>
          <div className="tx-center">
            <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>{" "}
            <h4 className="tx-danger mg-b-20">
              {"Êtes - vous sûr de vouloir supprimer la solution "}{" "}
              <span className="badge bg-danger">
                {truncateText(solutionToDelete?.name, 20)} ?
              </span>
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size={"sm"}
            variant="primary"
            onClick={() => setShowDeleteModal(false)}
          >
            Annuler
          </Button>
          <Button size={"sm"} variant="danger" onClick={handleDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAlertModal} onHide={handleCloseAlertModal}>
        <Modal.Body>
          <div className="tx-center">
            <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>{" "}
            <h4 className="tx-danger mg-b-20">
              {
                "Vous n'avez pas les droits nécessaires pour effectuer cette action."
              }
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size={"sm"} variant="primary" onClick={handleCloseAlertModal}>
            {"OK"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseModalEdit}>
        <Modal.Header className="modal-header">
          <h6 className="modal-title">{"Assigner la solution à un pôle"}</h6>
          <Button
            variant=""
            className="btn-close"
            type="button"
            onClick={handleCloseModalEdit}
          >
            <span aria-hidden="true">x</span>
          </Button>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="p-4">
            <FormGroup className="form-group">
              <Select options={optionPole} />
            </FormGroup>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
};

const CuratedSolutions = ({
  users,
  mentions,
  isAdmin,
  actionsMemo,
  contextActions,
  handleDelete,
  optionsThematique,
}) => {
  const [conformSolutions, setConformSolutions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);
  const [selectedOptionsThematique, setSelectedOptionsThematique] =
    useState(null);
  const [optionIdThematique, setOptionIdThematique] = useState(null);

  useEffect(() => {
    const fetchConformedSolutions = async () => {
      setIsLoadingSolution(true);
      try {
        const responseSolutionConformed = await axios.get(
          `/solutions/curated/all?page=${page}`
        );
        setConformSolutions(responseSolutionConformed?.data?.data);
        setTotalPages(4);
        setIsLoadingSolution(false);
      } catch (error) {
        setIsLoadingSolution(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchConformedSolutions();
  }, [page]);

  const [filters, setFilters] = useState({
    searchText: "",
    statusFilter: "Tous",
    thematicFilter: "Tous",
  });

  const dataConformSolutionsMerged = useMemo(() => {
    const mergeDataConformSolutions = (solutions, users) => {
      const userMap = {};
      users.forEach((user) => {
        userMap[user.id] = user;
      });

      return solutions?.map((solution) => ({
        ...solution,
        user: userMap[solution.userId],
      }));
    };

    return mergeDataConformSolutions(conformSolutions, users);
  }, [conformSolutions, users]);

  const filteredConformSolutions = useMemo(() => {
    return dataConformSolutionsMerged?.filter((solution) => {
      if (!dataConformSolutionsMerged) {
        return false;
      }
      const textMatch =
        solution.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.email
          .toLowerCase()
          .includes(filters.searchText.toLowerCase());
      const statusMatch =
        filters.statusFilter === "Tous" ||
        solution?.status?.name === filters.statusFilter;
      const thematicMatch =
        filters.thematicFilter === "Tous" ||
        solution?.thematic?.name === filters.thematicFilter;
      return textMatch && statusMatch && thematicMatch;
    });
  }, [dataConformSolutionsMerged, filters]);

  const dataConformSolutionsMergedWithCote = useMemo(() => {
    if (isAdmin && filteredConformSolutions) {
      return filteredConformSolutions
        .map((solution) => {
          const lastFeedback = solution.feedbacks.slice(-1)[0];
          if (lastFeedback) {
            const feedbacks = lastFeedback.quotations
              .split(",")
              .map((id) => parseInt(id, 10));
            const coteTotal = feedbacks.reduce((total, id) => {
              const mention = mentions.find((mention) => mention.id === id);
              return total + (mention ? mention.average : 0);
            }, 0);
            return { ...solution, cote: (coteTotal / 40) * 100 };
          } else {
            return { ...solution, cote: 0 };
          }
        })
        .sort((a, b) => b.cote - a.cote);
    }
  }, [filteredConformSolutions, mentions, isAdmin]);

  const handleSelectChangeThematic = (selectedOption) => {
    setSelectedOptionsThematique(selectedOption);
    setFilters({ ...filters, thematicFilter: selectedOption?.label || "all" });
  };

  const columnsCurations = configureColumnsCuration(handleDelete);
  return (
    <>
      <Col lg={12} className="w-full">
        <Card className="custom-card">
          <Card.Body>
            {isLoadingSolution ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <div className="table-responsive ">
                <Row>
                  <Col xs={12} md={12} lg={6} xl={6}>
                    <Form>
                      <FormGroup className="form-group">
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder="Search by solution title, innovator name, or email"
                          value={filters.searchText}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              searchText: e.target.value,
                            })
                          }
                        />
                      </FormGroup>
                    </Form>
                  </Col>

                  <Col xs={12} md={12} lg={6} xl={6}>
                    <div className=" SlectBox">
                      <Select
                        classNamePrefix="selectform"
                        onChange={handleSelectChangeThematic}
                        options={optionsThematique}
                        placeholder="Filter by Theme"
                      />
                    </div>
                  </Col>
                </Row>
                <span className="datatable">
                  <span className="uselistdata">
                    <DataTable
                      columns={columnsCurations}
                      data={dataConformSolutionsMergedWithCote}
                      actions={actionsMemo}
                      contextActions={contextActions}
                      selectableRows
                    />
                    <div className="text-wrap">
                      <div className="example">
                        <Pagination className=" mb-0 mb-0 pagination-sm ">
                          <Pagination.Prev
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                          />
                          {[...Array(totalPages)].map(
                            (_, index) =>
                              index + 1 <= page + 2 &&
                              index + 1 >= page - 2 && (
                                <Pagination.Item
                                  key={index + 1}
                                  active={page === index + 1}
                                  onClick={() => setPage(index + 1)}
                                >
                                  {index + 1}
                                </Pagination.Item>
                              )
                          )}
                          <Pagination.Next
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                          />
                        </Pagination>
                      </div>
                    </div>
                  </span>
                </span>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

const Test = ({
  users,
  mentions,
  isAdmin,
  actionsMemo,
  contextActions,
  handleDelete,
  optionsThematique,
}) => {
  const [curratedSolutions, setCurratedSolutions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);
  const [selectedOptionsThematique, setSelectedOptionsThematique] =
    useState(null);

  const [optionIdThematique, setOptionIdThematique] = useState(null);

  useEffect(() => {
    const fetchCurratedSolutions = async () => {
      setIsLoadingSolution(true);
      try {
        const responseSolutionCurated = await axios.get(
          `/solutions/curated/all?page=${page}`
        );
        setCurratedSolutions(responseSolutionCurated?.data?.data);
        setTotalPages(4);
        setIsLoadingSolution(false);
      } catch (error) {
        setIsLoadingSolution(false);
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchCurratedSolutions();
  }, [page]);

  const [filters, setFilters] = useState({
    searchText: "",
    statusFilter: "Tous",
    thematicFilter: "Tous",
  });

  const dataCurratedSolutionsMerged = useMemo(() => {
    const mergeDataCurratedSolutions = (solutions, users) => {
      const userMap = {};
      users.forEach((user) => {
        userMap[user.id] = user;
      });

      return solutions?.map((solution) => ({
        ...solution,
        user: userMap[solution.userId],
      }));
    };

    return mergeDataCurratedSolutions(curratedSolutions, users);
  }, [curratedSolutions, users]);

  const filteredCurratedSolutions = useMemo(() => {
    return dataCurratedSolutionsMerged?.filter((solution) => {
      if (!dataCurratedSolutionsMerged) {
        return false;
      }
      const textMatch =
        solution.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.email
          .toLowerCase()
          .includes(filters.searchText.toLowerCase());
      const statusMatch =
        filters.statusFilter === "Tous" ||
        solution?.status?.name === filters.statusFilter;
      const thematicMatch =
        filters.thematicFilter === "Tous" ||
        solution?.thematic?.name === filters.thematicFilter;
      return textMatch && statusMatch && thematicMatch;
    });
  }, [dataCurratedSolutionsMerged, filters]);

  const dataCurratedSolutionsMergedWithCote = useMemo(() => {
    if (isAdmin && filteredCurratedSolutions) {
      return filteredCurratedSolutions
        .map((solution) => {
          const lastFeedback = solution.feedbacks.slice(-1)[0];
          if (lastFeedback) {
            const feedbacks = lastFeedback.quotations
              .split(",")
              .map((id) => parseInt(id, 10));
            const coteTotal = feedbacks.reduce((total, id) => {
              const mention = mentions.find((mention) => mention.id === id);
              return total + (mention ? mention.average : 0);
            }, 0);
            return { ...solution, cote: (coteTotal / 40) * 100 };
          } else {
            return { ...solution, cote: 0 };
          }
        })
        .sort((a, b) => b.cote - a.cote);
    }
  }, [filteredCurratedSolutions, mentions, isAdmin]);

  const handleSelectChangeThematic = (selectedOption) => {
    setSelectedOptionsThematique(selectedOption);
    setFilters({ ...filters, thematicFilter: selectedOption?.label || "all" });
  };

  const columnsCurations = configureColumnsCuration(handleDelete);

  return (
    <>
      <Col lg={12} className="w-full">
        <Card className="custom-card">
          <Card.Body>
            {isLoadingSolution ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <div className="table-responsive ">
                <Row>
                  <Col xs={12} md={12} lg={6} xl={6}>
                    <Form>
                      <FormGroup className="form-group">
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder="Recherche par titre de la solution, par le nom ou l'email de l'innovateur"
                          value={filters.searchText}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              searchText: e.target.value,
                            })
                          }
                        />
                      </FormGroup>
                    </Form>
                  </Col>

                  <Col xs={12} md={12} lg={6} xl={6}>
                    <div className=" SlectBox">
                      <Select
                        classNamePrefix="selectform"
                        onChange={handleSelectChangeThematic}
                        options={optionsThematique}
                        placeholder="Filtre par Thématique"
                      />
                    </div>
                  </Col>
                </Row>
                <span className="datatable">
                  <span className="uselistdata">
                    <DataTable
                      columns={columnsCurations}
                      data={dataCurratedSolutionsMergedWithCote}
                      actions={actionsMemo}
                      contextActions={contextActions}
                      selectableRows
                    />
                    <div className="text-wrap">
                      <div className="example">
                        <Pagination className=" mb-0">
                          <Pagination.Prev
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                          />
                          {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                              key={index + 1}
                              active={page === index + 1}
                              onClick={() => setPage(index + 1)}
                            >
                              {index + 1}
                            </Pagination.Item>
                          ))}
                          <Pagination.Next
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                          />
                        </Pagination>
                      </div>
                    </div>
                  </span>
                </span>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

const ConformedSolutions = ({
  users,
  mentions,
  isAdmin,
  actionsMemo,
  contextActions,
  handleDelete,
  optionsThematique,
}) => {
  const [conformSolutions, setConformSolutions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);
  const [selectedOptionsThematique, setSelectedOptionsThematique] =
    useState(null);
  const [optionIdThematique, setOptionIdThematique] = useState(null);

  useEffect(() => {
    const fetchConformedSolutions = async () => {
      setIsLoadingSolution(true);
      try {
        const responseSolutionConformed = await axios.get(
          `/solutions/conforms/all?page=${page}`
        );
        setConformSolutions(responseSolutionConformed?.data?.data);
        setTotalPages(45);
        setIsLoadingSolution(false);
      } catch (error) {
        setIsLoadingSolution(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchConformedSolutions();
  }, [page]);

  const [filters, setFilters] = useState({
    searchText: "",
    statusFilter: "Tous",
    thematicFilter: "Tous",
  });

  const dataConformSolutionsMerged = useMemo(() => {
    const mergeDataConformSolutions = (solutions, users) => {
      const userMap = {};
      users.forEach((user) => {
        userMap[user.id] = user;
      });

      return solutions?.map((solution) => ({
        ...solution,
        user: userMap[solution.userId],
      }));
    };

    return mergeDataConformSolutions(conformSolutions, users);
  }, [conformSolutions, users]);

  const filteredConformSolutions = useMemo(() => {
    return dataConformSolutionsMerged?.filter((solution) => {
      if (!dataConformSolutionsMerged) {
        return false;
      }
      const textMatch =
        solution.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.email
          .toLowerCase()
          .includes(filters.searchText.toLowerCase());
      const statusMatch =
        filters.statusFilter === "Tous" ||
        solution?.status?.name === filters.statusFilter;
      const thematicMatch =
        filters.thematicFilter === "Tous" ||
        solution?.thematic?.name === filters.thematicFilter;
      return textMatch && statusMatch && thematicMatch;
    });
  }, [dataConformSolutionsMerged, filters]);

  const dataConformSolutionsMergedWithCote = useMemo(() => {
    if (isAdmin && filteredConformSolutions) {
      return filteredConformSolutions
        .map((solution) => {
          const lastFeedback = solution.feedbacks.slice(-1)[0];
          if (lastFeedback) {
            const feedbacks = lastFeedback.quotations
              .split(",")
              .map((id) => parseInt(id, 10));
            const coteTotal = feedbacks.reduce((total, id) => {
              const mention = mentions.find((mention) => mention.id === id);
              return total + (mention ? mention.average : 0);
            }, 0);
            return { ...solution, cote: (coteTotal / 40) * 100 };
          } else {
            return { ...solution, cote: 0 };
          }
        })
        .sort((a, b) => b.cote - a.cote);
    }
  }, [filteredConformSolutions, mentions, isAdmin]);

  const handleSelectChangeThematic = (selectedOption) => {
    setSelectedOptionsThematique(selectedOption);
    setFilters({ ...filters, thematicFilter: selectedOption?.label || "all" });
  };

  const columns = configureColumns(handleDelete);

  columns.forEach((column) => {
    if (column.name === "Actions") {
      column.width = "30%";
    }
  });

  return (
    <>
      <Col lg={12} className="w-full">
        <Card className="custom-card">
          <Card.Body>
            {isLoadingSolution ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <div className="table-responsive ">
                <Row>
                  <Col xs={12} md={12} lg={6} xl={6}>
                    <Form>
                      <FormGroup className="form-group">
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder="Search by solution title, innovator name, or email"
                          value={filters.searchText}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              searchText: e.target.value,
                            })
                          }
                        />
                      </FormGroup>
                    </Form>
                  </Col>

                  <Col xs={12} md={12} lg={6} xl={6}>
                    <div className=" SlectBox">
                      <Select
                        classNamePrefix="selectform"
                        onChange={handleSelectChangeThematic}
                        options={optionsThematique}
                        placeholder="Filter by Theme"
                      />
                    </div>
                  </Col>
                </Row>
                <span className="datatable">
                  <span className="uselistdata">
                    <DataTable
                      columns={columns}
                      data={dataConformSolutionsMergedWithCote}
                      actions={actionsMemo}
                      contextActions={contextActions}
                      selectableRows
                    />
                    <div className="text-wrap">
                      <div className="example">
                        <Pagination className=" mb-0 mb-0 pagination-sm ">
                          <Pagination.Prev
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                          />
                          {[...Array(totalPages)].map(
                            (_, index) =>
                              index + 1 <= page + 2 &&
                              index + 1 >= page - 2 && (
                                <Pagination.Item
                                  key={index + 1}
                                  active={page === index + 1}
                                  onClick={() => setPage(index + 1)}
                                >
                                  {index + 1}
                                </Pagination.Item>
                              )
                          )}
                          <Pagination.Next
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                          />
                        </Pagination>
                      </div>
                    </div>
                  </span>
                </span>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

const AllSolutions = ({
  users,
  mentions,
  isAdmin,
  actionsMemo,
  contextActions,
  handleDelete,
  optionsThematique,
}) => {
  const [conformSolutions, setConformSolutions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);
  const [selectedOptionsThematique, setSelectedOptionsThematique] =
    useState(null);
  const [optionIdThematique, setOptionIdThematique] = useState(null);

  useEffect(() => {
    const fetchConformedSolutions = async () => {
      setIsLoadingSolution(true);
      try {
        const responseSolutionConformed = await axios.get(
          `/solutions?page=${page}`
        );
        setConformSolutions(responseSolutionConformed?.data?.data);
        setTotalPages(45);
        setIsLoadingSolution(false);
      } catch (error) {
        setIsLoadingSolution(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchConformedSolutions();
  }, [page]);

  const [filters, setFilters] = useState({
    searchText: "",
    statusFilter: "Tous",
    thematicFilter: "Tous",
  });

  const dataConformSolutionsMerged = useMemo(() => {
    const mergeDataConformSolutions = (solutions, users) => {
      const userMap = {};
      users.forEach((user) => {
        userMap[user.id] = user;
      });

      return solutions?.map((solution) => ({
        ...solution,
        user: userMap[solution.userId],
      }));
    };

    return mergeDataConformSolutions(conformSolutions, users);
  }, [conformSolutions, users]);

  const filteredConformSolutions = useMemo(() => {
    return dataConformSolutionsMerged?.filter((solution) => {
      if (!dataConformSolutionsMerged) {
        return false;
      }
      const textMatch =
        solution.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.name
          .toLowerCase()
          .includes(filters.searchText.toLowerCase()) ||
        solution.user?.email
          .toLowerCase()
          .includes(filters.searchText.toLowerCase());
      const statusMatch =
        filters.statusFilter === "Tous" ||
        solution?.status?.name === filters.statusFilter;
      const thematicMatch =
        filters.thematicFilter === "Tous" ||
        solution?.thematic?.name === filters.thematicFilter;
      return textMatch && statusMatch && thematicMatch;
    });
  }, [dataConformSolutionsMerged, filters]);

  const dataConformSolutionsMergedWithCote = useMemo(() => {
    if (isAdmin && filteredConformSolutions) {
      return filteredConformSolutions
        .map((solution) => {
          const lastFeedback = solution.feedbacks.slice(-1)[0];
          if (lastFeedback) {
            const feedbacks = lastFeedback.quotations
              .split(",")
              .map((id) => parseInt(id, 10));
            const coteTotal = feedbacks.reduce((total, id) => {
              const mention = mentions.find((mention) => mention.id === id);
              return total + (mention ? mention.average : 0);
            }, 0);
            return { ...solution, cote: (coteTotal / 40) * 100 };
          } else {
            return { ...solution, cote: 0 };
          }
        })
        .sort((a, b) => b.cote - a.cote);
    }
  }, [filteredConformSolutions, mentions, isAdmin]);

  const handleSelectChangeThematic = (selectedOption) => {
    setSelectedOptionsThematique(selectedOption);
    setFilters({ ...filters, thematicFilter: selectedOption?.label || "all" });
  };

  const columns = configureColumns(handleDelete);

  columns.forEach((column) => {
    if (column.name === "Actions") {
      column.width = "30%";
    }
  });

  return (
    <>
      <Col lg={12} className="w-full">
        <Card className="custom-card">
          <Card.Body>
            {isLoadingSolution ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <div className="table-responsive ">
                <Row>
                  <Col xs={12} md={12} lg={6} xl={6}>
                    <Form>
                      <FormGroup className="form-group">
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder="Search by solution title, innovator name, or email"
                          value={filters.searchText}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              searchText: e.target.value,
                            })
                          }
                        />
                      </FormGroup>
                    </Form>
                  </Col>

                  <Col xs={12} md={12} lg={6} xl={6}>
                    <div className=" SlectBox">
                      <Select
                        classNamePrefix="selectform"
                        onChange={handleSelectChangeThematic}
                        options={optionsThematique}
                        placeholder="Filter by Theme"
                      />
                    </div>
                  </Col>
                </Row>
                <span className="datatable">
                  <span className="uselistdata">
                    <DataTable
                      columns={columns}
                      data={dataConformSolutionsMergedWithCote}
                      actions={actionsMemo}
                      contextActions={contextActions}
                      selectableRows
                    />
                    <div className="text-wrap">
                      <div className="example">
                        <Pagination className=" mb-0 mb-0 pagination-sm ">
                          <Pagination.Prev
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                          />
                          {[...Array(totalPages)].map(
                            (_, index) =>
                              index + 1 <= page + 2 &&
                              index + 1 >= page - 2 && (
                                <Pagination.Item
                                  key={index + 1}
                                  active={page === index + 1}
                                  onClick={() => setPage(index + 1)}
                                >
                                  {index + 1}
                                </Pagination.Item>
                              )
                          )}
                          <Pagination.Next
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                          />
                        </Pagination>
                      </div>
                    </div>
                  </span>
                </span>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default Solutionslistcom;
