import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export class UserService {


    // Create  A User
    public addUser(user: IUser): Promise<IUser>{
        const newUser = new User(user);
        return newUser.save();
    }

    // Get User By Id
    public async findUserById(id: string): Promise<IUser> {
        const user = await User.findById(id).exec();
        if (!user) {
            throw new Error(`User with id: '${id}' not found`);
        }

        return user;
    }

    // Get User By Email
    public async findUserByEmail(email: string): Promise<IUser> {
        const user = await User.findOne({ email }).exec();

        if (!user) {
            throw new Error(`User with Email: '${email}' not found`);
        }

        return user;
    }

    
}