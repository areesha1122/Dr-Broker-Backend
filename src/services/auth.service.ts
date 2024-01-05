// src/services/auth.service.ts

import { Request } from 'express';
import { User, IUser } from '../models'; // Import models from the index file
import { comparePassword, encryptPassword } from '../utils/encryption.utils';
import { createToken, verifyToken } from '../utils/jwt.strategy';
import { sendEmail } from './mail.service';
import {
  getFacebookProfileData,
  getGoogleProfileData,
} from '../utils/socialAuth';

/**
 * Create a new user based on the data provided in the request body.
 * @param req The Express request object containing user data.
 * @returns A promise that resolves to the created user.
 */
async function createUser(req: Request): Promise<IUser | null> {
  try {
    const {
      firstName,
      email,
      password,
      role,
      lastName,
      number,
      state,
      business,
    } = req.body;
    const users = await User.findOne({ firstName: firstName, email: email });
    if (users) {
      return null;
    }
    const userToken = await createToken({
      firstName: firstName,
      email: email,
    });
    const newUser: IUser = new User({
      firstName,
      lastName,
      number: number,
      state: state,
      business: business || '',
      email,
      password: await encryptPassword(password),
      token: userToken,
      role: role,
    });
    const savedUser = await newUser.save();
    sendEmail({
      to: email,
      subject: 'User Email Verification',
      templateName: 'userVerify', // Name of the EJS template file without the ".ejs" extension
      templateData: {
        token: userToken,
      },
    });
    savedUser.password = '';
    return savedUser;
  } catch (error) {
    throw error;
  }
}
async function loginUser(req: Request): Promise<any | null> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, isVerify: true, authType: null });
    if (user && (await comparePassword(password, user.password))) {
      return createToken({
        userId: user.uuid,
        firstName: user.firstName,
        email: user.email,
      });
    }
    return null;
  } catch (error) {
    throw error;
  }
}
async function forgetPassword(req: Request): Promise<any | null> {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const userToken = await createToken({
        userId: user.uuid,
        firstName: user.firstName,
        email: user.email,
      });
      await User.findOneAndUpdate({ email: user.email }, { token: userToken });
      sendEmail({
        to: email,
        subject: 'ForgetPassword',
        templateName: 'forgetPassword', // Name of the EJS template file without the ".ejs" extension
        templateData: {
          token: userToken,
        },
      });
      return 'Email send';
    }
    return null;
  } catch (error) {
    throw error;
  }
}
async function resetPassword(req: Request): Promise<any | null> {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token });
    if (!user) {
      return null;
    }
    const verify = await verifyToken(user.token);
    if (!verify) {
      return null;
    }
    await User.findOneAndUpdate(
      { token: token },
      {
        password: await encryptPassword(password),
        updatedAt: Date.now(),
        token: '',
      }
    );
    return user;
  } catch (error) {
    throw error;
  }
}
async function verifyUser(req: Request): Promise<any | null> {
  try {
    const { token } = req.params;
    const user = await User.findOne({ token });
    if (!user) {
      return null;
    }
    const verify = await verifyToken(user.token);
    if (!verify) {
      return null;
    }
    await User.findOneAndUpdate(
      { token: token },
      { isVerify: true, updatedAt: Date.now(), token: '' }
    ).select('-password');
    return user;
  } catch (error) {
    throw error;
  }
}
async function userPasswordChanged(req: Request): Promise<IUser | null> {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.params;
    const userFind = await User.findOne({ uuid: userId });
    if (!userFind) return null;
    const passwordMatch = await comparePassword(oldPassword, userFind.password);
    if (!passwordMatch) return null;
    const user = await User.findOneAndUpdate(
      { uuid: userId },
      { password: await encryptPassword(newPassword), updatedAt: Date.now() },
      { new: true }
    ).select(['-password', '-_id', '-token']);
    return user;
  } catch (error) {
    throw error;
  }
}

async function googleAuth(req: Request): Promise<any> {
  try {
    const { token } = req.params;
    const { authType, email, role } = req.body;

    const userData = await getGoogleProfileData(token);

    if (!userData || userData.email !== email) {
      return null;
    }

    let userToken;

    const userFind = await User.findOne({ email: userData.email });

    if (userFind) {
      userToken = await createToken({
        userId: userFind.uuid,
        firstName: userFind.firstName,
        email: userFind.email,
      });
    } else {
      const newUser = new User({
        firstName: userData.name,
        email: userData.email,
        authType: authType,
        isVerify: true,
        role: role,
        password: ' ',
      });

      const savedUser = await newUser.save();

      if (savedUser) {
        userToken = await createToken({
          userId: savedUser.uuid,
          firstName: savedUser.firstName,
          email: savedUser.email,
        });
      }
    }

    return userToken || null;
  } catch (error) {
    throw error;
  }
}
async function facebookAuth(req: Request): Promise<any> {
  try {
    const { authType, email, role } = req.body;
    const { token } = req.params;
    const userData = await getFacebookProfileData(token);
    if (!userData || userData.email !== email) {
      return null;
    }
    let userToken;
    const userFind = await User.findOne({ email: userData.email });
    if (userFind) {
      userToken = await createToken({
        userId: userFind.uuid,
        firstName: userFind.firstName,
        email: userFind.email,
      });
    } else {
      const newUser = new User({
        firstName: userData.firstName,
        email: userData.email,
        authType: authType,
        isVerify: true,
        role: role,
        password: ' ',
      });
      const savedUser = await newUser.save();
      if (savedUser) {
        userToken = await createToken({
          userId: savedUser.uuid,
          firstName: savedUser.firstName,
          email: savedUser.email,
        });
      }
    }
    return userToken || null;
  } catch (error) {
    throw error;
  }
}
export default {
  createUser,
  loginUser,
  forgetPassword,
  resetPassword,
  verifyUser,
  userPasswordChanged,
  googleAuth,
  facebookAuth,
};
