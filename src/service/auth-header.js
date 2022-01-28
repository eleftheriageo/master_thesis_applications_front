export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user.token);
  if (user && user.token) {
    return {
      Authorization: "Bearer " + user.token,
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
    }; // for Spring Boot back-end
  } else {
    return {};
  }
}
