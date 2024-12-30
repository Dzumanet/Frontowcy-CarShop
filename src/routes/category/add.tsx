import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/category/add"!</div>
}
