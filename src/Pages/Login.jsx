import { useState } from "react";
import { Link } from "react-router-dom";
import Login_Singuppage from "../Components/Login_Singuppage";
import { useNavigate } from "react-router-dom";
import InputForm from "../Components/InputForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const reqinput = [
    { label: "Email", type: "email", name: "email" },
    { label: "Password", type: "password", name: "password" },
  ];
  const reqhead = [
    {
      heading: "Begin Your Journey",
      sub: "Every moment deserves a voice.",
    },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      var userId;
      if (userDoc.exists()) {
        userId = user.uid;
      }
      // alert();
      toast.success("Signed in successfully!", {
        
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/dashboard");
    } catch (error) 
    {

      toast.error(error.message || "Something went wrong!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      // console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="">
        <div>
          <Login_Singuppage />
        </div>

        <div className="p-4   justify-self-center md:w-xl ">
          <div className=" dark:bg-white/5 bg-white/10 dark:text-white backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg transition-all p-8 rounded-lg">
            {reqhead.map((item, index) => (
              <InputForm
                key={`head-${index}`}
                heading={item.heading}
                sub={item.sub}
              />
            ))}

            {reqinput.map((item, index) => (
              <InputForm
                key={`input-${index}`}
                label={item.label}
                name={item.name}
                type={item.type}
                value={formData[item.name]}
                onChange={onChange}
              />
            ))}
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition"
              >
                Create Account
              </Link>
            </p>

            <button
              type="submit"
              onClick={handleLogin}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-4xl p-2 text-white font-bold "
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
