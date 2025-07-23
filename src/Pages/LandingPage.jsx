import {
    ArrowRight,
    BookOpen,
    Calendar,
    Heart,
    Infinity,
    Mic,
    Moon,
    Share2,
    Shield,
    Sparkles,
    Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useUser } from "../context/UserContext";

const LandingPage = () => {
  const { user, loading } = useUser();
  const cardData = [
    {
      icon: BookOpen,
      iconClass: "text-purple-600 dark:text-purple-400 w-10 h-8",
      title: "Daily Storytelling",
      description:
        "Write meaningful tales that capture your daily experiences and reflections",
    },
    {
      icon: Calendar,
      iconClass: "text-blue-600 dark:text-blue-400 w-10 h-8",
      title: "Calendar View",
      description:
        "Browse your stories by date and revisit precious memories anytime",
    },
    {
      icon: Mic,
      iconClass: "text-indigo-600 dark:text-indigo-400 w-10 h-8",
      title: "Voice Notes",
      description:
        "Record your thoughts and convert speech to text with our voice recorder",
    },
    {
      icon: Share2,
      iconClass: "text-orange-600 dark:text-orange-400 w-10 h-8",
      title: "Shareable Cards",
      description:
        "Transform your tales into beautiful visual cards for social sharing",
    },
    {
      icon: Moon,
      iconClass: "text-indigo-600 dark:text-indigo-400 w-10 h-8",
      title: "Dark Mode",
      description:
        "Write comfortably in any lighting with our beautiful dark theme",
    },
    {
      icon: Shield,
      iconClass: "text-purple-600 dark:text-purple-400 w-10 h-8",
      title: "Privacy First",
      description:
        "Your stories are encrypted and stored securely in your browser",
    },
  ];
  const cardData1 =[
    {
        icon: Heart,
        iconClass: "text-pink-500 dark:text-pink-400 w-12 h-8",
        icondiv : "justify-self-center",
        title: "Emotional Wellness",
        description:
        "Process your emotions through writing and find clarity in your daily experiences.",
    },
    {
        icon: Zap,
        icondiv : "justify-self-center",
        iconClass: "text-yellow-500 dark:text-yellow-400 w-12 h-8 mx-auto ",
        title: "Creative Expression",
        description:
        "Unleash your creativity with voice notes, beautiful cards, and inspiring prompts.",
    }
  ];
  return (
    <>
      <Navbar />
      <div className="px-6 py-20 border-b border-gray-300 dark:border-white/10 shadow-sm pt-24">
        <div className="flex space-x-6 justify-center items-center px-8 ">
          <BookOpen className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          <Sparkles className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          <Heart className="h-10 w-10 text-pink-500 dark:text-pink-400" />
        </div>
        <div className="text-center py-3">
          <h1 className=" text-center text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Give Every Moment a Voice
          </h1>
          <p className="justify-self-center max-w-3xl text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your digital sanctuary for daily reflections, motivational stories,
            and emotional wellness. In a world of noise, find your quiet place
            for poetic storytelling.
          </p>

          <div className=" flex items-center justify-center   text-white">
            {user ? (
              <>
                            <Link to="/Dashboard">
              <button className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
              </>
            ):(
              <>
                            <Link to="/signup">
              <button className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-8">
          <div className="flex flex-col items-center justify-center text-center mb-2">
            <Infinity className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-2" />
            <p className="text-lg font-medium text-black dark:text-white">
              Stories to Tell
            </p>
          </div>

          <div className="text-center">
            <h1 className=" text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              100%
            </h1>
            <p className="text-black dark:text-white">Private & Secure</p>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
              24/7
            </h1>
            <p className="text-black dark:text-white">Always Available</p>
          </div>
        </div>
      </div>

      {/* new */}

      <div className="py-20 px-4">
        <div className="text-center mb-8 text-gray-600 dark:text-gray-300 ">
          <h1 className="mx-auto text-4xl md:text-5xl font-bold mb-6 ">
            Everything You Need to Tell Your Story
          </h1>
          <p className="text-xl max-w-2xl mx-auto pt-2">
            Powerful features designed to make storytelling effortless,
            meaningful, and beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 m-10 lg:w-1/2  justify-self-center ">
          {cardData.map((item, index) => (
            <Card 
              key={index}
              icon={item.icon}
              iconClass={item.iconClass}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
      {/* new 1 */}


      <div className="py-10 px-4 ">
        <Sparkles className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-8" />
        <div className="text-center max-w-8xl">
            <h1 className="sm:text-3xl text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">More Than a Project—It's a Purpose</h1>
            <p className="justify-self-center max-w-2xl sm:text-lg text-xl text-gray-600 dark:text-gray-300 leading-relaxed">Tales of the Day was born from the desire to give every moment a voice. We believe in the power of reflection, the beauty of everyday stories, and the importance of preserving your personal growth journey.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 justify-self-center lg:w-1/2 gap-6 m-10 text-center">
            {cardData1.map((item,index)=>(
                <Card
                    key={index}
                    icon ={item.icon}
                    icondiv = {item.icondiv}
                    iconClass={item.iconClass}
                    title={item.title}
                    description={item.description}
                />


            ))}
        </div>

      </div>

      {/*  */}

      <div className="py-10 px-4">
            <div className= "justify-self-center pt-8 lg:max-w-4xl lg:max-h-5xl text-center p-2 dark:bg-white/5 bg-white/10  backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg transition-all rounded-lg">
                <h1 className="pt-3 text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Your Story Starts Today</h1>
                <p className="pt-4 p-4 text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Every moment has a story. Every story has meaning. Start your journey of reflection, creativity, and emotional wellness.</p>
                <div className="flex items-center justify-center pb-8">
                    {user ? (
                      <>
                        <Link to="/Dashboard">
                    <button className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white">Dashboard <ArrowRight className="ml-2 h-5 w-5" /></button>
                </Link>
                      </>
                    ):
                    (
                      <>
                        <Link to="/singup">
                    <button className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white">Begin Writing Your Tales <ArrowRight className="ml-2 h-5 w-5" /></button>
                </Link>
                      </>
                    )}
                </div>
            </div>
      </div>


            <Footer/>
            
    </>
  );
};
export default LandingPage;
