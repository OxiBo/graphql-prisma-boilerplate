import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers/index";
const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
});

export { prisma as default };

// prisma.query, prisma.mutation, prisma.subscription, prisma.exists

// prisma.exists
//   .Post({
//     id: "ck8ia788d010l0742o7klcfm6"
//   })
//   .then(data => console.log(JSON.stringify(data, undefined, 2)));

// 1. Create a new post
// 2. Fetch all of the info about the user (the author)
// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });
//   if (!userExists) {
//     throw new Error("User not found");
//   }
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     "{ id author { id name email posts { id title published }} }"
//   );
//   //   const user = await prisma.query.user(
//   //     {
//   //       where: {
//   //         id: authorId
//   //       }
//   //     },
//   //     " { id name email posts{ id title published }}"
//   //   );
//   //   return user;
//   return post.author;
// };

// // createPostForUser("ck8j7qvlw01t30742yuzzgmr6", {
// //   title: "222Great books2",
// //   body: "skdjfa;lskjdfa;sdf",
// //   published: true
// // })
// //   .then(user => console.log(JSON.stringify(user, undefined, 2)))
// //   .catch(error => console.error(error.message));

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });
//   if (!postExists) {
//     throw new Error("Post is not found!");
//   }
//   const post = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postId
//       },
//       data
//     },
//     "{ author { id name email posts{ id title published } } }"
//   );
//   //   const user = await prisma.query.user(
//   //     {
//   //       where: {
//   //         id: post.author.id
//   //       }
//   //     },
//   //     "{ id name email posts{ id title published }}"
//   //   );
//   return post;
// };

// updatePostForUser("ck8ia788d010l0742o7klcfm6", {
//   title: "UPDATE   LETS CHECK THE OBJECT I am updating the post", published: false
// })
//   .then(user => console.log(JSON.stringify(user, undefined, 2)))
//   .catch(error => console.log(error.message));

// prisma.query.users(null, "{id name email, posts { title } }").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, "{id text, author { name } }").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "My 4th post from node",
//         body: "blah lbah",
//         published: false,
//         author: {
//           connect: {
//             id: "ck8j7qvlw01t30742yuzzgmr6"
//           }
//         }
//       }
//     },
//     "{ id title published author { name }}"
//   )
//   .then(data => {
//     console.log(data);

//     return prisma.query.users(
//       null,
//       "{id name email, posts { id, title, published } }"
//     );
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation
//   .updatePost(
//     {
//       where: {
//         id: "ck8nlayeq05rc0742fmk6le3m"
//       },
//       data: {
//         published: true,
//         body: "I updated it again"
//       }
//     },
//     "{id title body published author { name } }"
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.posts(null, "{ id title body published }");
//   })
//   .then(data => console.log(data));
