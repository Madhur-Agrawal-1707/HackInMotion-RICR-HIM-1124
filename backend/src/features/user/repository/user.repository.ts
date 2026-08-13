import mongoose from 'mongoose';
import { UserModel, IUser } from '../model/user.model';

export class UserRepository {
  async create(data: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(data);
    return user.save();
  }

  async findByEmail(email: string, selectPassword = false): Promise<IUser | null> {
    const query = UserModel.findOne({ email });
    if (selectPassword) {
      query.select('+password');
    }
    return query.exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).exec();
  }

  async updateById(id: string, updateData: mongoose.UpdateQuery<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteById(id: string): Promise<IUser | null> {
    return UserModel.findByIdAndDelete(id).exec();
  }

  async findOne(filter: mongoose.QueryFilter<IUser>): Promise<IUser | null> {
    return UserModel.findOne(filter).exec();
  }
}
