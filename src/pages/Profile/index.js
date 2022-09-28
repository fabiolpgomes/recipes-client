import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);

  const [img, setImg] = useState("");
  const [reload, setReload] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await api.get("/users/profile");
        setUser(response.data);
        console.log(response);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [reload]);

  function handleLogOut(e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  useEffect(() => {
    async function updateIMG() {
      if (!img) {
        //só se for false
        return;
      }
      await handleUpload();
      setReload(!reload);
    }
    updateIMG();
  }, [img]);

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      console.log(uploadData);
      uploadData.append("picture", img);
      console.log(uploadData);

      const response = await api.post("/upload-image", uploadData);
      // response.data.url ->>> a url da minha imagem salva no cloudnary
      console.log(response);
      let url = response.data.url;
      const response2 = await api.put("/users/edit", {
        profilePic: url,
      });
      console.log(response2);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!isLoading && (
        <>
          <h1>{user.username}</h1>
          <p>{user.email}</p>
          <img src={user.profilePic} alt="" width={150} />
        </>
      )}

      <button onClick={handleLogOut}>Logout</button>

      <div>
        <p>Alterar foto de perfil</p>
        <input type="file" onChange={handleImage} />
      </div>
    </>
  );
}
export default Profile;
