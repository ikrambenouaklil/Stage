import Logos from "../assets/logos.png";

import "./login.css";

function Login() {
  return (
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center  py-8 mx-auto md:h-screen lg:py-0 round">
          <div className="w-full  shadow dark:border md:mt-0  xl:p-0 round ">
            <div className="    bg-white  space-y-4 md:space-y-4 containerwithBolder ">
              {/* space-y-4 md:space-y-6 sm:p-8 */}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg   block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required=""
                  />
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </div> */}
                <button
                  type="submit"
                  style={{ background: "#FF8500" }}
                  className="w-full text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p
                  className="text-sm font-light "
                  style={{
                    color: "#545454",
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
