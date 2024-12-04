import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { setLoading } from "../utils/loadingSlice";
import Loading from "./Loading";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photo, setPhoto] = useState(null);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(
    user.skills ? user.skills.join(", ") : ""
  );
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector((store)=>store.loading.isLoading)

  const saveDetails = async () => {
    try {
      dispatch(setLoading(true))
      const formData = new FormData();
      const skillsArray =
        skills.length > 0 ? skills.split(",").map((skill) => skill.trim()) : [];
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("about", about);
      formData.append("skills", JSON.stringify(skillsArray));

      if (photo) {
        formData.append("photo", photo);
      }else{console.log("no photo append");
      }
      
      const res = await axios.patch(BASE_URL + "/profile/edit", formData,);  
      dispatch(addUser(res.data));
      setError("");
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } catch (error) {
      setError(error?.response?.data || "something went wrong ");
    } finally{
      dispatch(setLoading(false))
    }
  };

  if(isLoading) return <Loading/>

  return (
    <>
      <div className="flex sm:justify-center sm:flex-row flex-col gap-3 bg-slate-50 py-4">
        <div>
          <div className="card bg-base-100 w-full sm:w-96 shadow-xl mx-auto h-full">
            <div className="card-body">
              <h2 className="card-title mx-auto">Edit Profile</h2>
              <label htmlFor="editfirstname">First Name :</label>
              <input
                type="text"
                id="editfirstname"
                className="grow input input-bordered w-full bg-slate-50 "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="editlastname">Last Name :</label>
              <input
                type="text"
                id="editlastname"
                className="grow input input-bordered w-full bg-slate-50"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="editage">Age :</label>
              <input
                type="Number"
                id="editfirstname"
                className="grow input input-bordered w-full bg-slate-50"
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
              <label
                htmlFor="editphoto"
                className="block text-gray-700 font-medium mb-2"
              >
                Photo URL :
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="absolute inset-0 w-full h-full bg-slate-200 border border-slate-300 rounded-md text-gray-700 flex items-center justify-center"
                  onClick={() => document.getElementById("editphoto").click()}
                >
                  Choose a File
                </button>
                <input
                  type="file"
                  id="editphoto"
                  className="opacity-0 w-full h-full cursor-pointer"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
              <label htmlFor="editskill">Skills :</label>
              <input
                type="text"
                id="editskill"
                className="grow input input-bordered w-full bg-slate-50"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <label htmlFor="editabout">About :</label>
              <textarea
                id="editabout"
                className="grow input input-bordered w-full bg-slate-50"
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
            photoUrl: photo ? URL.createObjectURL(photo) : user.photoUrl,
            about,
            age,
            skills: skills.split(",").map((skill) => skill.trim()),
          }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>You have updated your profile.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
