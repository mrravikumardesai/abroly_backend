// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerAPIsFiles from "./allFilesApiDocConfig";
// import swaggerUi from "swagger-ui-express";

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "API Documentation",
//             description: "All API endpoints of the Prisvid project.",
//             version: "1.0.0",
//         },
//         // servers: [
//         //     {
//         //         url: "http://192.168.0.141:3000",
//         //         description: "Local Development Server",
//         //     },
//         // ],
//     },
//     apis: swaggerAPIsFiles,
// };
// const swaggerSpec = swaggerJSDoc(options);


// function swaggerDocs(app: any) {
//     app.use("/api-doc",
//         swaggerUi.serve,
//         swaggerUi.setup(swaggerSpec))
// }

// export default swaggerDocs