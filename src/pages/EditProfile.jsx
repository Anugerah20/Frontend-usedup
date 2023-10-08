import { BiChevronRight } from "react-icons/bi"

const EditProfile = () => {
     return (
          <div className="my-14 mx-10">

               <div className="breadcrumb">
                    <span className="breadcrumb-no-active text-gray-breadcrumb"><a href="#">Profile</a></span>
                    <span className="breadcrumb-divider text-gray-breadcrumb"> <BiChevronRight /> </span>
                    <span className="breadcrumb-active text-blue-breadcrumb"><a href="#">Edit Profile</a></span>
               </div>

               <h1 className="text-3xl font-bold mt-10 black-breadcrumb">Edit Profil</h1>
               <p className="text-md mt-1 mb-5 text-gray-breadcrumb-secondary">Dibawah ini merupakan informasi yang bisa diubah</p>

               <form>
                    <label htmlFor="fullname">Nama lengkap</label>
                    <input type="text" className="input-profile border-input-gray" name="fullname" id="fullname" />

                    <label htmlFor="bio">Tentang saya</label>
                    <textarea name="bio" id="bio" className="textarea-profile border-input-gray" cols="40" rows="10"></textarea>
                    <button className="btn-profile bg-black-breadcrumb text-white-breadcrumb hover:bg-black-breadcrumb-secondary">simpan</button>
                    <div className="border-bottom text-input-gray"></div>
               </form >
          </div >
     )
}

export default EditProfile
