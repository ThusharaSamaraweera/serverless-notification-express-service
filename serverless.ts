import type { AWS } from "@serverless/typescript";
const serverlessConfiguration: AWS = {
  service: "serverless-notification-express-service",
  frameworkVersion: "3",
  useDotenv: true,
  plugins: ["serverless-dotenv-plugin", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    region: "us-east-1",
    stage: "dev",
    logs: {
      restApi: true,
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    }
  },
  functions: {
    app: {
      handler: "dist/app.handler",
      events: [
        {
          http: {
            method: "ANY",
            path: "/",
          },
        },
        {
          http: {
            method: "ANY",
            path: "/{proxy+}",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;