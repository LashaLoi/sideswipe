export const createAction = () => {
  const action = params => action.cb(params);

  return action;
};
