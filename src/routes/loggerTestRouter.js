import { Router } from "express";
const router = Router();


router.get("/", (req, res) => {
    //hacer los logger de pruebas
    req.logger.debug("Error!: debug");
    req.logger.http("Error!: http");
    req.logger.info("Info");
    req.logger.warn("Error!: warn")
    req.logger.error("Error!: error")
    
    res.send(`Bienvenido!, cambiando en .env NODE_ENV="production" o "development", se vera el funcionamiento de los transporters`)

});   

export { router as loggerTestRouter };