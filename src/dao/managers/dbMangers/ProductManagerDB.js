
import productsModel from "../../models/products.model.js"


class ProductManagerDB {

  getProducts = async (options) => {
    
      try {
        console.log("options" + options)
       // const products = await productsModel.paginate({}, { ...options });
        const products = await productsModel.paginate(
          {
          },
          {
              ...options
          }
      );
      
      return {
          status: "success",
          msg: products
      }
      } catch {
        console.log("Error en lectura de archivos!!");
      }
   
    };

    // getProducts = async () => {
  
    //   try {
    //     const products = await productsModel.find();
    //     return products;
    //   } catch {
    //     console.log("Error en lectura de archivos!!");
    //   }
   
    // };

  createProduct = async (product) => {

    try {
      const result = await productsModel.create(product);
      return result;
    }
    catch {
      console.log("Error en lectura de archivos!!");
    }
   };

 
 
  getProductById = async (pid) => {
    try {
      const result = await productsModel.findById(pid);
      console.log(result);
      if (result) {
        return result;
      }else {
        return {};
      }
      
    }
    catch  {
      console.log("Error en lectura de archivos (byId!!");
    }

  };

  updateProduct = async (pid, product) => {
    try {
        const result = await productsModel.updateOne({ _id: pid }, { $set: product });
        return result;
    } catch {

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