import Logos from "../../assets/logos.png";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'
import Axios from "axios"
import {useCookies} from 'react-cookie'
function Login() {
  const [NomUtilisateur, setUsername] = useState('');
  const [MotDePasse, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [_,setCookies]=useCookies("jwt")

 const handleLogin = async (e) => {
   e.preventDefault();
   try {
     const res = await Axios.post('http://localhost:3010/auth/login', {
       NomUtilisateur,
       MotDePasse,
     });

     if (res.data.success) {
        //  setCookies('jwt',res.data.token)
        // window.localStorage.setItem('userID', res.data.userID);
       navigate('/admin');
      console.log(res) }
     else {
       setErrorMessage(res.data.message);
     }
   } catch (error) {
     setErrorMessage("Le nom d'utilisateur ou mot de passe incorrect!");
     console.error('Error during login:', error);
   }
 };

 


  return (
    <>
      <section className="">
        <div className="flex flex-col items-center justify-center  py-8 mx-auto md:h-screen lg:py-0 round">
          <div className="w-full  shadow dark:border md:mt-0  xl:p-0 round ">
            <div className="    bg-white  space-y-4 md:space-y-4 containerwithBolder ">
              <div
                className="image"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <img src={Logos} alt="" />
              </div>
              <p
                className="text-xl font-bold leading-tight tracking-tight"
                style={{ textAlign: 'center', textTransform: 'capitalize' }}
              >
                Gestion Budgetaire de la <br />
                raffinerie d’alger
              </p>
              <form className="space-y-5 md:space-y-3" onSubmit={handleLogin}>
                <div>
                  <input
                    type="text"
                    name="NomUtilisateur"
                    value={NomUtilisateur}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nom d'utilisateur"
                    required
                  />{' '}
                </div>
                <div>
                  <input
                    type="password"
                    name="MotDePasse"
                    value={MotDePasse}
                    onChange={(e) => setPassword(e.target.value)}
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
                    color: '#7C838A',
                    fontSize: '10px',
                    textAlign: 'center',
                    fontWeight: '600',
                  }}
                >
                  Version publiée le 27-03-2024 12:59
                </p>
                {/* <p
                  className=" font-light"
                  style={{
                    color: 'red',
                    fontSize: '15px',
                    textAlign: 'center',
                    fontWeight: '400',
                  }}
                >
                  {errorMessage}
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
