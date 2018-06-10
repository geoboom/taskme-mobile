import { jobTaskActionTypes as actionTypes } from '../constants';

const initialState = {
  tasks: {},
  assignedTasks: {},
  tasksLoading: true,
  taskPending: {},
  taskFormLoading: false,
  assignmentPending: {},
  assignmentFormLoading: false,
  assignmentActivitiesPending: {},
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TASK: {
      const { d, r } = action.payload;
      if (r) {
        return {
          ...state,
          tasks: {
            ...state.tasks,
            [d._id]: d,
          },
          assignedTasks: {
            ...state.assignedTasks,
            [d._id]: d,
          },
        };
      }
      break;
    }
    case actionTypes.TASK_GET_ALL: {
      const { d, r } = action.payload;
      if (r) {
        const transformed = {};
        d.forEach((task) => {
          transformed[task._id] = task;
        });

        return {
          ...state,
          tasksLoading: false,
          tasks: transformed,
        };
      }
      break;
    }
    case actionTypes.TASK_GET_ASSIGNED: {
      const { d, r } = action.payload;
      if (r) {
        const transformed = {};
        d.forEach((task) => {
          transformed[task._id] = task;
        });

        return {
          ...state,
          tasksLoading: false,
          assignedTasks: transformed,
        };
      }
      break;
    }
    case actionTypes.TASK_ADD_ERROR: {
      const { i } = action.payload;

      return {
        ...state,
        taskFormLoading: false,
        taskPending: {},
      };
    }
    case actionTypes.TASK_ADD: {
      const { d, i, r } = action.payload;
      if (r && state.taskPending[i]) {
        return {
          ...state,
          taskFormLoading: false,
          tasks: {
            ...state.tasks,
            [d._id]: {
              ...state.taskPending[i],
              ...d,
            },
          },
        };
      }

      return {
        ...state,
        taskFormLoading: true,
        taskPending: {
          [i]: { ...d, pending: true },
        },
      };
    }
    case actionTypes.TASK_EDIT_ERROR: {
      const { d } = action.payload;
      return {
        ...state,
        taskFormLoading: false,
        tasks: {
          ...state.tasks,
          [d._id]: { ...state.tasks[d._id], pending: false },
        },
      };
    }
    case actionTypes.TASK_EDIT: {
      const { d, r } = action.payload;
      if (r) {
        // message from server
        return {
          ...state,
          taskFormLoading: false,
          tasks: {
            ...state.tasks,
            [d._id]: {
              ...d,
              pending: false,
            },
          },
        };
      }

      // message from client
      return {
        ...state,
        taskFormLoading: true,
        tasks: {
          ...state.tasks,
          [d._id]: { ...state.tasks[d._id], pending: true },
        },
      };
    }
    case actionTypes.TASK_REMOVE_ERROR: {
      const { d } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [d._id]: { ...state.tasks[d._id], pending: false },
        },
      };
    }
    case actionTypes.TASK_REMOVE: {
      const { d, r } = action.payload;
      if (r) {
        // message from server
        return {
          ...state,
          tasks: {
            ...state.tasks,
            [d._id]: {
              ...state.tasks[d._id],
              pending: false,
              softDel: true,
            },
          },
        };
      }

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [d._id]: { ...state.tasks[d._id], pending: true },
        },
      };
    }
    // task admin complete
    case actionTypes.TASK_ADD_ASSIGNMENT: {
      const { d, r, i } = action.payload;
      if (r) {
        // message from server
        return {
          ...state,
          assignmentFormLoading: false,
          tasks: {
            ...state.tasks,
            [d._id]: {
              ...d,
              pending: false,
            },
          },
        };
      }

      // message from client
      return {
        ...state,
        assignmentFormLoading: true,
        assignmentPending: {
          [i]: { ...d, pending: true },
        },
      };
    }
    case actionTypes.TASK_ASSIGNMENT_ACTIVITY: {
      const { d, r } = action.payload;
      if (r) {
        return {
          ...state,
          tasks: {
            ...state.tasks,
            [d._id]: {
              ...d,
              pending: false,
            },
          },
        };
      }

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [d.taskId]: { ...state.tasks[d.taskId], pending: true },
        },
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
