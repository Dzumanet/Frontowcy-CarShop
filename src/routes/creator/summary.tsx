import { createFileRoute } from '@tanstack/react-router'
import { CreatorSummary } from "../../pages/CreatorSummary.tsx";

export const Route = createFileRoute('/creator/summary')({
  component: CreatorSummary,
})


