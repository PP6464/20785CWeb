import {useNavigate} from 'react-router-dom';
import './navbar-option.css'

interface NavbarOptionProps {
    title: string // Title of this option
    selected: boolean // Whether or not this is the current page
    path: string // Where to navigate to
    onSelect: () => any // Takes a function to change the selected index in navbar.tsx
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