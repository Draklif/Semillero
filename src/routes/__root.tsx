import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
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
        <Link to="/crud" className="[&.active]:font-bold">
          CRUD
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
