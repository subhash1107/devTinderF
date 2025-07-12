import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, gender, age, about, photoUrl, skills } =
    user;
  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {});
      dispatch(removeFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card card-compact bg-base-200  shadow-xl p-2">
        <figure className="w-[300px] h-[300px] rounded-t-lg overflow-hidden mx-auto">
          <img
            src={photoUrl}            
            className="object-fill rounded-t-lg"
            alt={firstName + " " + "photo"}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          {skills && skills.length > 0 && <p>Skills: {skills.join(", ")}</p>}
          <p className=" break-words">{about}</p>
          <div className="card-actions justify-center my-5">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
