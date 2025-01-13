import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Route } from "../routes/creator/$identifier.tsx";
import { useNavigate } from "@tanstack/react-router";
import { useCategoryId } from "../hooks/useCategoryId.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryWithPartsOptions } from "../queries/categoryWithParts.ts";
import { useCreatorStore } from "../store/useCreatorStore.ts";
import { categoriesOptions } from "../queries/categories.ts";
import { Part } from "../types";
import { OrderValue } from "./OrderValue.tsx";
import { CategoryStepper } from "../components/Stepper/CategoryStepper.tsx";

export const CreatorCategory = () => {
    const { identifier } = Route.useParams();
    const navigate = useNavigate();
    const { categoryId } = useCategoryId(identifier);
    const { data: categoryData } = useSuspenseQuery(categoryWithPartsOptions(categoryId));
    const { data: categoriesData } = useSuspenseQuery(categoriesOptions);
    const { order, setOrderData, } = useCreatorStore();

    const sortedCategories = categoriesData.sort((a, b) => a.position - b.position);

    const currentIndex = sortedCategories.findIndex(
        (cat) => cat.identifier === identifier
    );
    const prevCategory = sortedCategories[currentIndex - 1];
    const nextCategory = sortedCategories[currentIndex + 1];

    const isSelected = (partId: string) => {
        return order.selectedParts.some((part) => part.id === partId);
    };

    const togglePartSelection = (part: Part) => {
        if (isSelected(part.id)) {
            const updatedParts = order.selectedParts.filter((p) => p.id !== part.id);
            setOrderData({
                selectedParts: updatedParts,
                totalPrice: order.totalPrice - part.price,
            });
        } else {
            const updatedParts = [
                ...order.selectedParts,
                { ...part, categoryIdentifier: categoryData.identifier },
            ];
            setOrderData({
                selectedParts: updatedParts,
                totalPrice: order.totalPrice + part.price,
            });
        }
    };

    const isNextDisabled = !order.selectedParts.some(
        (part) => part.categoryId === categoryId
    );


    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {categoryData?.name || 'Loading...'}
            </Typography>
            <OrderValue />
            <CategoryStepper
                steps={[...sortedCategories.map((cat) => cat.name), 'Summary']}
                currentStep={currentIndex < sortedCategories.length ? currentIndex : sortedCategories.length}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Button
                    variant="contained"
                    onClick={() =>
                        prevCategory &&
                        navigate({ to: `/creator/${prevCategory.identifier}` })
                    }
                    disabled={!prevCategory}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    onClick={() =>
                        nextCategory
                            ? navigate({ to: `/creator/${nextCategory.identifier}` })
                            : navigate({ to: '/creator/summary' })
                    }
                    disabled={isNextDisabled}
                >
                    {nextCategory ? 'Next' : 'Summary'}
                </Button>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                {categoryData?.parts?.map((part) => (
                    <Box
                        key={part.id}
                        sx={{
                            flex: '1 1 calc(25% - 16px)',
                            maxWidth: 'calc(25% - 16px)',
                            cursor: 'pointer',
                            border: isSelected(part.id) ? '4px solid green' : '1px solid gray',
                            '&:hover': {
                                boxShadow: 6,
                            },
                        }}
                        onClick={() => togglePartSelection(part)}
                    >
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {part.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID: {part.id}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: {part.categoryId}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    Price: {part.price} zł
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};