import { Step, StepLabel, Stepper } from "@mui/material";

export const CategoryStepper = ({ steps, currentStep }: { steps: string[]; currentStep: number }) => {
    return (

        <Stepper
            activeStep={currentStep}
            alternativeLabel
            sx={{
                marginBottom: 3,
                '& .MuiStepIcon-root.Mui-active': {
                    color: 'primary.main',
                },
                '& .MuiStepIcon-root.Mui-completed': {
                    color: 'success.main',
                },
            }}
        >
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};