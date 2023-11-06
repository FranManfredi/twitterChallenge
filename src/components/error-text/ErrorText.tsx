
import { ErrorItem } from "../../pages/auth/sign-up/SignUpPage";
import { useTranslation } from "react-i18next";



export const ErrorText = ({ propName, error, errors }: { propName: string; error: boolean; errors: ErrorItem[] }) => {
  const { t } = useTranslation();

  try {
    if (error && errors.some((err) => err?.property === propName)) {
      const errorMessages = errors
        .filter((err) => err?.property === propName)
        .map((err) => {
          const key = Object.keys(err.constraints)[0];
          return t(err.constraints[key]);
        })
        .join(", ");

      return (
        <p className="error-message">
          {errorMessages}
        </p>
      );
    }
  } catch (e) {
    if ((errors as any).error_code === "Mail already exists" && propName === "email") {
      return (
        <p className="error-message">
          {t("Acount with this email already exists")}
        </p>
      );
    }
  }
  return null; // Return null if no error message is to be displayed.
};
