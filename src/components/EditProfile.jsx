import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(
    user.skills ? user.skills.join(", ") : ""
  );
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const saveDetails = async () => {
    try {
      const skillsArray =
        skills.length > 0 ? skills.split(",").map((skill) => skill.trim()) : [];
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills: skillsArray,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setError("");
      setToast(true);
      setTimeout(()=>{setToast(false)},2000)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex sm:justify-center sm:flex-row flex-col gap-3 bg-slate-50 py-4">
        <div>
          <div className="card bg-base-100 w-96 shadow-xl mx-auto h-full">
            <div className="card-body">
              <h2 className="card-title mx-auto">Edit Profile</h2>
              <label htmlFor="editfirstname">First Name :</label>
              <input
                type="text"
                id="editfirstname"
                className="grow input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="editlastname">Last Name :</label>
              <input
                type="text"
                id="editlastname"
                className="grow input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="editage">Age :</label>
              <input
                type="Number"
                id="editfirstname"
                className="grow input input-bordered w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />{" "}
              <div className="flex justify-start w-full gap-2">
                <label htmlFor="genderedit">Gender:</label>
                <div className="flex justify-evenly gap-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="selectmale"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label className="mx-1" htmlFor="selectmale">
                      male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="selectfemale"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label className="mx-1" htmlFor="selectfemale">
                      female
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="selectothers"
                      name="gender"
                      value="others"
                      checked={gender === "others"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label className="mx-1" htmlFor="selectothers">
                      others
                    </label>
                  </div>
                </div>
              </div>
              <label htmlFor="editphoto">Photo URL :</label>
              <input
                type="text"
                id="editphoto"
                className="grow input input-bordered w-full"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <label htmlFor="editskill">Skills :</label>
              <input
                type="text"
                id="editskill"
                className="grow input input-bordered w-full"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <label htmlFor="editabout">About :</label>
              <textarea
                id="editabout"
                className="grow input input-bordered w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <p className="text-red-600">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveDetails}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          className="h-full"
          user={{
            firstName,
            lastName,
            gender,
            photoUrl,
            about,
            age,
            skills: skills.split(",").map((skill) => skill.trim()),
          }}
        />
      </div>
    {toast&&<div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>You have updated your profile.</span>
        </div>
      </div>}
    </>
  );
};

export default EditProfile;
