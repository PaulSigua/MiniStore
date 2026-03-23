import { Button } from "../../components/animations/tailwind/Button";

export const AddCustomer = ({ onSuccess, content }: { onSuccess: () => void, content: React.ReactNode }) => {
    return (
        <div className="flex flex-col gap-4">
            {content}
            <Button onClick={onSuccess} text="Listo" />
        </div>
    );
};