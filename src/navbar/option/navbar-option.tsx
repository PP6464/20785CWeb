import {useNavigate} from 'react-router-dom';
import './navbar-option.css'

interface NavbarOptionProps {
    title: string
    selected: boolean
    path: string
    onSelect: () => any
}

function NavbarOption(props: NavbarOptionProps) {
    const navigate = useNavigate()

    function navigateToPath() {
        navigate(props.path);
        props.onSelect()
    }

    return (
        <li className="navbar-option" onClick={navigateToPath} data-selected={props.selected.toString()}>
            <h1>{props.title}</h1>
        </li>
        );
}

export default NavbarOption