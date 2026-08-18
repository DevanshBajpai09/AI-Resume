import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import User from "../models/UserModel.js";


// ==========================================
// GOOGLE
// ==========================================

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/users/google/callback`,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error("Google account does not have an email address")
          );
        }

        const normalizedEmail = email.toLowerCase();

        // 1. Check if this Google account already exists
        let user = await User.findOne({
          googleId: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        // 2. Check if email already exists
        user = await User.findOne({
          email: normalizedEmail,
        });

        if (user) {
          // LINK GOOGLE TO EXISTING ACCOUNT
          user.googleId = profile.id;
          user.isVerified = true;

          await user.save();

          return done(null, user);
        }

        // 3. Create new user
        user = await User.create({
          name: profile.displayName || "Google User",
          email: normalizedEmail,
          googleId: profile.id,
          isVerified: true,
        });

        return done(null, user);

      } catch (error) {
        return done(error);
      }
    }
  )
);


// ==========================================
// GITHUB
// ==========================================

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/users/github/callback`,
      scope: ["user:email"],
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = profile.emails?.find(
          (email) => email.primary && email.verified
        )?.value;

        // fallback
        if (!email) {
          email = profile.emails?.[0]?.value;
        }

        if (!email) {
          return done(
            new Error(
              "Unable to get email from GitHub. Please make your email available."
            )
          );
        }

        const normalizedEmail = email.toLowerCase();

        // 1. Existing GitHub account
        let user = await User.findOne({
          githubId: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        // 2. Existing account with same email
        user = await User.findOne({
          email: normalizedEmail,
        });

        if (user) {
          // LINK GITHUB TO EXISTING ACCOUNT
          user.githubId = profile.id;
          user.isVerified = true;

          await user.save();

          return done(null, user);
        }

        // 3. Create new account
        user = await User.create({
          name: profile.displayName || profile.username || "GitHub User",
          email: normalizedEmail,
          githubId: profile.id,
          isVerified: true,
        });

        return done(null, user);

      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;