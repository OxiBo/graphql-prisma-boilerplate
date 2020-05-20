import "cross-fetch/polyfill";
import { gql } from "apollo-boost";
import prisma from "../src/prisma";

import getClient from "./utils/getClient";
import seedDatabase, { userOne } from "./utils/seedDatabase";
import { createUser, getUsers, login, getProfile } from "./utils/operations";
const client = getClient();

beforeEach(seedDatabase);

test("Should create a new user", async () => {
  const variables = {
    data: {
      name: "Jen0",
      email: "jen0@example.com",
      password: "12345678",
    },
  };

  const response = await client.mutate({
    mutation: createUser,
    variables,
  });
  //   console.log(JSON.stringify(response.data, null, 3));
  const userExist = await prisma.exists.User({
    id: response.data.createUser.user.id,
  });

  expect(userExist).toBe(true);
});

test("Should expose public author profiles", async () => {
  const response = await client.query({ query: getUsers });
  expect(response.data.users.length).toBe(2);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe("Dave");
});

test("Should not login with bad credentials", async () => {
  const variables = {
    data: {
      email: "dave@example.com",
      password: "xxqwertyuy",
    },
  };

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});

test("Should not signup user with invalid password", async () => {
  const variables = {
    data: {
      name: "Dan",
      email: "dan@gmail.com",
      password: "1234",
    },
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test("Should fetch user profile", async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({
    query: getProfile,
  });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
