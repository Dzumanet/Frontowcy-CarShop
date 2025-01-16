import { createFileRoute } from '@tanstack/react-router';
import { EditPart } from '../../components/Part/EditPart.tsx';
import { partOptions } from '../../queries/part.ts';

export const Route = createFileRoute('/category/$identifier/part/$partNameId/edit')({
    component: EditPart,
    loader: async ({ context, params }) => {
        const { queryClient } = context;
        const { partNameId } = params;

        try {
            return await queryClient.ensureQueryData(partOptions(partNameId));
        } catch {
            throw new Error(`Could not load data for part "${partNameId}"`);
        }
    },
});