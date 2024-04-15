import {
  useState,
  useRef,
  useEffect,
} from 'react';
import * as yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Form, Button, Card } from 'react-bootstrap';

const SignUpPage = () => {
  const auth = getAuth();
  const authHook = useAuth();
  const navigation = useNavigate();
  const [signUpError, setSignUpError] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .required('Поле обязательно')
      .min(3, 'Минимальная длинна 3 символа')
      .max(20, 'Максимальна длинна 20 символов'),
    password: yup.string()
      .min(6, 'Минимальный пароль 6 символов'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
      .required('Поле обязательно'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnChange: false,

    onSubmit: async ({ username, password }) => {
      setSignUpError(false);
      createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          authHook.logIn(user);
          navigation('/');
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="border border-secondary">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <span>Image</span>
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Register</h1>
                <Form.Group className="mb-4 form-floating">
                  <Form.Control
                    name="username"
                    placeholder="Ваш ник"
                    id="username"
                    onChange={formik.handleChange}
                    className="form-control"
                    value={formik.values.username}
                    disabled={formik.isSubmitting}
                    isInvalid={(formik.touched.username && formik.errors.username) || signUpError}
                    ref={inputRef}
                    noValidate
                  />
                  <Form.Label htmlFor="username">username</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {signUpError ? 'Такой пользователь уже есть'
                      : formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4 form-floating">
                  <Form.Control
                    name="password"
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    className="form-control"
                    isInvalid={(formik.touched.password && formik.errors.password)}
                    value={formik.values.password}
                    noValidate
                  />
                  <Form.Label htmlFor="password">password</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.password}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4 form-floating">
                  <Form.Control
                    name="confirmPassword"
                    placeholder="Повтор пароля"
                    type="password"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    className="form-control"
                    isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    value={formik.values.confirmPassword}
                    noValidate
                  />
                  <Form.Label htmlFor="confirmPassword">confirm password</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.confirmPassword}
                  </Form.Text>
                </Form.Group>
                <Button variant="secondary" className="w-100 mb-3" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;