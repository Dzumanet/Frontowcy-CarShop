import { createFileRoute } from '@tanstack/react-router';
import { EditPart } from '../../components/Part/EditPart.tsx';
import { partOptions } from '../../queries/part.ts';

export const Route = createFileRoute('/category/$identifier/part/$partNameId/edit')({
    component: EditPart,
    loader: ({ context, params }) => {
        const { queryClient } = context;
        const { partNameId } = params;

        return queryClient.ensureQueryData(
            partOptions(partNameId),
        );
    },
});
