import {useNavigate} from 'react-router-dom'
import './navbar-option.css'

interface NavbarOptionProps {
    title: string // Title of this option
    selected: boolean// Whether or not this is the current page
    path: string // Where to navigate to
    onClick: () => void // Function to run when selected
}

function NavbarOption(props: NavbarOptionProps) {
    const navigate = useNavigate()

    function navigateToPath() {
        props.onClick()
        navigate(props.path)
    }

    return (
        <li className="navbar-option" onClick={navigateToPath} data-selected={props.selected.toString()}>
            <h1>{props.title}</h1>
        </li>
    )
}

export default NavbarOption