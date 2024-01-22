const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const {movieId} = request.params;
  const movie = await service.read(movieId);

  if (movie){
    response.locals.movie = movie;
    return next();
  }
  next({status: 404, message: `Movie with ID ${movieId} not found`});
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  const {is_showing} = request.query;
  let boolValue = (is_showing === "true"); 
  const data = await service.list(boolValue)

  // TODO: Add your code here.
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists: [asyncErrorBoundary(movieExists)]
};
