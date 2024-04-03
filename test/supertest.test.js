
import supertest from "supertest";
import productsModel from "../src/dao/models/products.model.js"
// import chai from "chai";
//const chai = require("chai");
import { expect } from "chai";
//import chai from "chai";

import {app} from "../src/app.js"

//const expect = chai.expect;
const requester = supertest(app);


describe( "Testing de App e-Commerce", () => {
    
    describe("Test de modulo Productos", ()=>{

        it("El endPpoint post /api/products crea un producto correctamente", async function() {

            const mockUser = {
                email: "pepe@gmail.com",
                password: "1234"
            };

            const productMock = {
                title: "Papas Fritas",
                description: "Papas fritas Lia x 150 grs.",
                code: 54874,
                price: 1500,
                status: true,
                stock: 25,
                category: "Snack",
                owner: "dario@gmail.com",
                thumbnails: []
            };
            const resultLogin = await requester.post("/api/sessions/login").send(mockUser);
            
            console.log(resultLogin);
            
            const result = await requester.post("/api/products").send(productMock);
            //console.log(result);
            const {statusCode, _body} = result;
            expect(statusCode).to.be.equal(200);
            expect(_body.status).to.be.equal("succes")
            expect(_body.result).to.have.property("_id");

        })

    })

    // describe("Test de otro", ()=>{

    //     it("", async function() {

    //     })

    // })

})