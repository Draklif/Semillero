import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { Button } from "@/components/ui/button"
import { useState } from 'react';



function NavBar() { 
  const [loginKey, setLoginKey] = useState("CR");
  const [proyectoId] = useState("0");

  return (
    <>
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center px-16">
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-400 transition-colors duration-300">
            <img 
              src="./LogoUDB.png" 
              alt="Logo Universidad de Boyacá" 
              className="h-8" 
            />
          </Link>

          <Link to="/" className="hover:text-blue-400 transition-colors duration-300">
            Inicio
          </Link>
          <Link to="/proyectos" className="hover:text-blue-400 transition-colors duration-300">
            Proyectos
          </Link>
          <Link to="/repositorio" className="hover:text-blue-400 transition-colors duration-300">
            Repositorio
          </Link>

          <input type="hidden" value={proyectoId} />

          {localStorage.getItem("CR") && (
            <Link to={`/crud/${proyectoId}`} className="hover:text-blue-400 transition-colors duration-300">
              Nuevo Proyecto
            </Link>
          )}
        </div>
        
        <div>
          <GoogleOAuthProvider key={loginKey} clientId="548100950539-d8fgims4tjmthrdje90ohp62113p61rp.apps.googleusercontent.com">
            {!localStorage.getItem("CR") ? (
              <GoogleLogin
                onSuccess={credentialResponse => {
                  setLoginKey("CR-Logged")
                  localStorage.setItem("CR", credentialResponse.credential ?? "")
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            ) : (
              <Button
                className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition-colors duration-300"
                onClick={() => {
                  setLoginKey("CR")
                  localStorage.clear()
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            )}
          </GoogleOAuthProvider>
        </div>
      </div>
      
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({
  component: NavBar,
});
