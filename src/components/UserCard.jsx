import React from 'react'

const UserCard = ({user}) => {
  const {firstName, lastName, gender, age, about, photoUrl,skills} =user
  return (<>
    <div className="card card-compact bg-base-100 sm:w-96  shadow-xl p-2">
  <figure>
    <img
      src={photoUrl}
      className='h-full'
      alt={firstName + " "+"photo"} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age&&gender&&<p>{age+", "+gender}</p>}
    {skills && skills.length > 0 && (
            <p>Skills: {skills.join(', ')}</p>
          )}
    <p className=' break-words'>{about}</p>
    <div className="card-actions justify-center my-5">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  </>)
}

export default UserCard