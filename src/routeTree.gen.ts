/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RepositorioImport } from './routes/repositorio'
import { Route as IndexImport } from './routes/index'
import { Route as ProyectosIndexImport } from './routes/proyectos/index'
import { Route as CrudIndexImport } from './routes/crud/index'
import { Route as ProyectosProyectoIdImport } from './routes/proyectos/$proyectoId'
import { Route as CrudProyectoIdImport } from './routes/crud/$proyectoId'

// Create/Update Routes

const RepositorioRoute = RepositorioImport.update({
  path: '/repositorio',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProyectosIndexRoute = ProyectosIndexImport.update({
  path: '/proyectos/',
  getParentRoute: () => rootRoute,
} as any)

const CrudIndexRoute = CrudIndexImport.update({
  path: '/crud/',
  getParentRoute: () => rootRoute,
} as any)

const ProyectosProyectoIdRoute = ProyectosProyectoIdImport.update({
  path: '/proyectos/$proyectoId',
  getParentRoute: () => rootRoute,
} as any)

const CrudProyectoIdRoute = CrudProyectoIdImport.update({
  path: '/crud/$proyectoId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/repositorio': {
      id: '/repositorio'
      path: '/repositorio'
      fullPath: '/repositorio'
      preLoaderRoute: typeof RepositorioImport
      parentRoute: typeof rootRoute
    }
    '/crud/$proyectoId': {
      id: '/crud/$proyectoId'
      path: '/crud/$proyectoId'
      fullPath: '/crud/$proyectoId'
      preLoaderRoute: typeof CrudProyectoIdImport
      parentRoute: typeof rootRoute
    }
    '/proyectos/$proyectoId': {
      id: '/proyectos/$proyectoId'
      path: '/proyectos/$proyectoId'
      fullPath: '/proyectos/$proyectoId'
      preLoaderRoute: typeof ProyectosProyectoIdImport
      parentRoute: typeof rootRoute
    }
    '/crud/': {
      id: '/crud/'
      path: '/crud'
      fullPath: '/crud'
      preLoaderRoute: typeof CrudIndexImport
      parentRoute: typeof rootRoute
    }
    '/proyectos/': {
      id: '/proyectos/'
      path: '/proyectos'
      fullPath: '/proyectos'
      preLoaderRoute: typeof ProyectosIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/repositorio': typeof RepositorioRoute
  '/crud/$proyectoId': typeof CrudProyectoIdRoute
  '/proyectos/$proyectoId': typeof ProyectosProyectoIdRoute
  '/crud': typeof CrudIndexRoute
  '/proyectos': typeof ProyectosIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/repositorio': typeof RepositorioRoute
  '/crud/$proyectoId': typeof CrudProyectoIdRoute
  '/proyectos/$proyectoId': typeof ProyectosProyectoIdRoute
  '/crud': typeof CrudIndexRoute
  '/proyectos': typeof ProyectosIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/repositorio': typeof RepositorioRoute
  '/crud/$proyectoId': typeof CrudProyectoIdRoute
  '/proyectos/$proyectoId': typeof ProyectosProyectoIdRoute
  '/crud/': typeof CrudIndexRoute
  '/proyectos/': typeof ProyectosIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/repositorio'
    | '/crud/$proyectoId'
    | '/proyectos/$proyectoId'
    | '/crud'
    | '/proyectos'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/repositorio'
    | '/crud/$proyectoId'
    | '/proyectos/$proyectoId'
    | '/crud'
    | '/proyectos'
  id:
    | '__root__'
    | '/'
    | '/repositorio'
    | '/crud/$proyectoId'
    | '/proyectos/$proyectoId'
    | '/crud/'
    | '/proyectos/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  RepositorioRoute: typeof RepositorioRoute
  CrudProyectoIdRoute: typeof CrudProyectoIdRoute
  ProyectosProyectoIdRoute: typeof ProyectosProyectoIdRoute
  CrudIndexRoute: typeof CrudIndexRoute
  ProyectosIndexRoute: typeof ProyectosIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  RepositorioRoute: RepositorioRoute,
  CrudProyectoIdRoute: CrudProyectoIdRoute,
  ProyectosProyectoIdRoute: ProyectosProyectoIdRoute,
  CrudIndexRoute: CrudIndexRoute,
  ProyectosIndexRoute: ProyectosIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/repositorio",
        "/crud/$proyectoId",
        "/proyectos/$proyectoId",
        "/crud/",
        "/proyectos/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/repositorio": {
      "filePath": "repositorio.tsx"
    },
    "/crud/$proyectoId": {
      "filePath": "crud/$proyectoId.tsx"
    },
    "/proyectos/$proyectoId": {
      "filePath": "proyectos/$proyectoId.tsx"
    },
    "/crud/": {
      "filePath": "crud/index.tsx"
    },
    "/proyectos/": {
      "filePath": "proyectos/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
