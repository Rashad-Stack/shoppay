import User from "@/models/UserModel";
import db from "@/utils/db";
import { sendEmail } from "@/utils/emailSender";
import { validateEmail } from "@/utils/validation";
import morgan from "morgan";
import { createRouter } from "next-connect";

const router = createRouter();
router.use(morgan("dev"));

router.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req?.body || {};
    if (!email) {
      return res.status(400).json({
        status: "failed",
        message: "Please enter email.",
      });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid email.",
      });
    }

    // If user is not exist with the same email then send error message.
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "No user found with this email.",
      });
    }

    const token = await user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const domain = `${req.headers["x-forwarded-proto"]}://${req.headers.host}`;
    const activationUrl = `${domain}/auth/reset/${token}`;

    sendEmail({
      name: user.name,
      to: email,
      url: activationUrl,
      domain,
      subject: "Password Reset Request for Your Account",
    });

    res.status(200).json({
      status: "success",
      message: "Password reset token send to your email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(401).json({
      status: "failed",
      message: error.message,
    });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
