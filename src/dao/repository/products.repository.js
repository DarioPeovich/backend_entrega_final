export class ProductsRepository {
    constructor (dao) {
        this.dao = dao;
    }
    async getProducts () {
        try {
            const products = await this.dao.getProducts();
            //console.log(products)
            return products;
        } catch (error) {
            throw error;
        }
    }

    async createProduct (prod) {
        try {
            const product = await this.dao.createProduct(prod);
            //console.log(product)
            return product;
        } catch (error) {
            throw error;
        }
    }

    async getProductById (pid) {
        try {
            const product = await this.dao.getProductById(pid);
            //console.log(product)
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct (pid, product) {
        try {
            const product = await this.dao.updateProduct(pipid, productd);
            //console.log(product)
            return product;
        } catch (error) {
            throw error;
        }

    }

    async deleteProduct (pid) {
        try {
            const result = await this.dao.deleteProduct(pid);
            //console.log(result)
            return result;
        } catch (error) {
            throw error;
        }
    }


}