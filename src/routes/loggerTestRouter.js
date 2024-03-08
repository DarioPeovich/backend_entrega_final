
const router = Router();


router.get("/", (req, res) => {
    //hacer los logger de pruebas
    req.logger.warn("Errror!");
    res.send("Bienvenido!")
});   