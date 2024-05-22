const analytics = () => next => action => {
  if (typeof window === 'object') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action.type,
      payload: action.result,
    });
  }
  return next(action);
};

export default analytics;
