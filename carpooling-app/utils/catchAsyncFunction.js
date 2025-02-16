export const catchAsyncFunction = (fn) => {
  return (request, response, next) => {
    fn(request, response, next).catch(next);
  };
};
