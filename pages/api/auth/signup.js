import User from "@/models/UserModel";
import db from "@/utils/db";
import { sendEmail } from "@/utils/emailSender";
import { activationToken } from "@/utils/token";
import { validateEmail } from "@/utils/validation";
import { createRouter } from "next-connect";

const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password, confirmPassword } = req?.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Please fill in all fields.",
      });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid email.",
      });
    }

    // If user exist with the same email then send error message.
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "failed",
        message: "This email already exist.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "failed",
        message: "Password must be al least 6 character.",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    // Remove password from output
    newUser.password = undefined;

    const token = activationToken({ id: newUser._id.toString() });
    const domain = `${req.headers["x-forwarded-proto"]}://${req.headers.host}`;
    const activationUrl = `${domain}/activate/${token}`;

    sendEmail({
      name,
      to: email,
      url: activationUrl,
      domain,
      subject: "Verify your email to finish signing up.",
    });

    res.status(200).json({
      status: "success",
      message: "Register success! Please active your email to start.",
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error.message,
    });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
