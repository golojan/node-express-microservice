import { Connections, logger, constants, config } from "../../utils";

/*
* On successful initialization invoke resolve
* Resolve will trigger next initializer
*
* On fail initialization you can invoke reject
* Reject will stop the booting up of express app. In case you don't want to stop booting process if initialization fails invoke resolve
 */

const init = async function (): Promise<void> {
    try {
        // do your initialization here
        Connections.set(constants.CONNECTIONS.DATA, () => {
            logger.info(`BOOT :: Connected to {data}`);
        });
        if(config.applications.prisma){
            
        }
    }  catch (err: any) {
        logger.error(`BOOT :: Error connecting to {data} : ${JSON.stringify(err.message)}`);
        throw  new Error(err.message);
    }
};

export default init;







