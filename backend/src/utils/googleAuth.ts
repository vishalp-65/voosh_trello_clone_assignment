import axios from "axios";
import User from "../models/userModel";
import generateToken from "./generateToken";

interface GoogleTokenResult {
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
}

export const verifyGoogleAuthToken = async (token: string) => {
    try {
        const googleOauthURL = new URL(
            "https://oauth2.googleapis.com/tokeninfo"
        );
        googleOauthURL.searchParams.set("id_token", token);

        const { data } = await axios.get<GoogleTokenResult>(
            googleOauthURL.toString(),
            {
                responseType: "json",
            }
        );

        let user: any = await User.findOne({ email: data.email });

        if (!user) {
            user = new User({
                email: data.email,
                name: `${data.given_name} ${data.family_name}`,
                profileImageURL: data.picture,
                password: `${data.given_name}${data.family_name}`, // Random password here
            });

            await user.save();
        } else {
            console.log("User found:", user);
        }

        const newtoken = generateToken(user._id);

        return { user, token: newtoken };
    } catch (error) {
        console.error("Error during Google authentication:", error);
        throw new Error("Failed to verify Google token");
    }
};
