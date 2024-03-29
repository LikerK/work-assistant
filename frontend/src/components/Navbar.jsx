import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/index.js';
import { Button } from 'react-bootstrap';
import { setComponent } from '../slices/components.js';


const NavbarMenu = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const updateComponent = (component) => dispatch(setComponent({currentComponent:component}));
    return auth.user ? (
        <Navbar collapseOnSelect expand="sm" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">MyAssist</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end m-2" id="responsive-navbar-nav">
                    <Button className="btn btn-light" onClick={() => updateComponent('shedule')}>Расписание</Button>
                    <Button className="btn btn-light" onClick={() => updateComponent('students')} >Студенты</Button>
                    <Button className="btn btn-light" onClick={() => updateComponent('salary')} >Зарплата</Button>
                    <Button onClick={() => auth.logOut()} variant='light'>Log out</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    ) : null
};

export default NavbarMenu;