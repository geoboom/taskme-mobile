import { jobTaskActionTypes as actionTypes } from '../constants';

export function getAllTasks() {
  return {
    type: actionTypes.TASK_GET_ALL,
  };
}

export function addTask(jobId, title, description, type, dueOn) {
  return {
    type: actionTypes.TASK_ADD,
    payload: {
      jobId,
      title,
      description,
      type,
      dueOn,
    },
  };
}

export function editTask(_id, title, description) {
  return {
    type: actionTypes.TASK_EDIT,
    payload: {
      _id,
      title,
      description,
    },
  };
}

export function removeTask(_id) {
  return {
    type: actionTypes.TASK_REMOVE,
    payload: { _id },
  };
}

export function adminCompleteTask(_id) {
  return {
    type: actionTypes.TASK_ADMIN_COMPLETE,
    payload: _id,
  };
}

export function addAssignment(taskId, assignedTo) {
  return {
    type: actionTypes.TASK_ADD_ASSIGNMENT,
    payload: {
      taskId,
      assignedTo,
    },
  };
}

export function removeAssignment(taskId, assignedTo) {
  return {
    type: actionTypes.TASK_REMOVE_ASSIGNMENT,
    payload: {
      taskId,
      assignedTo,
    },
  };
}

export function promoteAssignment(taskId, assignedTo) {
  return {
    type: actionTypes.TASK_PROMOTE_ASSIGNMENT,
    payload: {
      taskId,
      assignedTo,
    },
  };
}

export function assignmentActivity(taskId, activity) {
  return {
    type: actionTypes.TASK_ASSIGNMENT_ACTIVITY,
    payload: {
      taskId,
      activity,
    },
  };
}

