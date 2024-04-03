import supertest from "supertest";
import { expect } from "chai";
import { app } from "../src/app.js";

const requester = supertest(app);

describe("Testing de App e-Commerce", () => {
    
    describe("Test de crear Productos", () => {
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
                thumbnails: []
            };

            
            const result = await requester.post("/api/products/testing").send(productMock);

            // Verifica que la creación del producto fue exitosa
            expect(result.status).to.equal(200);
            expect(result.body.status).to.equal("success");
            expect(result.body.result).to.have.property("_id");
        });
    });

    describe("Test de modulo Productos", () => {
        it("El endpoint GET /api/products devuelve array de productos", async () => {
            
            
            const result = await requester.get("/api/products/")

            //Se verifica que devuelva status 200 y un array
            expect(result.status).to.equal(200);
            expect(result.body.status).to.equal("success");
            //expect(result.body.products).to.be.an('array');
            expect(result._body.products.docs).to.be.an('array'); // Verificar la propiedad docs
        })
    })


    describe("Test de modulo Productos", () => {
        it("El endpoint GET /api/products/:pid devuelve objeto de producto", async () => {
            
            const idProduct = "65c3de3700689c36aaddd2d5"    //id producto existente
            //para porducto inexistente devuelve 404
            //const idProduct = ""    //id producto existente
            
            const result = await requester.get(`/api/products/${idProduct}`);

            //Se verifica que devuelva status 200 y un array
            expect(result.status).to.equal(200);
            expect(result.body.status).to.equal("success");
            expect(result.body.product).to.be.an('object');
        })
    })


});
