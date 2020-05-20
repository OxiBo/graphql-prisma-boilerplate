import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  if (password.length < 8 || password.length > 20) {
    throw new Error("Password must be 8 characters but not  longer than 20");
  }
  return bcrypt.hash(password, 10);

};

export { hashPassword as default };
