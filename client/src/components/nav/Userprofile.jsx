import { useNavigate } from 'react-router-dom';
import clsx from "clsx";
import userprofile from '../../assets/icons/userprofile.png'

function Userprofile({ src = userprofile, slyte }) {
    const navigate = useNavigate();
    const baseColor = `rounded-full object-cover`
    return (
        <img
            src={src}
            alt="avatar"
            className={clsx(baseColor, slyte)}
        />
    );
}

export default Userprofile;