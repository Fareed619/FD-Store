import styled from "styled-components";
import { AdminWrappr } from "../admin.style";
import { useState } from "react";
import { useGetAllCategoriesQuery } from "../../../redux/api/admin/categoriesApiSlice";
import { useAddProductMutation } from "../../../redux/api/admin/productsApiSlice";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminTopComponent from "../AdminTopComponent";
import { devices } from "../../../../utils/styledConstants";

const CreateProduct = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    countInStock: "",
    category: "",
    quantity: "",
  });
  const [image, setImage] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const { name, description, brand, price, countInStock, category, quantity } =
    productForm;
  const navigate = useNavigate();
  const [createProduct] = useAddProductMutation();

  console.log(image);
  // Create Product
  const createProductHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("price", price);

    try {
      const res = await createProduct(formData).unwrap();
      if (res.message) {
        throw new Error(res.message);
      } else {
        navigate("/admin/products");
        toast.success("Product Created Successfuly");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  // Upload Imag to server
  const uploadImg = async (imgFile) => {
    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("upload_preset", "FD-Store react");

    try {
      setImgLoading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpdv7p57h/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      toast.success("Image uploaded successfully");
      setImage(data.secure_url);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setImgLoading(false);
    }
  };

  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery();

  const changeFormData = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  if (categoriesLoading) {
    return (
      <AdminWrappr>
        <Loader />
      </AdminWrappr>
    );
  }
  return (
    <AdminWrappr>
      <AdminTopComponent content="Add New" addition="Product" />
      <ProductForm>
        <div>
          {" "}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={changeFormData}
          />
        </div>

        <div>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={changeFormData}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={changeFormData}
          />
        </div>

        <div>
          {" "}
          <label htmlFor="category">Cagtegory</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={changeFormData}
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
            onChange={changeFormData}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="countInStock">CountInStock</label>
          <input
            type="text"
            name="countInStock"
            value={countInStock}
            onChange={changeFormData}
          />
        </div>
        <div className="desription-div">
          {" "}
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={changeFormData}
          ></textarea>
        </div>

        <div className="image-div">
          <label htmlFor="image-field" className="image-label">
            {imgLoading ? "uploading...." : "Upload Image"}
            {image && <img src={image} />}
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
            onClick={createProductHandler}
            className="update-btn"
          >
            Create
          </button>
        </section>
      </ProductForm>
    </AdminWrappr>
  );
};

export default CreateProduct;

export const ProductForm = styled.form`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-left: 1rem;
  div {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 17px;

    input,
    select,
    textarea {
      border: none;
      padding: 0.4rem 1rem;
      border-radius: 4px;
      outline: none;
      font-size: 17px;
    }
  }

  .desription-div {
    width: 83%;
  }
  .image-div {
    width: 100%;
    .image-label {
      background-color: #00000097;
      width: 12%;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        border-radius: 5%;
        position: absolute;
      }
    }
  }

  .buttons {
    button {
      padding: 0.5rem 2rem;
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
      color: white;
      border: none;
      outline: none;
      background-color: rgb(219 39 119);
    }
  }

  @media ${devices.lg} {
    flex-direction: row;
    margin-left: 0;
    div {
      width: 45%;
    }
    .desription-div {
      width: 95%;
    }

    .image-div {
      .image-label {
        width: 30%;
      }
    }
  }
  @media ${devices.sm} {
    flex-direction: column;
    div {
      width: 80%;
    }
    .desription-div {
      width: 80%;
    }

    .image-div {
      .image-label {
        width: 40%;
      }
    }

    .buttons {
      button {
        margin-bottom: 1rem;
      }
    }
  }
`;
