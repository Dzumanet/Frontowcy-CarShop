import { Step, StepLabel, Stepper } from "@mui/material";

export const CategoryStepper = ({ steps, currentStep }: { steps: string[]; currentStep: number }) => {
    return (
        <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};