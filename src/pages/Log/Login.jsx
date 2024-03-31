import Logos from "../../assets/logos.png";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <>
      <section className="bg-orange-brand">
        <div className="flex flex-col items-center justify-center  py-8 mx-auto md:h-screen lg:py-0 round">
          <div className="w-full  shadow dark:border md:mt-0  xl:p-0 round ">
            <div className="    bg-white  space-y-4 md:space-y-4 containerwithBolder ">
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
              <form className="space-y-5 md:space-y-3" action="#">
                <div>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  "
                    placeholder="Nom d'utilisateur"
                    required=""
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mot de passe"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  newClass"
                    required=""
                  />
                </div>
               <Link to="/admin">
                <button
                  type="submit"
                  className=" w-full  bg-blue-500   text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-sec-brand my-2.5"
                 
                >
              connecter
                </button>
               </Link>

                <p
                  className="text-sm font-light "
                  style={{
                    color: "#7C838A",
                    fontSize: "10px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  version publiée le 27-03-2024 12:59
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
