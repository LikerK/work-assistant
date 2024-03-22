import {
    useState,
    useRef,
    useEffect,
  } from 'react';
  import { useFormik } from 'formik';
  import { Link } from 'react-router-dom';
  import { Form, Button, Card } from 'react-bootstrap';
  
  const PageLogin = () => {
    const [authFailed, setAuthFailed] = useState(false);
  
    const inputRef = useRef();
  
    useEffect(() => {
      inputRef.current.focus();
    }, []);
  
    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      onSubmit: async (values) => {
        setAuthFailed(false);
        console.log('Ok!');
      },
    });
    return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="border border-secondary">
              <Card.Body className="row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  image
                </div>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Login</h1>
                  <Form.Group className="mb-4 form-floating">
                    <Form.Control
                      name="username"
                      placeholder="Ваш ник"
                      id="username"
                      onChange={formik.handleChange}
                      className="form-control"
                      value={formik.values.username}
                      isInvalid={authFailed}
                      ref={inputRef}
                      required
                    />
                    <Form.Label htmlFor="username">name</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-4 form-floating">
                    <Form.Control
                      name="password"
                      placeholder="Пароль"
                      type="password"
                      id="password"
                      onChange={formik.handleChange}
                      className="form-control"
                      isInvalid={authFailed}
                      value={formik.values.password}
                      required
                    />
                    <Form.Label htmlFor="password">password</Form.Label>
                  </Form.Group>
                  <Button variant="secondary" className="w-100 mb-3" type="submit">
                    login
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>No account?</span>
                  {' '}
                  <Link to="/signup">Register</Link>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    );
  };
  
  export default PageLogin;