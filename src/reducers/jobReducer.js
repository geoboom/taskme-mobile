import { jobTaskActionTypes as actionTypes } from '../constants';

const initialState = {
  jobs: [],
  categories: [],
  components: [],
  viewingJobId: null,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOB_DETAILS_VIEW:
      return {
        ...state,
        viewingJobId: action.jobId,
      };
    case actionTypes.JOB_DETAILS_UNVIEW:
      return {
        ...state,
        viewingJobId: null,
      };
    case actionTypes.JOB_GET_ALL:
      return {
        ...state,
        jobs: action.payload,
      };
    case actionTypes.JOB_ADD:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
    case actionTypes.JOB_EDIT:
      return {
        ...state,
        jobs: state.jobs.map(job =>
          (job._id.toString() === action.payload._id.toString()
            ?
            action.payload
            :
            job)),
      };
    case actionTypes.JOB_REMOVE:
      return {
        ...state,
        jobs: state.jobs.map(job =>
          (job._id.toString() === action.payload._id.toString()
            ?
            null
            :
            job)),
      };
    case actionTypes.JOB_CATEGORY_GET_ALL:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.JOB_CATEGORY_ADD:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case actionTypes.JOB_CATEGORY_REMOVE:
      return {
        ...state,
        categories: state.categories.map(category =>
          (category === action.payload
            ?
            null
            :
            category)),
      };
    case actionTypes.JOB_COMPONENT_GET_ALL:
      return {
        ...state,
        components: action.payload,
      };
    case actionTypes.JOB_COMPONENT_ADD:
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    case actionTypes.JOB_COMPONENT_REMOVE:
      return {
        ...state,
        components: state.components.map(component =>
          (component === action.payload
            ?
            null
            :
            component)),
      };
    default:
      return state;
  }
};

export default jobReducer;
