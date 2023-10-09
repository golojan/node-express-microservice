import MicroService from "./app";
import { logger } from "./utils";
const microservice = new MicroService();

microservice.bootUp();
logger.info(`BOOT :: Booting Process Id (${process.pid})`);