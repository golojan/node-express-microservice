import devConfig from "./dev/index";
import testConfig from "./test/index";
import stageConfig from "./stage/index";
import productionConfig from "./production/index";
import { logger } from "../utils";

const getConfigFiles =  (environment) => {
    const env = environment && (typeof environment === "string") ?  environment.toLocaleLowerCase() : undefined;
    switch (env) {
        case "dev":
            return devConfig;
        case "test":
            return testConfig;
        case "stage":
            return stageConfig;
        case "production":
            return productionConfig;
        default:
            logger.error(`Invalid environment: ${environment}, defaulting to dev environment`);
            return devConfig;
    }
};

export default {
    getConfigFiles
};
