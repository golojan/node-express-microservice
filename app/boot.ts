import * as express from "express";
import * as tyboost from "tyboost";
import * as cors from "cors";
import helmet from "helmet";

import * as listEndpoints from "express-list-endpoints";
import * as Table from "cli-table";

import allRouter from "../routes";

import allInitializer from "./initializers";
import { logger, constants, config } from "../utils";

// initialise express app with tyboost - https://www.npmjs.com/package/tyboost
logger.info(`MicroService :: MicroService is starting with environment :: ${constants.ENV}`);
logger.info(`MicroService :: Initialising express MicroService with tyboost`);
const app = tyboost(express());

// start application
class MicroService {
    constructor() {
        logger.info(`MicroService :: Initiating MicroService`);
    }

    public bootUp = async (): Promise<void> => {
        try {
            // register core application level middleware
            this.registerCoreMiddleware();
            // register applications and services
            this.registerApplicationsAndServices();
            // register routes
            this.registerRoutes(allRouter ? allRouter : {});
            // register all the initializer
            this.registerInitializers(allInitializer ? allInitializer : {});
            logger.info(`BOOT :: Booting application started`);

            // boot the application
            await app.boot();
            logger.info(`BOOT :: Booting application done`);

            app.listen(constants.PORT, constants.HOST).on("error", (error: any) => {
                if (error.syscall !== "listen") {
                    throw error;
                }
                // handle specific listen errors with friendly messages
                switch (error.code) {
                    case "EACCES":
                        logger.error(`BOOT :: ${constants.HOST}:${constants.PORT} requires elevated privileges`);
                        process.exit(1);
                        break;
                    case "EADDRINUSE":
                        logger.error(`BOOT :: ${constants.HOST}:${constants.PORT} is already in use`);
                        process.exit(1);
                        break;
                    default:
                        throw error;
                }
            })
                .on("listening", () => {
                    logger.info(`BOOT :: Listening on ${constants.HOST}:${constants.PORT}`);
                });

            // exit on uncaught exception
            this.handleError();
        } catch (err) {
            logger.error(`BOOT :: Error while booting application from boot script : ${JSON.stringify(err)}`);
            throw err;
        }
    };

    // register application level middleware
    private registerCoreMiddleware = function (): void {
        try {
            logger.info(`BOOT :: Registering core middleware started`);

            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            logger.info(`BOOT :: Registered middleware : bodyParser`);

            app.use(cors());
            app.options("*", cors());
            logger.info(`BOOT :: Registered middleware : cors(*)`);

            app.use(helmet({
                frameguard: false
            }));
            logger.info(`BOOT :: Registered middleware : helmet`);

        } catch (err) {
            logger.error(`BOOT :: Error while registering core middleware . Check core middleware : ${JSON.stringify(err.message)}`);
        } finally {
            logger.info(`BOOT :: Registering core middleware done`);
        }
    };

    // register all applications and services in applications/index
    private registerApplicationsAndServices = function (): void {
        try {
            // Setup Applications
            if (config.applications) {
                logger.info(`BOOT :: Registering Applications And Services started`);
            }
        } catch (err) {
            logger.error(`BOOT :: Error while registering applications & services. Check core middleware : ${JSON.stringify(err.message)}`);
        } finally {
            logger.info(`BOOT :: Registering applications & services done`);
        }
    }

    // register all routes in routes/index
    private registerRoutes = (routers: object): void => {
        try {
            if (Object.keys(routers) && Object.keys(routers).length) {
                logger.info(`BOOT :: Registering routes started`);
                Object.keys(routers).forEach(key => {
                    app.use("/", routers[key]);
                });
                // print the routes in console
                logger.info(`BOOT :: Registered following routes`);
                const table = new Table({ head: ["Method", "Endpoint"] });
                listEndpoints(app).forEach(route => {
                    if (route.path != "*") {
                        const row = {};
                        row[`${route.methods.join(", ")}`] = route.path;
                        table.push(row);
                    }
                });
                logger.info(`\n${table.toString()}`);
                logger.info("BOOT :: Registering routes done");
            }
        } catch (err) {
            logger.error(`BOOT :: Error while registering routes. Check routes : ${JSON.stringify(err.message)}`);
        }
    };

    // register all initializer in initializers/index
    private registerInitializers = (initializers: object): void => {
        try {
            logger.info(`BOOT :: Registering initializer started`);
            Object.keys(initializers).forEach(key => {
                app.register(allInitializer[key]);
                logger.info(`BOOT :: Registered initializer : ${key}`);
            });
            logger.info(`BOOT :: Registering initializer done`);
        } catch (err) {
            logger.error(`BOOT :: Error while registering initializer. Check initializer : ${JSON.stringify(err.message)}`);
        }
    };

    private handleError = (): void => {
        process.on("uncaughtException", function (err) {
            logger.error(`UNCAUGHT_EXCEPTION OCCURRED : ${JSON.stringify(err.stack)}`);
            process.exit(1);
        });
    };

}

export default MicroService;
