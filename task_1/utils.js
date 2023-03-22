//simple function for checking parameters, probably not the best technical solution
function checkIfParamsValid(min_age, max_age, limit) {
  //i made parameters optional
  if (typeof min_age !== "undefined") {
    var min_age_int = parseInt(min_age, 10);
    if (isNaN(min_age_int) || min_age_int < 16 || min_age_int > 100) {
      return false;
    }
  }

  if (typeof max_age !== "undefined") {
    let max_age_int = parseInt(max_age, 10);
    if (
      isNaN(max_age_int) ||
      (typeof min_age_int != "undefined" && max_age_int < min_age_int) ||
      max_age_int > 100 ||
      max_age_int < 0
    ) {
      return false;
    }
  }

  if (typeof limit !== "undefined") {
    let limit_int = parseInt(limit, 10);
    if (isNaN(limit_int) || limit_int < 0) {
      return false;
    }
  }
  return true;
}

const getUsers = function (query, users) {
  let type = query["type"];
  let name = query["fullnameSearch"];
  let min_age = query["minAge"];
  let max_age = query["maxAge"];
  let limit = query["limit"];

  let parametersValid = checkIfParamsValid(min_age, max_age, limit);

  if (!parametersValid) {
    throw new Error("Invalid parameters");
  }

  let filtered_users = users.filter(
    (user_data) =>
      (typeof type === "undefined" || user_data.type === type) &&
      (typeof name === "undefined" || user_data.name === name) &&
      (typeof min_age === "undefined" ||
        user_data.age >= parseInt(min_age, 10)) &&
      (typeof max_age === "undefined" || user_data.age <= parseInt(max_age, 10))
  );

  return filtered_users.slice(0, limit);
};

module.exports = getUsers;
