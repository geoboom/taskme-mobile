import { jobTaskActionTypes as actionTypes } from '../constants';

export function getAllJobs() {
  return {
    type: actionTypes.JOB_GET_ALL,
  };
}

export function addJob(title, description, category, component) {
  return {
    type: actionTypes.JOB_ADD,
    payload: {
      title,
      description,
      category,
      component,
    },
  };
}

export function editJob(_id, title, description, category, component) {
  return {
    type: actionTypes.JOB_EDIT,
    payload: {
      _id,
      title,
      description,
      category,
      component,
    },
  };
}

export function removeJob(_id) {
  return {
    type: actionTypes.JOB_REMOVE,
    payload: { _id },
  };
}

export function getAllCategories() {
  return {
    type: actionTypes.JOB_CATEGORY_GET_ALL,
  };
}

export function addCategory(category) {
  return {
    type: actionTypes.JOB_CATEGORY_ADD,
    payload: { category },
  };
}

export function removeCategory(_id) {
  return {
    type: actionTypes.JOB_CATEGORY_REMOVE,
    payload: { _id },
  };
}

export function getAllComponents() {
  return {
    type: actionTypes.JOB_COMPONENT_GET_ALL,
  };
}

export function addComponent(component) {
  return {
    type: actionTypes.JOB_COMPONENT_ADD,
    payload: { component },
  };
}

export function removeComponent(_id) {
  return {
    type: actionTypes.JOB_COMPONENT_REMOVE,
    payload: { _id },
  };
}
