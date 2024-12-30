import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/$identifier/part/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/category/$identifier/part/add"!</div>
}
