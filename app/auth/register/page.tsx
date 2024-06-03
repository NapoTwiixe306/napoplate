import Link from "next/link";
import Form from "./form";

export default function Page() {
  return (
    <div className="page-container">
      <div className="content-container">
        <Form />
        <div className="link-container">
          <p>Already have an account</p>
          <Link href="/auth/signin" className="login-link">
            Login to your account
          </Link>
        </div>
      </div>
    </div>
  );
}
