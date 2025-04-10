import React  from "react";
import { Link } from "react-router-dom";
import Logo from "../shared/Logo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { LogOut, UserCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";


const Navbar = () => {
  const {user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // const [user, setUser] = useState(true);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/user/logout");
      if (res.data.success) {
        // setUser(false);
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background-foreground">
      <div className="container  flex h-14 max-w-screen-2xl items-center p-8">
        <div className="flex flex-1 items-center justify-between">
          <Logo />

          {user ? (
            <Popover >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage className="color-blend-normal"
                     src="https://github.com/shadcn.png" 
                      alt="User"
                    /> 
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 mt-3 bg-white shadow-lg" align="end" forceMount>
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-100 cursor-pointer" 
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant={"secondary"}>
                  <Link to="/login">Login</Link>
                </Button>
              </Link>
              <Link variant={"default"} to="/signup">
                <Button className="font-medium">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


