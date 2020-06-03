import './LoadEnv';
import app from '@server';
import logger from '@shared/Logger';
import {connectToDb} from "@/Db";

connectToDb()
    .then(() => {
        const port = Number(process.env.PORT || 3000);
        const host = String(process.env.HOST || "localhost");

        app.listen(port, host, () => {
            logger.info(`Express server started on : http://${host}:${port}`);
        });
    });
