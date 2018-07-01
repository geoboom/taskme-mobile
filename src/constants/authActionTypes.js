const authActionsMap = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  USER_GET: 'user.get',
  ACCESS_TOKEN_GET: 'accessToken.get',
};

const reqSucFai = (actionsMap) => {
  const actionNames = Object.keys(actionsMap);
  let actionName;
  const actionReqSucFaiMap = {};

  for (let i = 0; i < actionNames.length; i += 1) {
    actionName = actionNames[i];
    actionReqSucFaiMap[`${actionName}_REQUEST`] = `${actionsMap[actionName]}.request`;
    actionReqSucFaiMap[`${actionName}_SUCCESS`] = `${actionsMap[actionName]}.success`;
    actionReqSucFaiMap[`${actionName}_FAILURE`] = `${actionsMap[actionName]}.failure`;
  }
  return actionReqSucFaiMap;
};

const extra = {
  LOGOUT: 'logout',
  AUTH_LOCAL_SUCCESS: 'auth.local.success',
  AUTH_LOCAL_FAILURE: 'auth.local.failure',
};

export default {
  ...reqSucFai(authActionsMap),
  ...extra,
};

