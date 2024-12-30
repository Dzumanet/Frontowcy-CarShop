import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/$identifier/part/$partId/edit')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/category/$identifier/part/$partId/edit"!</div>
}
