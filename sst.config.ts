/// <reference path="./.sst/platform/config.d.ts" />

/**
 * ## AWS EFS with SQLite
 *
 * Mount an EFS file system to a function and write to a SQLite database.
 *
 * ```js title="index.ts"
 * const db = sqlite3("/mnt/efs/mydb.sqlite");
 * ```
 *
 * The file system is mounted to `/mnt/efs` in the function.
 *
 * :::note
 * Given the performance of EFS, it's not recommended to use it for databases.
 * :::
 *
 * This example is for demonstration purposes only. It's not recommended to use
 * EFS for databases in production.
 */
export default $config({
  app(input) {
    return {
      name: "aws-efs-sqlite",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    // NAT Gateways are required for Lambda functions
    const vpc = new sst.aws.Vpc("MyVpc", { nat: "managed" });

    // This function will get {"better-sqlite3": "11.4.0"}
    new sst.aws.Function("MyFunction", {
      vpc,
      url: true,
      handler: "index.handler",
      nodejs: {
        install: ["better-sqlite3"],
      },
    });

    // This function will get {"pg": "*"}
    new sst.aws.Function("MyWorkspaceFunction", {
      vpc,
      url: true,
      handler: "workspace-package/index.handler",
      nodejs: {
        install: ["pg"],
      },
    });
  },
});
