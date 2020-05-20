import { jobTaskActionTypes as actionTypes } from '../constants';

const initialState = {
  jobs: {},
  jobsLoading: true,
  jobPending: {},
  jobFormLoading: false,
  categories: {},
  categoriesPending: {},
  components: {},
  componentsPending: {},
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOB: {
      const { d, r } = action.payload;
      if (r) {
        return {
          ...state,
          jobs: {
            ...state.jobs,
            [d._id]: d,
          },
        };
      }

      return state;
    }
    case actionTypes.JOB_GET_ALL: {
      const { d, r } = action.payload; // d is an array of jobs
      if (r) {
        const transformed = {};
        d.forEach((job) => {
          transformed[job._id] = job;
        });

        return {
          ...state,
          jobsLoading: false,
          jobs: transformed,
        };
      }

      return state;
    }
    case actionTypes.JOB_ADD_ERROR: {
      const { i } = action.payload;

      return {
        ...state,
        jobFormLoading: false,
        jobPending: {},
      };
    }
    case actionTypes.JOB_ADD: {
      const { d, i, r } = action.payload;
      if (r && state.jobPending[i]) {
        // message from server
        // we should transfer job in jobPending to jobs

        return {
          ...state,
          jobFormLoading: false,
          jobs: {
            ...state.jobs,
            [d._id]: {
              ...state.jobPending[i],
              ...d,
            },
          },
          jobPending: {},
        };
      }

      // TODO: cleanup in JOB_ADD_ERROR
      // message from client
      return {
        ...state,
        jobFormLoading: true,
        jobPending: { // only one pending job at a time
          [i]: { ...d, pending: true },
        },
      };
    }
    case actionTypes.JOB_EDIT_ERROR: {
      const { d } = action.payload;
      return {
        ...state,
        jobFormLoading: false,
        jobs: {
          ...state.jobs,
          [d._id]: { ...state.jobs[d._id], pending: false },
        },
      };
    }
    case actionTypes.JOB_EDIT: {
      const { d, r } = action.payload;
      if (r) {
        // message from server
        return {
          ...state,
          jobFormLoading: false,
          jobs: {
            ...state.jobs,
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
        jobFormLoading: true,
        jobs: {
          ...state.jobs,
          [d._id]: { ...state.jobs[d._id], pending: true },
        },
      };
    }
    case actionTypes.JOB_REMOVE_ERROR: {
      const { d } = action.payload;
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [d._id]: { ...state.jobs[d._id], pending: false },
        },
      };
    }
    case actionTypes.JOB_REMOVE: {
      const { d, r } = action.payload;
      if (r) {
        // message from server
        return {
          ...state,
          jobs: {
            ...state.jobs,
            [d._id]: {
              ...state.jobs[d._id],
              pending: false,
              deleted: true,
            },
          },
        };
      }

      // message from client
      return {
        ...state,
        jobs: {
          ...state.jobs,
          [d._id]: { ...state.jobs[d._id], pending: true },
        },
      };
    }
    case actionTypes.JOB_CATEGORY: {
      const { d, r } = action.payload;
      // handles add/edit/remove
      if (r) {
        return {
          ...state,
          categories: {
            ...state.categories,
            [d._id]: d,
            // replaces completely the object by that returned from server
          },
        };
      }
      return state;
    }
    case actionTypes.JOB_CATEGORY_GET_ALL: {
      const { d, r } = action.payload;
      if (r) {
        const transformed = {};
        d.forEach((category) => {
          transformed[category._id] = category;
        });

        return {
          ...state,
          categories: transformed,
        };
      }
      return state;
    }
    case actionTypes.JOB_CATEGORY_ADD: {
      const { i, r, d } = action.payload;
      if (r && state.categoriesPending[i]) {
        // message from server
        const keep = {};
        const ids = Object.keys(state.categoriesPending);
        let id;
        for (let j = 0; j < ids.length; j += 1) {
          id = ids[j];
          if (id !== i) keep[id] = state.categoriesPending[id];
        }

        return {
          ...state,
          categories: {
            ...state.categories,
            [d._id]: {
              ...state.categoriesPending[i],
              ...d,
            },
          },
          categoriesPending: {
            ...keep,
          },
        };
      }

      // TODO: cleanup categoriesPending in JOB_CATEGORY_ADD_ERROR
      // message from client
      return {
        ...state,
        categoriesPending: {
          ...state.categoriesPending,
          [i]: { ...d, pending: true },
        },
      };
    }
    case actionTypes.JOB_CATEGORY_REMOVE: {
      const { d, r } = action.payload;
      if (r) {
        // message from server
        return {
          ...state,
          categories: {
            ...state.categories,
            [d._id]: {
              ...state.categories[d._id],
              pending: false,
              deleted: true,
            },
          },
        };
      }

      // message from client
      return {
        ...state,
        categories: {
          ...state.categories,
          [d._id]: { ...state.categories[d._id], pending: true },
        },
      };
    }
    case actionTypes.JOB_COMPONENT: {
      const { d, r } = action.payload;
      if (r) {
        return {
          ...state,
          components: {
            ...state.components,
            [d._id]: d,
          },
        };
      }

      return state;
    }
    case actionTypes.JOB_COMPONENT_GET_ALL: {
      const { d, r } = action.payload;
      if (r) {
        const transformed = {};
        d.forEach((component) => {
          transformed[component._id] = component;
        });

        return {
          ...state,
          components: transformed,
        };
      }

      return state;
    }
    case actionTypes.JOB_COMPONENT_ADD: {
      const { i, r, d } = action.payload;
      if (r && state.componentsPending[i]) {
        // message from server
        const keep = {};
        const ids = Object.keys(state.componentsPending);
        let id;
        for (let j = 0; j < ids.length; j += 1) {
          id = ids[j];
          if (id !== i) keep[id] = state.componentsPending[id];
        }

        return {
          ...state,
          components: {
            ...state.components,
            [d._id]: {
              ...state.componentsPending[i],
              ...d,
            },
          },
          componentsPending: {
            ...keep,
          },
        };
      }

      // message from client
      return {
        ...state,
        componentsPending: {
          ...state.componentsPending,
          [i]: { ...d, pending: true },
        },
      };
    }
    case actionTypes.JOB_COMPONENT_REMOVE: {
      const { d, r } = action.payload;
      if (r) {
        // message from server

        return {
          ...state,
          components: {
            ...state.components,
            [d._id]: {
              ...state.components[d._id],
              pending: false,
              deleted: true,
            },
          },
        };
      }

      // message from client
      return {
        ...state,
        components: {
          ...state.components,
          [d._id]: { ...state.components[d._id], pending: true },
        },
      };
    }
    default:
      return state;
  }
};

export default jobReducer;
