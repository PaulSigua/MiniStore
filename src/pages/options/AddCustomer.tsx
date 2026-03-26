import { CreateUser } from "../../components/forms/create-user/CreateUser";

export const AddCustomer = ({ content, onSuccess }: { content: React.ReactNode, onSuccess: () => void }) => {
    return (
        <div className="flex flex-col gap-4">
            {content}
            <CreateUser onSuccess={onSuccess} />
        </div>
    );
};