// import uuidv4 from "uuid/v4"; - uninstalled
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

// const token = jwt.sign({id: "12344"}, "secret")
// const decoded = jwt.decode(token);
// const decoded2 = jwt.verify(token, "secret")

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async loginUser(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });
    if (!user) {
      throw new Error("Unable to log in, user not found");
    }
    const isMatch = await bcrypt.compare(args.data.password, user.password);
    if (!isMatch) {
      throw new Error("Unable to log in, password is incorrect");
    }

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    // console.log(args)
    // const userExists = await prisma.exists.User({ id: args.id });

    // if (!userExists) {
    //   throw new Error("User not found");
    // }
    const userId = getUserId(request);

    return prisma.mutation.deleteUser(
      {
        where: {
          // id: args.id,
          id: userId,
        },
      },
      info
    );
  },
  async updateUser(parent, args, { db, prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === "string") {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          // id: args.id,
          id: userId,
        },
        data: args.data,
      },
      info
    );
  },
};

export { Mutation as default };
