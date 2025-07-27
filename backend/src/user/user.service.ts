import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async create(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ email, password: hashed });
    return this.userRepo.save(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
    async findOne(id: number) {
        return this.userRepo.findOne({ where: { id } });
    }

    async findAll() {
        return this.userRepo.find();
    }

    async activateUser(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (user) {
            user.deactivated = false;
            return this.userRepo.save(user);
        }
        return null;
    }

    async deactivateUser(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (user) {
            user.deactivated = true;
            return this.userRepo.save(user);
        }
        return null;
    }
}