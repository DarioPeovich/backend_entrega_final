
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

    async createProduct (productData) {
        try {
            const updatedProduct = await this.dao.createProduct(productData);
            //console.log(updatedProduct)
            return updatedProduct;
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

    async updateProduct (pid, productData) {
        try {
            const updatedProduct = await this.dao.updateProduct(pid, productData);
            //console.log(updatedProduct)
            return updatedProduct;
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