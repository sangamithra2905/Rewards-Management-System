import React, { useEffect, useState } from "react";
import axios from "axios";

function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rewards");
      setRewards(response.data.rewards);
    } catch (error) {
      console.error("Error fetching rewards: ", error);
    }
  };

  const addReward = async () => {
    try {
      await axios.post("http://localhost:5000/rewards", {
        name,
        points,
      });
      fetchRewards();
      setName("");
      setPoints("");
    } catch (error) {
      console.error("Error adding reward: ", error);
    }
  };

  const deleteReward = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/rewards/${id}`);
      fetchRewards();
    } catch (error) {
      console.error("Error deleting reward: ", error);
    }
  };

  const updateReward = async () => {
    try {
      await axios.put(`http://localhost:5000/rewards/${editId}`, {
        name,
        points,
      });
      fetchRewards();
      setName("");
      setPoints("");
      setEditId(null);
    } catch (error) {
      console.error("Error updating reward: ", error);
    }
  };

  const handleEdit = (reward) => {
    setName(reward.name);
    setPoints(reward.points);
    setEditId(reward.id);
  };

  return (
    <div className="container-fluid">
      <h1 className="my-4 text-center">Reward Management System</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="toolbar">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Add Reward</h5>
                <input
                  type="text"
                  value={name}
                  placeholder="Reward Name"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control mb-2"
                />
                <input
                  type="number"
                  value={points}
                  placeholder="Points"
                  onChange={(e) => setPoints(e.target.value)}
                  className="form-control mb-2"
                />
                {editId ? (
                  <button onClick={updateReward} className="btn btn-primary">Update</button>
                ) : (
                  <button onClick={addReward} className="btn btn-primary">Add Reward</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        {rewards.map((reward) => (
          <div key={reward.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{reward.name}</h5>
                <p className="card-text">Points: {reward.points}</p>
                <button onClick={() => deleteReward(reward.id)} className="btn btn-danger">Delete</button>
                <button onClick={() => handleEdit(reward)} className="btn btn-primary">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rewards;
