import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';
import { Button } from 'react-bootstrap';

const NavbarMenu = () => {
    const auth = useAuth();
    return auth.user ? (
        <Navbar className="mb-2" collapseOnSelect expand="sm" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">MyAssist</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Link className="btn btn-light" to="/">Расписание</Link>
                    <Link className="btn btn-light" to="/students">Студенты</Link>
                    <Link className="btn btn-light" to="/salary">Зарплата</Link>
                    <Button onClick={() => auth.logOut()}>Log out</Button>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    ) : null
};

export default NavbarMenu;