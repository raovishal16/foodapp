import React from "react";
import axios from "axios";

const ViewFoodProduct = ({ getFood, setFood, editFood }) => {
  const handleDelete = (_id) => {
    const deleteToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTc3NDU3MTM3MjItMzU1MDIzNjkwIiwiaWF0IjoxNzE3NzQ1NzEzLCJleHAiOjE3MTc5MTg1MTN9.JatlWPTSEOE1we88LiThkL59snvFzIVRmzWt94u6F2c";
    axios
      .delete(`https://service.apikeeda.com/nutri-food/${_id}`, {
        headers: {
          Authorization: `Bearer ${deleteToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const deleteData = getFood.filter((item) => {
          return item._id !== _id;
        });
        setFood(deleteData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEditData = (item) => {
    if (editFood) {
      editFood(item);
    }
  };

  return (
    <>
      {getFood.map((item, index) => {
        return (
          <div key={index} className="card my-3">
            <div className="card-body">
              <h5 className="card-title">{item.productName}</h5>
              <p className="card-text">Weight: {item.weight}</p>
              <p className="card-text">Energy: {item.energy}</p>
              <p className="card-text">Protein: {item.protine}</p>
              <p className="card-text">Carbohydrate: {item.carbohydrate}</p>
              <p className="card-text">Fat: {item.fat}</p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-primary me-3"
                onClick={() => onEditData(item)}
              >
                Edit Food
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(item._id)}
              >
                Delete Food
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ViewFoodProduct;
