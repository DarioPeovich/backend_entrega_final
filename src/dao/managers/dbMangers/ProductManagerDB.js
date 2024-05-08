
import productsModel from "../../models/products.model.js"


class ProductManagerDB {

  getProducts = async (limit, page, sort, category, availability, query, token) => {

      try {

        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (availability) {
            filter.stock = { $gt: 0 };    //Mayor que cero
        }

        if (query) {
            filter.$or = [
                { title: { $regex: new RegExp(query, 'i') } },
            ];
        }
        
        //Se hacen las validaciones acá xq dentro del objeto options no me andan
        limit = limit ?? 10;
        sort = (sort === "asc" ? 1 : -1)
        page = page ?? 1
        const options = {
          limit: limit,
          page: page,
          sort: { price: sort}, //Ordena x precio y en la query se debe indicar ?sort=asc o ?sort=desc
          lean: true,
        };

        const products = await productsModel.paginate(filter, {...options});
        //console.log(products);
        const baseUrl = '/products'; // Asegúrate de que esta sea la ruta base correcta de tu aplicación

        if (products.hasPrevPage){
            //products.prevLink = `${baseUrl}/?limit=${limit}&page=${products.prevPage}&sort=${sort}`;
            products.prevLink = `${baseUrl}/?limit=${limit}&page=${products.prevPage}&sort=${sort}&token=${token}`;
        }
        
        if (products.hasNextPage){
            // products.nextLink = `${baseUrl}/?limit=${limit}&page=${products.nextPage}&sort=${sort}`;
            products.nextLink = `${baseUrl}/?limit=${limit}&page=${products.nextPage}&sort=${sort}&token=${token}`;
        }
        
  //   if(products.hasPrevPage){
  //     products.prevLink = `/products/?limit=${limit}&page=${products.prevPage}&sort=${sort}`
  //     // products.prevLink = `http://localhost:8080/products/?limit=${limit}&page=${products.prevPage}&sort=${sort}`
  //     products.prevLink = `/?limit=${limit}&page=${products.prevPage}&sort=${sort}`
  // }
  
  // if(products.hasNextPage){
  //     //products.nextLink = `api/products/?limit=${limit}&page=${products.nextPage}&sort=${sort}`
  //     products.nextLink = `?limit=${limit}&page=${products.nextPage}&sort=${sort}`
  // }
      return {
          status: "success",
          msg: products
      }
      } catch {
        console.log("Error en lectura de archivos!!");
      }
   
    };

 

  createProduct = async (product) => {

    try {
      const result = await productsModel.create(product);
      return result;
    }
    catch {
      console.log("Error en lectura de archivos!!");
    }
   };

   getProductAll = async () => { 
    try {
      const products = await productsModel.find();
      return products;
    } catch (error) {
       console.log("Error fetching carts:", error)
    }

   }
 
  getProductById = async (pid) => {
    try {
 
      const product = await productsModel.findById(pid);
      //console.log(product);
      if ((product === null || product === undefined)) {
        throw new Error(`No se encontró ningún Producto con el ID: ${pid}`);  //se lanza una excepcion, para capturarla desde el Route
      }
      
      return product;
      
    }
    catch (error) {
      throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
      }

  };

  updateProduct = async (pid, product) => {
    try {
      const productFind = await productsModel.findById(pid);
      if ((productFind === null || productFind === undefined)) {
        throw new Error(`No se encontró ningún Producto con el ID: ${pid}`);  //se lanza una excepcion, para capturarla desde el Route
      }

        const result = await productsModel.updateOne({ _id: pid }, { $set: product });
        return result;
    }     catch (error) {
      throw error; // Vuelve a lanzar la excepción para que la ruta la maneje el Router
      }
    
  };

  deleteProduct = async (pid) => {
    try {
      const result = await productsModel.deleteOne({ _id: pid });
      return result;
    } catch {
      console.log("Error en lectura de archivos (ProductManager)")
    }

  };

}

const createProducValid = ({ title, description, code, price, status, stock, category, thumbnails} ) => {
    
    //console.log("title: " + title)
    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {      //Se valida parametros undefined
        //console.log("Parametros obligatorios no definidos")
        return false;
    }
    if (title === "" || description === "" || code === 0 || price <= 0 || stock <= 0 || category === "") {
        //console.log("x false")
        return false;
    }
    console.log("x true")
    return true;
  }

export {ProductManagerDB};