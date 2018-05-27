import { jobTaskActionTypes as actionTypes } from '../constants';

const initialState = {
  tasks: [],
  viewingTaskId: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TASK_DETAILS_VIEW:
      return {
        ...state,
        viewingTaskId: action.taskId,
      };
    case actionTypes.TASK_DETAILS_UNVIEW:
      return {
        ...state,
        viewingTaskId: null,
      };
    case actionTypes.TASK_GET_ALL:
      return {
        ...state,
        viewingTaskId: action.taskId,
      };
    case actionTypes.TASK_ADD:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case actionTypes.TASK_EDIT:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          (task._id.toString() === action.payload._id.toString()
            ?
            action.payload
            :
            task)),
      };
    case actionTypes.TASK_REMOVE:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          (task._id.toString() === action.payload._id.toString()
            ?
            null
            :
            task)),
      };
    // case actionTypes.TASK_ADMIN_COMPLETE:
    //   return {
    //     ...state,
    //     tasks: state.tasks.map(task =>
    //       (task._id.toString() === action.payload._id.toString()
    //         ?
    //         {
    //           ...task,
    //           completedBy: action.payload.completedBy,
    //         }
    //         :
    //         task)),
    //   };
    default:
      return state;
  }
};

export default taskReducer;
