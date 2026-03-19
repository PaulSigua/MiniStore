import { useUser } from "../../core/hooks/user.hook";

export const AdminPage = () => {
    const { logout } = useUser();
    return (
        <div>
            <h1>Admin</h1>
            <button className="btn-primary" onClick={logout}>Logout</button>
        </div>
    );
};