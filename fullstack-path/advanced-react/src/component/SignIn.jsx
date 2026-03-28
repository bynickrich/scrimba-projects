import { useActionState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";


const Signin = () => {

  const navigate = useNavigate()
  const { signUpNewUser } = useAuth()

  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const user = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      // 2. Call sign up function
      const { success, data, error: signUpError } = await signUpNewUser(user.email, user.password) // sign up function (email, password)

      // 3. Handle known errors (return error)
      if (signUpError) {
        return new Error(signUpError)
      }
      // 4. Handle success (e.g. redirect, return null)
      if (success && data?.session) {
        // Navigate to dashboard
        navigate("/dashboard")
        return null
      }

      // 5. Handle any other errors
      return null
    },
    null,
  );

  return (
    <>
      <h1 className="landing-header">Paper Like A Boss</h1>
      <div className="sign-form-container">
        <form
          action={submitAction}
          aria-label="Sign in form"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Use this form to sign in to your account. Enter your email and
            password.
          </div>

          <h2 className="form-title">Sign in</h2>
          <p>
            Don't have an account yet?{' '}
            <Link className="form-link" to={"/signup"}>
              Sign up
            </Link>
          </p>

          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'signin-error' : undefined}
            disabled={isPending}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'signin-error' : undefined}
            disabled={isPending}
          />

          <button
            type="submit"
            className="form-button"
            aria-busy={isPending}
          >
            {isPending ? 'Signing In' : 'Sign In'}
          </button>

          {error && (
            <div id="signin-error" role="alert" className="sign-form-error-message">{error.message}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default Signin;
