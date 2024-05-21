import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/repositorio')({
  component: () => <div>Hello /repositorio!</div>
})