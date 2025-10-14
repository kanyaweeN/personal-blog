import clsx from "clsx";
import { useAuth } from "@/contexts/authentication";
import userprofile from "../../assets/icons/userprofile.png";

export default function Userprofile({
    src = userprofile,
    slyte,
}) {
    const { state } = useAuth();
    const avatarUrl = state?.user?.avatar || src;

    return (
        <img
            src={avatarUrl}
            alt="avatar"
            className={clsx("rounded-full object-cover", slyte)}
        />
    );
}
