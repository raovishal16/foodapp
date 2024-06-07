import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import ViewFoodProduct from "../ViewFoodProduct/ViewFoodProduct";

const AddFoodDetails = () => {
  const [addFood, setAddFood] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [weight, setWeight] = useState("");
  const [energy, setEnergy] = useState("");
  const [protein, setProtein] = useState("");
  const [carbohydrate, setCb] = useState("");
  const [fat, setFat] = useState("");
  const [searchName, setSearchName] = useState("");
  const [editData, setEditData] = useState(null);

  const newFood = {
    productName: foodName,
    weight: weight,
    energy: energy,
    protine: protein,
    carbohydrate: carbohydrate,
    fat: fat,
  };

  const getToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTc3NDU2NjQ1MDEtMzA0NTAyNDgwIiwiaWF0IjoxNzE3NzQ1NjY0LCJleHAiOjE3MTc5MTg0NjR9.GH-Cwa5MOC7gCFODr31Azr-FT4MvSJCby5omyckkGoU";

  const postToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTc3NDU2ODA0NjctOTkwMzQ1OTg2IiwiaWF0IjoxNzE3NzQ1NjgwLCJleHAiOjE3MTc5MTg0ODB9.Vh84BXvF6i4m2rpKNG67AYjBBdcSJeZhOvvoEbhFriA";
  const updateToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTc3NDU2OTYzNzYtMjkyOTI0MDEiLCJpYXQiOjE3MTc3NDU2OTYsImV4cCI6MTcxNzkxODQ5Nn0.b0zBn_HIMnRRybi7FqNuAc_VH2xUpc7nw8CUSPftP18";

  useEffect(() => {
    axios
      .get("https://service.apikeeda.com/nutri-food", {
        headers: {
          Authorization: `${getToken}`,
        },
      })
      .then((response) => {
        setAddFood(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getToken]);

  const addFoodItem = () => {
    if (editData === null) {
      axios
        .post("https://service.apikeeda.com/nutri-food", newFood, {
          headers: {
            Authorization: `${postToken}`,
          },
        })
        .then((response) => {
          setAddFood([...addFood, response.data.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .patch(
          `https://service.apikeeda.com/nutri-food/${editData._id}`,
          newFood,
          {
            headers: {
              Authorization: `${updateToken}`,
            },
          }
        )
        .then((response) => {
          const updatedFoods = addFood.map((item) => {
            if (item._id === editData._id) {
              return { ...item, ...response.data.data };
            }
            return item;
          });
          setAddFood(updatedFoods);
          setEditData(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setFoodName("");
    setWeight("");
    setEnergy("");
    setProtein("");
    setCb("");
    setFat("");
  };

  const editDataHandler = (item) => {
    setFoodName(item.productName);
    setWeight(item.weight);
    setEnergy(item.energy);
    setProtein(item.protine);
    setCb(item.carbohydrate);
    setFat(item.fat);
    setEditData(item);
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  const filteredFood = searchName
    ? addFood.filter((food) =>
        food.productName.toLowerCase().includes(searchName.toLowerCase())
      )
    : addFood;

  return (
    <div className="container my-5 py-4">
      <div className="row g-3 w-100">
        <div className="col-md-6">
          <div className="d-flex justify-content-center align-items-center w-100">
            <div className="addfood">
              <h2>Add Food Details</h2>
              <div>
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="productName"
                    name="productName"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="weight">Weight</label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="weight"
                    name="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="energy">Energy</label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="energy"
                    name="energy"
                    value={energy}
                    onChange={(e) => setEnergy(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="protein">Protein</label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="protein"
                    name="protein"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="carbohydrate">Carbohydrate</label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="carbohydrate"
                    name="carbohydrate"
                    value={carbohydrate}
                    onChange={(e) => setCb(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fat">Fat</label>
                  <input
                    type="text"
                    className="form-control my-3"
                    id="fat"
                    name="fat"
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={addFoodItem}
                >
                  {editData === null ? "Submit" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="searchfoods d-flex justify-content-center align-items-center w-100">
            <input
              type="text"
              className="form-control w-50 search"
              placeholder="Search Foods..."
              onChange={handleSearch}
              value={searchName}
            />
          </div>
          <ViewFoodProduct
            getFood={filteredFood}
            setFood={setAddFood}
            editFood={editDataHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default AddFoodDetails;
