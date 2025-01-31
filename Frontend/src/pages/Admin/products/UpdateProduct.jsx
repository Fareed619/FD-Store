import { useNavigate, useParams } from "react-router-dom";
import { AdminWrappr } from "../admin.style";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../../redux/api/admin/productsApiSlice";
import AdminTopComponent from "../AdminTopComponent";
import { ProductForm } from "./CreateProduct";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetAllCategoriesQuery } from "../../../redux/api/admin/categoriesApiSlice";
import Loader from "../../../components/Loader";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    data: productDetailes,
    isLoading: loadingProduct,
    refetch,
  } = useGetProductByIdQuery(productId);

  const [name, setName] = useState(productDetailes?.name || "");
  const [description, setDescription] = useState(
    productDetailes?.description || ""
  );
  const [brand, setBrand] = useState(productDetailes?.brand || "");
  const [quantity, setQuantity] = useState(productDetailes?.quantity || "");
  const [price, setPrice] = useState(productDetailes?.price || "");
  const [category, setCategory] = useState(productDetailes?.category || "");
  const [countInStock, setCountInStock] = useState(
    productDetailes?.countInStock || ""
  );
  const [image, setImage] = useState(productDetailes?.image || "");

  useEffect(() => {
    refetch();
    if (productDetailes && productDetailes._id) {
      setName(productDetailes?.name);
      setDescription(productDetailes?.description);
      setPrice(productDetailes?.price);
      setCategory(productDetailes?.category);
      setBrand(productDetailes?.brand);
      setCountInStock(productDetailes?.countInStock);
      setQuantity(productDetailes?.quantity);

      setImage(productDetailes?.image);
    }
  }, [productDetailes]);
  const { data: categories } = useGetAllCategoriesQuery();

  const [upload] = useUploadImageMutation();

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // Upload Imag to server
  const uploadImg = async (imgFile) => {
    const formData = new FormData();
    formData.append("image", imgFile);

    try {
      const res = await upload(formData).unwrap();
      if (res.error) {
        throw new Error(res.error);
      }
      setImage(res.image);
      toast.success("imgae uploaded");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   Delete product handler
  const deleteProductHandler = async () => {
    try {
       await deleteProduct(productDetailes._id).unwrap();
      toast.success("Product Deleted");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // update Product handler
  const updateProductHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("image", image);
    try {
      const res = await updateProduct({ formData, productId }).unwrap();
      if (res.error) {
        throw new Error(res.error);
      }
      toast.success("Product Updated");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.error);
    }
  };

  if (loadingProduct) {
    return <Loader />;
  }
  return (
    <AdminWrappr>
      <AdminTopComponent content="Update" addition="prodcut" />
      <ProductForm>
        <div>
          {" "}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          {" "}
          <label htmlFor="category">Cagtegory</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          {" "}
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="countInStock">CountInStock</label>
          <input
            type="text"
            name="countInStock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </div>
        <div className="desription-div">
          {" "}
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="image-div">
          <label htmlFor="image-field" className="image-label">
            Upload Image
            {image && <img src={`${image}`} />}
          </label>

          <input
            type="file"
            id="image-field"
            hidden
            onChange={(e) => uploadImg(e.target.files[0])}
          />
        </div>
        <section className="buttons">
          <button
            type="submit"
            onClick={updateProductHandler}
            className="update-btn"
            style={{ backgroundColor: "green", marginRight: "6rem" }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={deleteProductHandler}
            className="update-btn"
          >
            Delete
          </button>
        </section>
      </ProductForm>
    </AdminWrappr>
  );
};

export default UpdateProduct;
