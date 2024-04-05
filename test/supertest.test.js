import supertest from "supertest";
import { expect } from "chai";
import { app } from "../src/app.js";

//---------------------
import userModel from "../src/dao/models/users.model.js";
import cartsModel from "../src/dao/models/carts.model.js";
import productsModel from "../src/dao/models/products.model.js";
import { generateToken } from "../src/utils.js";
const requester = supertest(app);

describe("Testing de App e-Commerce", () => {

    let productId; // Variable global para almacenar el productId

    before(async function () {
        await productsModel.deleteMany({});
        });
    before(async function () {
        await cartsModel.deleteMany({});
    });  

  console.log("habilitar modulo Testing Products");

    describe("Test modulo Products", () => {


      it("El endpoint post /api/products crea un producto correctamente", async () => {
        // Crea un producto
        const productMock = {
          title: "Papas Fritas",
          description: "Papas fritas Lays x 150 grs.",
          code: 54874,
          price: 1500,
          status: true,
          stock: 25,
          category: "Snack",
          owner: "dario@gmail.com",
          thumbnails: [],
        };

        const result = await requester.post("/api/products/testing").send(productMock);
   
        productId = result._body.result._id
        //console.log("====productId en endpoint post /api/products")
        //console.log("productId ", productId)

        // Verifica que la creación del producto fue exitosa
        expect(result.status).to.equal(200);
        expect(result.body.status).to.equal("success");
        expect(result.body.result).to.have.property("_id");
      });

      it("El endpoint GET /api/products devuelve array de productos", async () => {
        const result = await requester.get("/api/products/");

        //Se verifica que devuelva status 200 y un array
        expect(result.status).to.equal(200);
        expect(result.body.status).to.equal("success");
        //expect(result.body.products).to.be.an('array');
        expect(result._body.products.docs).to.be.an("array"); // Verificar la propiedad docs
      });

      it("El endpoint GET /api/products/:pid devuelve objeto de producto", async () => {
        //const idProduct = "65c3de3700689c36aaddd2d5"; //id producto existente
        //para porducto inexistente devuelve 404
        //const idProduct = ""    //id producto existente

        //productId: Se incializa cuando se crea el testing crear product
        const result = await requester.get(`/api/products/${productId}`);

        //Se verifica que devuelva status 200 y un array
        expect(result.status).to.equal(200);
        expect(result.body.status).to.equal("success");
        expect(result.body.product).to.be.an("object");
      });
    });

  //--------------------

  //================Test modulo Sessions=======================
  describe("Test modulo Sessions", () => {
    beforeEach(async function () {
      await userModel.deleteMany({});
    });

    it("El endpoint post /api/sessions registra un Usuario correctamente", async () => {
      const userMock = {
        first_name: "Pedro",
        last_name: "Garcia",
        email: "pedro.garcia@gmail.com",
        age: 35,
        password: "1234",
        cart: [],
        role: "ADMIN",
      };
      const result = await requester
        .post("/api/sessions/register")
        .send(userMock);
      const { statusCode, _body } = result;

      //console.log(result)

      expect(statusCode).to.be.equal(200);
      expect(_body.status).to.be.equal("success");
    });
  });

  it("El endpoint post /api/sessions loguea un Usuario correctamente", async () => {
    const userMock = {
      email: "pedro.garcia@gmail.com",
      password: "1234",
    };
    const responseLogin = await requester
      .post("/api/sessions/login")
      .send(userMock);
    // console.log("=====================================================");
    // console.log(responseLogin);
    const { _body } = responseLogin;
    expect(_body.status).to.be.equal("success");
    expect(_body).to.have.property("token");
  });

  it("El endpoint Get /api/sessions/current obtenemos el Usuario", async () => {
    const userMock = {
      first_name: "Pedro",
      last_name: "Garcia",
      email: "pedro.garcia@gmail.com",
      age: 35,
      password: "1234",
      cart: [],
      role: "ADMIN",
    };
    const token = generateToken(userMock);

    const responseCurrent = await requester
      .get("/api/sessions/current")
      .send({ user: userMock }) // Se envia el objeto userMock como parte del cuerpo de la solicitud
      .set("Authorization", `Bearer ${token}`); // Se establece el encabezado de autorización con el token generado

    // console.log("=================responseCurrent====================================");
    // console.log(responseCurrent);

    const { _body } = responseCurrent;
    expect(_body.status).to.be.equal("success");
    expect(_body.payload.email).to.be.equal("pedro.garcia@gmail.com");
  });


//======================Test modulo Carts==========================
    describe("Test modulo Carts", () => {  
        
        let cartId; // Variable para almacenar el _id del carrito

        // beforeEach(async function () {
        //     await cartsModel.deleteMany({});
        // });  
        
        //1.- Creamos un carrito
        it("El endpoint Post /api/carts/ se crea un Cart", async () => {
            const result = await requester.post("/api/carts/");
            //console.log("=================responseLogin=============================")
            //console.log(result)
            //console.log("=================FIN responseLogin=============================")
            expect(result.statusCode).to.be.equal(200);
            expect(result.body.cart).to.haveOwnProperty("_id");
            // Almacenar el _id del carrito creado
            cartId = result.body.cart._id;
        })

        //2.- Agregamos un Producto al carrito
        it("Con el endpoint Get /api/carts obtenemos todos los Carts", async () => {
            // Se Verifica que cartId esté definido antes de usarlo
            expect(cartId).to.not.be.undefined;
            const bodyCart = {
                quantity: 2
            }
            //console.log("cartId: ", cartId);
            //console.log("productId: ", productId);
            //productId: Variable global al Testing, inicialiazada cuando se crea un producto
            const result = await requester.post(`/api/carts/${cartId}/product/${productId}/testing`).send(bodyCart);
            // console.log("=================INICIO result Agregar Prod a Cart=============================")
            // console.log(result)
            // console.log("=================FIN Agregar Prod a Cart=============================")
            expect(result.statusCode).to.be.equal(200);
            expect(result._body.status).to.be.equal("succes");
        })

         //3.- Obtenemos todos los carritos
        it("El endpoint Get /api/carts/ los carritos", async () => {
            const result = await requester.get("/api/carts/");
            //console.log("======INICIO /api/carts/ ========")
            //console.log(result)
            //console.log("======FIN /api/carts/ ========== ")
            expect(result.statusCode).to.be.equal(200);
            expect(result._body.carts).to.be.an('array');
            
        })


    })

  
});
