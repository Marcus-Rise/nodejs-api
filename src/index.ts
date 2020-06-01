import './LoadEnv'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import {createConnection} from "typeorm";

createConnection()
    .then(() => {
        const port = Number(process.env.PORT || 3000);

        app.listen(port, () => {
            logger.info(`Express server started on : http://localhost:${port}`);
        });
    });
