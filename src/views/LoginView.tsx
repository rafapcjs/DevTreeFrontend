 import { Link } from "react-router-dom";
import "../index.css"; // Path:
export default function LoginView() {
  return (
    <>
   
      <nav>
        <Link className='text-center text-white text-lg block'  to="/auth/register">
          Do you have an account? You can start a session
        </Link>
      </nav>
    </>
  );
}
