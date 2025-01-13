import {
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';
import { useCreatorStore } from "../store/useCreatorStore.ts";
import { ClientInfoForm } from "../components/Creator/ClientInfoForm.tsx";
import { OrderDTO } from "../types";
import { useCreateCategoryMutation } from "../mutation/useCreateOrderMutation.ts";

export const CreatorSummary = () => {
    const { order, removePart, resetConfiguration } = useCreatorStore();
    const navigate = useNavigate();
    const { mutate } = useCreateCategoryMutation();

    const groupedParts = order.selectedParts.reduce<Record<string, typeof order.selectedParts>>((acc, part) => {
        if (!acc[part.categoryId]) {
            acc[part.categoryId] = [];
        }
        acc[part.categoryId].push(part);
        return acc;
    }, {});

    const hasEmptyCategories = Object.values(groupedParts).some((parts) => parts.length === 0);

    const handleBackToCategory = (identifier: string) => {
        navigate({
            to: `/creator/${identifier}`,
        });
    };

    const onSubmit = (data: OrderDTO) => {
        const details = order.selectedParts
            .sort((a, b) => a.categoryId.localeCompare(b.categoryId))
            .map((part) => part.name)
            .join(', ');
        mutate({ ...data, details }, {
            onSuccess: () => {
                resetConfiguration();
                navigate({ to: '/orders' });
            },
        });
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Order Summary</Typography>
            <ClientInfoForm
                defaultValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    value: order.totalPrice,
                    details: ''
                }}
                onSubmit={onSubmit} />
            {Object.entries(groupedParts).map(([categoryId, parts]) => (
                <Card key={categoryId} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                onClick={() => handleBackToCategory(parts[0]?.categoryIdentifier || '')}
                                edge="start"
                                aria-label={`Return to ${categoryId}`}
                                sx={{ marginRight: 1 }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            Category: {parts[0]?.categoryIdentifier || 'Unknown Category'}
                        </Typography>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {parts.map((part) => (
                                <ListItem
                                    key={part.id}
                                    secondaryAction={
                                        <IconButton
                                            onClick={() => removePart(part.id)}
                                            edge="end"
                                            aria-label="delete"
                                            disabled={parts.length <= 1}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={part.name}
                                        secondary={
                                            <Typography component="span" variant="body2" sx={{ color: 'text.primary' }}>
                                                Price: {part.price} zł
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            ))}
            {hasEmptyCategories && (
                <Typography color="error" variant="body1" sx={{ marginBottom: 2 }}>
                    Each category must have at least one part selected.
                </Typography>
            )}
        </div>
    );
};