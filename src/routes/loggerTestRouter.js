import { Router } from "express";
const router = Router();


router.get("/", (req, res) => {
    //hacer los logger de pruebas
    //req.logger.warn("Errror!");
    req.logger.warn("Error");
    req.logger.info("Info");
    req.logger.http("Error http")
    res.send("Bienvenido!")

});   

export { router as loggerTestRouter };