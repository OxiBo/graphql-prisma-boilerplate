import prisma from "../../src/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userOne = {
  input: {
    name: "Dave",
    email: "dave@example.com",
    password: bcrypt.hashSync("qwertyuy"),
  },
  user: undefined,
  jwt: undefined,
};

const userTwo = {
  input: {
    name: "Danny",
    email: "danny@example.com",
    password: bcrypt.hashSync("qwertyuy"),
  },
  user: undefined,
  jwt: undefined,
};

const seedDatabase = async () => {
  //delete test data

  await prisma.mutation.deleteManyUsers();
  //create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });

  userOne.jwt = jwt.sign(
    {
      userId: userOne.user.id,
    },
    process.env.JWT_SECRET
  );

  //create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  });

  userTwo.jwt = jwt.sign(
    {
      userId: userTwo.user.id,
    },
    process.env.JWT_SECRET
  );
};

export { seedDatabase as default, userOne, userTwo };
