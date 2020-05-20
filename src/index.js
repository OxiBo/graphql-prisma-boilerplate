//https://alligator.io/graphql/prisma-with-nodejs-setup/
//https://alligator.io/graphql/prisma-bindings/
// https://v1.prisma.io/forum/t/prisma-client-and-prisma-binding-used-in-tandem/5947
import '@babel/polyfill/noConflict';

import server from './server'

server.start({ port: process.env.PORT || 4000}, () => {
  console.log("The server started");
});
