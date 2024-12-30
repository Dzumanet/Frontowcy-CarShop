import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/$identifier/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/category/$identifier/edit"!</div>
}
