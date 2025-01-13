import { createFileRoute } from '@tanstack/react-router'
import { OrdersList } from "../../components/Orders/OrdersList.tsx";
import { ordersOptions } from "../../queries/orders.ts";

export const Route = createFileRoute('/orders/')({
  component: OrdersList,
  loader: ({context}) => {
    const {queryClient} = context;
    return queryClient.ensureQueryData(ordersOptions)
  }
})

