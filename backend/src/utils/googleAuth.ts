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
    const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
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
            password: "", // Set an empty password or generate a random one
        });

        await user.save();
    }

    return generateToken(user._id);
};
