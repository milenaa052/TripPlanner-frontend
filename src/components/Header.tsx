import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
    return (
        <header className="header">
            <h2 className="logo">Logo</h2>
            <a href="/usuario">
                <FontAwesomeIcon icon={faCircleUser} className="icon"/>
            </a>
        </header>
    );
};

export default Header;