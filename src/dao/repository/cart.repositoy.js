
export class CartRepository {
    constructor (dao) {
        this.dao = dao;
    }

    async getIdCart (cid) {
        try {
            const cart = await this.dao.getIdCart(cid);
            //console.log(carts)
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getCarts() {
        try {
            const carts = await this.dao.getCarts();
            //console.log(carts)
            return carts;
        } catch (error) {
            throw error;
        }
    }

    async createCarts() {
        try {
            const cart = await this.dao.createCarts();
            //console.log(carts)
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateCartMany(cid, products) {
        try {
            const cart = await this.dao.updateCartMany(cid, products);
            //console.log(carts)
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cid, pid, quantity) {
        try {
            const cart = await this.dao.updateCart(cid, pid, quantity);
            //console.log(carts)
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async deleteCart(cid) {
        try {
            const result = await this.dao.deleteCart(cid);
            console.log(result)
            return result;
        } catch (error) {
            throw error;
        }
    }


}
