import { UserRepository } from '../repository/user.repository';
import { NotFoundError, ValidationError } from '../../../utils/errors';
import { UpdateProfileDto } from '../validation/user.validation';
import cloudinary from '../../../config/cloudinary.config';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async updateProfile(userId: string, data: UpdateProfileDto) {
    const user = await this.userRepository.updateById(userId, data);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async uploadAvatar(userId: string, fileBuffer: Buffer) {
    if (!cloudinary) {
      throw new Error('Cloudinary is not configured');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'avatars' },
        async (error, result) => {
          if (error) return reject(new ValidationError('Image upload failed'));
          if (result) {
            const user = await this.userRepository.updateById(userId, { avatar: result.secure_url });
            resolve(user);
          }
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  async deleteAccount(userId: string) {
    const user = await this.userRepository.deleteById(userId);
    if (!user) throw new NotFoundError('User not found');
    return true;
  }
}
