import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth , db} from "../utils/firebaseConfig";
import { Link } from "react-router-dom";
import Login_Singuppage from "../Components/Login_Singuppage";
import InputForm from "../Components/InputForm";
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const reqinput = [
    { label: "Full Name", type: "text", name: "fullName" },
    { label: "Email", type: "email", name: "email" },
    { label: "Password", type: "password", name: "password" },
  ];
  const reqhead = [
    {
      heading: "Begin Your Journey",
      sub: "Every moment deserves a voice.",
    },
  ];

  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  });
  const navigate = useNavigate();
  const handleChange = (e)=>{

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSignUp= async()=>{
        const {fullName,email,password} = formData;
        try{
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            await setDoc(doc(db,"users",user.uid),{
                fullName,
                email,
                createdAt: new Date(),
            });
            alert("done")
            navigate("/login")
        }
        catch(error)
        {
            alert(error.message);
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
                onChange={handleChange}     
              />
            ))}
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Already Account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition"
              >
                Sign In
              </Link>
            </p>

            <button
              type="submit"
              onClick={handleSignUp}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-4xl p-2 text-white font-bold "
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
