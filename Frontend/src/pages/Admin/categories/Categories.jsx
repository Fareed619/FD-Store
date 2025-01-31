import { useEffect, useState } from "react";
import { AdminWrappr } from "../admin.style";
import AdminTopComponent from "../AdminTopComponent";
import styled from "styled-components";
import { Button } from "../../../components/components.style";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../../redux/api/admin/categoriesApiSlice";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import CategoriesModal from "../../../components/CategoriesModal";
import { devices } from "../../../../utils/styledConstants";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {
    data: AllCategories,
    isLoading: LoadingCategories,
    refetch,
  } = useGetAllCategoriesQuery();
  //  create category
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const deleteCategoryHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteCategory({ categoryId }).unwrap();
      if (res.error) {
        throw new Error(res.error);
      }
      toast.success("Category Deleted");
      setShowModal(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const updateNameHandler = async (e) => {
    e.preventDefault();
    const args = {
      categoryName: updateName,
      categoryId,
    };
    try {
      const res = await updateCategory(args).unwrap();
      if (res.error) {
        throw new Error(res.error.message);
      }
      toast.success("Category Updated");
      setShowModal(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const createCategoryHandler = async () => {
    try {
      const res = await createCategory({ categoryName }).unwrap();
      if (res.error) {
        throw new Error(res.error.message);
      }
      toast.success("category Added");
      refetch();
      setCategoryName("");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    refetch();
  }, [AllCategories, refetch]);

  if (LoadingCategories) {
    return <Loader />;
  }
  return (
    <AdminWrappr>
      <AdminTopComponent content="Categories" addition="list" />
      <CategoriesWrapper>
        <div className="categories-wrapper-add-category">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Add Category Name"
          />
          <Button
            style={{ padding: ".5rem 1rem" }}
            onClick={createCategoryHandler}
          >
            Add
          </Button>
        </div>
        <hr style={{ width: "70%" }} />

        <div className="categories-wrapper-all-categories">
          {AllCategories?.categories?.map((category) => (
            <SpanCategory
              key={category._id}
              onClick={() => {
                setUpdateName(category.name);
                setCategoryId(category._id);
                setShowModal(true);
              }}
            >
              {category.name}
            </SpanCategory>
          ))}
        </div>
      </CategoriesWrapper>
      <CategoriesModal
        updateName={updateName}
        setUpdateName={setUpdateName}
        showModal={showModal}
        setShowModal={setShowModal}
        updateNameHandler={updateNameHandler}
        deleteCategoryHandler={deleteCategoryHandler}
      />
    </AdminWrappr>
  );
};

export default Categories;
export const SpanCategory = styled.span`
  padding: 0.5rem 1rem;
  color: rgb(219 39 119);
  border: 1px solid rgb(219 39 119);
  border-radius: 5px;
  font-size: 17px;
  cursor: pointer;
  transition: ease 0.3s;
  &:hover {
    background-color: rgb(219 39 119);
    color: white;
  }
`;

const CategoriesWrapper = styled.div`
  margin-top: 1.5rem;
  margin-left: 1rem;
  .categories-wrapper-add-category {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    gap: 1rem;
    input {
      padding: 0.5rem 1rem;
      width: 35%;
      border: none;
      border-radius: 4px;
      outline-color: var(--primary-clr-pink);
      font-size: 17px;
    }
  }
  .categories-wrapper-all-categories {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
  }

  @media ${devices.lg} {
    margin-left: 0;
    .categories-wrapper-add-category {
      input {
        width: 70%;
        padding: 0.5rem 1rem;
      }
    }
    .categories-wrapper-all-categories {
      flex-wrap: wrap;

      gap: 1rem;
    }
  }
  @media ${devices.sm} {
    margin-left: auto;
    hr {
      display: none;
    }
    .categories-wrapper-add-category {
      input {
        width: 100%;
        padding: 0.3rem 1rem;
      }
    }
    .categories-wrapper-all-categories {
      flex-wrap: wrap;

      gap: 1rem;
    }
  }
`;
