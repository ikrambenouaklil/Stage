import Logos from "../../assets/logos.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios"; // Assurez-vous d'importer axios
import { useCookies } from "react-cookie";
function Login() {
   const [cookies, setCookie, removeCookie] = useCookies();

  
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [userInputs, setUserInput] = useState({
    NomUtilisateur: "",
    MotDePasse: "",
  });
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


        const response = await axios.post("http://localhost:3010/auth/login", {
          NomUtilisateur: userInputs.NomUtilisateur,
          MotDePasse: userInputs.MotDePasse,
        });
        
                if (response.data.success) {
        
                setCookie("token", response.data.token);
                 console.log(cookies);
                // console.log(response.data.userID);
                navigate("/auth");
              }



    } catch (error) {
      setIsError(true);
      setError("Nom utilisateur ou Mot de passe incorrecte");
      console.log(error);
    }
  };

  return (
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0 round">
          <div className="w-full shadow dark:border md:mt-0 xl:p-0 round">
            <div className="bg-white space-y-4 md:space-y-4 containerwithBolder">
              <div
                className="image"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={Logos} alt="" />
              </div>
              <p
                className="text-xl font-bold leading-tight tracking-tight"
                style={{ textAlign: "center", textTransform: "capitalize" }}
              >
                Gestion Budgetaire de la <br />
                raffinerie d’alger
              </p>
              <form className="space-y-5 md:space-y-3" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="NomUtilisateur"
                    value={userInputs.NomUtilisateur}
                    onChange={(e) =>
                      setUserInput((pre) => {
                        return { ...pre, NomUtilisateur: e.target.value };
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nom d'utilisateur"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="MotDePasse"
                    value={userInputs.MotDePasse}
                    onChange={(e) =>
                      setUserInput((pre) => {
                        return { ...pre, MotDePasse: e.target.value };
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white newClass"
                    placeholder="Mot de passe"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-sec-brand my-2.5"
                >
                  Se connecter
                </button>
                <p
                  className="text-sm font-light"
                  style={{
                    color: "#7C838A",
                    fontSize: "10px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Version publiée le 27-03-2024 12:59
                </p>
              </form>

              {isError && (
                <p
                  className="error-message"
                  style={{
                    color: "red",
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
