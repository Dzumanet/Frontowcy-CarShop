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
            <Typography variant="h4" component="h1" gutterBottom align="center">
                {categoryData?.name || 'Loading...'}
            </Typography>
            <OrderValue />
            <Box sx={{ marginBottom: 4 }}>
                <CategoryStepper
                    steps={[...sortedCategories.map((cat) => cat.name), 'Summary']}
                    currentStep={currentIndex < sortedCategories.length ? currentIndex : sortedCategories.length}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
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
                    sx={{
                        backgroundColor: nextCategory ? 'primary.main' : '#ff5722',
                        '&:hover': {
                            backgroundColor: nextCategory ? 'primary.dark' : '#e64a19',
                        },
                        color: nextCategory ? 'inherit' : '#ffffff',
                    }}
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
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 3,
                }}
            >
                {categoryData?.parts?.map((part) => (
                    <Card
                        key={part.id}
                        sx={{
                            border: isSelected(part.id) ? '2px solid green' : '1px solid #ccc',
                            borderRadius: 2,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '150px',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
                            },
                            cursor: 'pointer',
                            backgroundColor: isSelected(part.id) ? '#eaffea' : '#fff',
                        }}
                        onClick={() => togglePartSelection(part)}
                    >
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1,
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: isSelected(part.id) ? 'green' : 'inherit',
                                    marginBottom: 'auto',
                                }}
                            >
                                {part.name}
                            </Typography>
                            <Typography
                                variant="h6"
                                color="text.primary"
                                sx={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    marginTop: 'auto',
                                }}
                            >
                                Price: {part.price} zł
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};