import axios from "@/pages/api/axios";

export const GET_SOLUTIONS = "GET_SOLUTIONS";
export const GET_SOLUTIONS_CONFORMS = "GET_SOLUTIONS_CONFORMS";
export const GET_SOLUTIONS_CURATED = "GET_SOLUTIONS_CURATED";
export const ADD_SOLUTION = "ADD_SOLUTION";
export const UPDATE_SOLUTION = "UPDATE_SOLUTION";

export const getSolutions = () => async (dispatch) => {
  try {
    const response = await axios.get("/solutions");
    dispatch({ type: GET_SOLUTIONS, payload: response?.data?.data });
  } catch (error) {
    console.error(error);
  }
};

export const getSolutionsCurated = () => async (dispatch) => {
  try {
    const response = await axios.get("/solutions/curated/all");
    dispatch({ type: GET_SOLUTIONS_CURATED, payload: response?.data?.data });
  } catch (error) {
    console.error(error)
  }
};

export const getSolutionsConforms = () => async (dispatch) => {
  try {
    const response = await axios.get("/solutions/conforms/all");
    dispatch({ type: GET_SOLUTIONS_CONFORMS, payload: response?.data?.data });
  } catch (error) {
    console.error(error)
  }
}


export const addSolution = (solution) => async (dispatch) => {
  try {
    const response = await axios.post("/solutions", solution);
    dispatch({ type: ADD_SOLUTION, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const updateSolution = (solution) => async (dispatch) => {
  try {
    const response = await axios.put(`/solutions/${solution.id}`, solution);
    dispatch({ type: UPDATE_SOLUTION, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};
