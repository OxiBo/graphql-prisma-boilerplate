import jwt from "jsonwebtoken";

const getUserId = (request, requireAuth = true) => {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userID ? decoded.userID : decoded.userId ? decoded.userId : null;

      // waiting for Andrew to respond - https://www.udemy.com/course/graphql-bootcamp/learn/lecture/11917838#questions/7760234
    return userId
  }
  if (requireAuth) {
    throw new Error("Authentication required");
  }
  return null;
};

export { getUserId as default };
