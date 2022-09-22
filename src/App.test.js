import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";



const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const clickSubmitBtn = () => {
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.click(submitButtonElement);
};
describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });
  
  test("inputs should be initially empty", () => {
    expect(screen.getByRole("textbox").value).toBe("");
    expect(screen.getByLabelText("Password").value).toBe("");
    expect(screen.getByLabelText(/confirm password/i).value).toBe("");
    //1) Rendering the component we want to test
    //2) Finding the elements
    //3) Assertion
    // render(<App/>)
  });
  test("should be able to type an email", () => {
    const { emailInputElement } = typeIntoForm({ email: "selena@gmail.com" });
    expect(emailInputElement.value).toBe("selena@gmail.com");
  });

  test("sould be able to type a password", () => {
    const { passwordInputElement } = typeIntoForm({ password: "qaz123" });
    expect(passwordInputElement.value).toBe("qaz123");
  });

  test("sould be able to type a confirm password", () => {
    const { confirmPasswordInputElement } = typeIntoForm({
      confirmPassword: "qaz123",
    });
    expect(confirmPasswordInputElement.value).toBe("qaz123");
  });

  describe("Handling Errors", () => {
    test("should show email error message on invalid email", () => {
      expect(screen.queryByText(/The email you input is invalid/)).not
        .toBeInTheDocument;

      typeIntoForm({ email: "senagmail.com" });

      clickSubmitBtn();

      expect(
        screen.queryByText(/The email you input is invalid/)
      ).toBeInTheDocument();
    });

    test("password should contain 5 or more characters", () => {
      expect(
        screen.queryByText("The password must have 5 digits or more")
      ).not.toBeInTheDocument();

      typeIntoForm({ email: "senagmail@gmail.com", password: "123" });
      clickSubmitBtn();

      expect(
        screen.queryByText("The password must have 5 digits or more")
      ).toBeInTheDocument();
    });

    test("should show confirm password error if passwords are not the same", () => {
      typeIntoForm({
        email: "senagmail@gmail.com",
        password: "123456",
        confirmPassword: "12345",
      });

      expect(
        screen.queryByText("The passwords don't match try again")
      ).not.toBeInTheDocument();

      clickSubmitBtn();

      expect(
        screen.queryByText("The passwords don't match try again")
      ).toBeInTheDocument();
    });
  });

  test("happy path", () => {
    typeIntoForm({
      email: "senagmail@gmail.com",
      password: "12345",
      confirmPassword: "12345",
    });

    clickSubmitBtn();

    expect(
      screen.queryByText(/The email you input is invalid/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("The password must have 5 digits or more")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("The passwords don't match try again")
    ).not.toBeInTheDocument();
  });
});
