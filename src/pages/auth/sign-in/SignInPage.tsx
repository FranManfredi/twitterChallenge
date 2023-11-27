import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import AuthWrapper from "../AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import {
  ButtonSize,
  ButtonType,
} from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { Form, Formik } from "formik";

const SignInPage = () => {
  const [error, setError] = useState(false);

  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (email: string, password: string) => {
    httpRequestService
      .signIn({ email, password })
      .then(() => navigate("/"))
      .catch(() => setError(true));
  };

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt={"Twitter Logo"} />
            <StyledH3>{t("title.login")}</StyledH3>
          </div>
          <Formik
            initialValues={{
              password: "",
              email: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values.email, values.password);
            }}
          >
            {({ handleChange }) => (
              <Form>
                <div className={"input-container"}>
                  <LabeledInput
                    required
                    placeholder={"Enter email..."}
                    title={t("input-params.email")}
                    error={error}
                    onChange={handleChange("email")}
                    name="email"
                  />
                  <LabeledInput
                    type="password"
                    required
                    placeholder={"Enter password..."}
                    title={t("input-params.password")}
                    error={error}
                    onChange={handleChange("password")}
                    name="password"
                  />
                  <p className={"error-message"}>{error && t("error.login")}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    text={t("buttons.login")}
                    buttonType={ButtonType.FOLLOW}
                    size={ButtonSize.MEDIUM}
                    type="submit"
                  />
                  <Button
                    text={t("buttons.register")}
                    buttonType={ButtonType.OUTLINED}
                    size={ButtonSize.MEDIUM}
                    onClick={() => navigate("/sign-up")}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignInPage;
