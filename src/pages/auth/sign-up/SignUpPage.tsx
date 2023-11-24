import type { ChangeEvent } from "react";
import { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonSize, ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { ErrorText } from "../../../components/error-text/ErrorText";
import * as Yup from "yup";
import { Form, Formik } from "formik";

interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ErrorItem {
  property: string;
  constraints: Record<string, string>;
}

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required')
});

const SignUpPage = () => {
  const [error, setError] = useState(false);
  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <Formik
            initialValues={
              {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}

            validationSchema={SignupSchema}
            onSubmit={values => {
              const { confirmPassword, ...requestData } = values;
              httpRequestService
                .signUp(requestData)
                .then(() => navigate("/"))
                .catch((err) => {
                  setError(true);
                  console.log(err.response.data.errors);
                  setErrors(err.response.data.errors);
                });
              console.log(values);
            }}>
              {({handleChange, errors: e}) =>
                <Form>
              <div className={"input-container"}>
                <LabeledInput
                  required ={false}
                  placeholder={"Enter username..."}
                  title={t("input-params.username")}
                  error={error}
                  onChange={handleChange("username")}
                  name="username"
                />
                {e.username ? <p className="error-message">{e.username}</p> : <ErrorText propName={"username"} error errors={errors} />}
                <LabeledInput
                  required={false}
                  placeholder={"Enter email..."}
                  title={t("input-params.email")}
                  error={error}
                  onChange={handleChange("email")}
                  name="email"
                />
                {e.email ?  <p className="error-message">{e.email}</p>  : <ErrorText propName={"email"} error errors={errors} />}
                <LabeledInput
                  type="password"
                  required={false}
                  placeholder={"Enter password..."}
                  title={t("input-params.password")}
                  error={error}
                  onChange={handleChange("password")}
                  name="password"
                />
                {e.password ? <p className="error-message">{e.password}</p> : <ErrorText propName={"password"} error errors={errors} />}
                <LabeledInput
                  type="password"
                  required={false}
                  placeholder={"Confirm password..."}
                  title={t("input-params.confirm-password")}
                  error={error}
                  onChange={handleChange("confirmPassword")}
                  name="confirmPassword"
                />
                {e.confirmPassword? <p className="error-message">{e.confirmPassword}</p> : null}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  text={t("buttons.register")}
                  buttonType={ButtonType.FOLLOW}
                  size={ButtonSize.MEDIUM}
                  type="submit"
                />
                <Button
                  text={t("buttons.login")}
                  buttonType={ButtonType.OUTLINED}
                  size={ButtonSize.MEDIUM}
                  onClick={() => navigate("/sign-in")}
                />
              </div>
            </Form>
              }
            
          </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
