import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
   //destroy cookie

    res.setHeader("Set-Cookie",cookie.serialize("token",'',{
        httpOnly:true,
        secure:process.env.NODE_ENV !=="development",
        expires:new Date(0),
        sameSite:"strict",
        path:"/"
    }))

    res.json({message:"user successfully logged out"})
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} isn't allowed` });
  }
};
