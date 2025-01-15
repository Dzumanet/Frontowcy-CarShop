import { Box, Button, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { OrderDTO } from "../../types";

type ClientInfoFormProps = {
    defaultValues: OrderDTO;
    onSubmit: (data: OrderDTO) => void;
}


export const ClientInfoForm = ({ defaultValues, onSubmit }: ClientInfoFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<OrderDTO>({ defaultValues });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                maxWidth: 800,
                margin: '0 auto',
                marginBottom: 3,
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 3,
                    }}
                >
                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            label="First Name"
                            {...register('firstName', { required: 'First Name is required' })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            label="Last Name"
                            {...register('lastName', { required: 'Last Name is required' })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                    <FormControl sx={{ flex: 1 }}>
                        <TextField
                            label="E-mail"
                            {...register('email', { required: 'E-mail is required' })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: 200,
                        }}
                    >
                        Save order
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};