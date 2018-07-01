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

const taskArrayToObject = (arr) => {
  const transformed = {};

  arr.forEach((a) => {
    transformed[a._id] = a;
  });

  return transformed;
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOB: {
      const { d, r } = action.payload;
      if (r && d.deleted) {
        // job.deleted, remove all associated tasks
        const tasks = {};
        Object.values(state.tasks).forEach((task) => {
          if (!(task.jobId === d._id)) {
            tasks[task._id] = task;
          }
        });
        return {
          ...state,
          tasks,
        };
      }
      // if !job.deleted ignore
      return state;
    }
    case actionTypes.TASK_GET_ALL: {
      const { d, r } = action.payload;
      if (r) {
        const transformed = taskArrayToObject(d);

        return {
          ...state,
          tasksLoading: false,
          tasks: transformed,
        };
      }

      return state;
    }
    case actionTypes.TASK_GET_ASSIGNED: {
      const { d, r } = action.payload;
      if (r) {
        const transformed = taskArrayToObject(d);

        return {
          ...state,
          tasksLoading: false,
          tasks: transformed,
        };
      }

      return state;
    }
    case actionTypes.TASK: {
      const { d, r } = action.payload;
      if (r) {
        return {
          ...state,
          tasks: {
            ...state.tasks,
            [d._id]: d,
          },
        };
      }

      return state;
    }
    case actionTypes.TASK_ADD_ERROR: {
      const { i } = action.payload;

      return {
        ...state,
        taskFormLoading: false,
        taskPending: {}, // only one pending task at any given time
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
              deleted: true,
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
    case actionTypes.TASK_ADMIN_COMPLETE_ERROR: {
      const { d } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [d._id]: { ...state.tasks[d._id], pending: false },
        },
      };
    }
    case actionTypes.TASK_ADMIN_COMPLETE: {
      const { d, r } = action.payload;

      if (r) {
        return {
          ...state,
          tasks: {
            ...state.tasks,
            [d._id]: {
              ...state.tasks[d._id],
              pending: false,
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
    // case actionTypes.TASK_REMOVE_ASSIGNMENT: {
    //   const { d, r } = action.payload;
    //   console.log('testing', d);
    //   if (r) {
    //     return {
    //       ...state,
    //       tasks: {
    //         ...state.tasks,
    //         [d._id]: {
    //           ...d,
    //           pending: false,
    //         },
    //       },
    //     };
    //   }
    //
    //   return {
    //     ...state,
    //     tasks: {
    //       ...state.tasks,
    //       [d.taskId]: { ...state.tasks[d.taskId], state.tasks[d.taskId].assignments},
    //     },
    //   };
    // }
    // case actionTypes.TASK_REMOVE_ASSIGNMENT_ERROR: {
    //   const { d, r } = action.payload;
    //   if (r) {
    //     return {
    //       ...state,
    //       tasks: {
    //         ...state.tasks,
    //         [d._id]: {
    //           ...d,
    //           pending: false,
    //         },
    //       },
    //     };
    //   }
    //
    //   return {
    //     ...state,
    //     tasks: {
    //       ...state.tasks,
    //       [d.taskId]: { ...state.tasks[d.taskId], pending: true },
    //     },
    //   };
    // }
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
    case actionTypes.TASK_ASSIGNMENT_ACTIVITY_ERROR: {
      const { d } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [d.taskId]: { ...state.tasks[d.taskId], pending: false },
        },
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
