import User from "@/models/UserModel";
import db from "@/utils/db";
import morgan from "morgan";
import { createRouter } from "next-connect";
import crypto from "crypto";

const router = createRouter();
router.use(morgan("dev"));

router.patch(async (req, res) => {
  try {
    await db.connectDb();
    const { password, confirmPassword } = req?.body || {};
    if (!password) {
      return res.status(400).json({
        status: "failed",
        message: "Please enter Password.",
      });
    }

    if (!confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Please enter Confirm Password.",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.query.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "Token is invalid or has expired!.",
      });
    }

    user.password = password;
    user.confirmPassword = confirmPassword;
    user.passwordResetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).json({
      status: "success",
      email: user.email,
      message: "Password has been reset.",
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
    console.log(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
