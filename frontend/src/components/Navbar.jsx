import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavbarMenu = () => {
    return (
        <Navbar className="mb-2" collapseOnSelect expand="sm" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">MyAssist</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Link className="btn btn-light" to="/">Расписание</Link>
                    <Link className="btn btn-light" to="/students">Студенты</Link>
                    <Link className="btn btn-light" to="/salary">Зарплата</Link>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default NavbarMenu;