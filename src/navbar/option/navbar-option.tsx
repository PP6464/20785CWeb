import './navbar-option.css'

interface NavbarOptionProps {
    title: string
    selected: boolean
    path: string
    onSelect: () => any
}

function NavbarOption(props: NavbarOptionProps) {
    return (
        <li className="navbar-option" data-selected={props.selected.toString()}>
            <a href={props.path} rel="noreferrer" target="_self" style={{textDecoration: "none", width: "100%", display: "flex", justifyContent: "center", color: "white"}}>
                <h1>{props.title}</h1>
            </a>
        </li>
    );
}

export default NavbarOption
