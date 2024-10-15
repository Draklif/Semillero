import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { Button } from "@/components/ui/button"
import { useState } from 'react';



function NavBar() { 
  const [loginKey, setLoginKey] = useState("CR");

  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Inicio
        </Link>{' '}
        <Link to="/proyectos" className="[&.active]:font-bold">
          Proyectos
        </Link>
        <Link to="/repositorio" className="[&.active]:font-bold">
          Repositorio
        </Link>
        { localStorage.getItem("CR") && <Link to="/crud" className="[&.active]:font-bold">
          CRUD
        </Link> }
        <GoogleOAuthProvider key={loginKey} clientId="548100950539-d8fgims4tjmthrdje90ohp62113p61rp.apps.googleusercontent.com">
          { !localStorage.getItem("CR") ? <GoogleLogin
            onSuccess={credentialResponse => {
              setLoginKey("CR-Logged")
              localStorage.setItem("CR", credentialResponse.credential??"")
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          /> : <Button onClick={() => {
            setLoginKey("CR")
            localStorage.clear()
          }}>Logout</Button>}
        </GoogleOAuthProvider>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({
  component: NavBar,
});
