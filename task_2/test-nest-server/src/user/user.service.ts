import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from 'src/dto/create-user.dto';
import { User } from './user.model';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userDB: typeof User) {}

  async createUser(dto: UserCreateDto) {
    const user = await this.userDB.create(dto);
    return user;
  }

  async getUsersByParams(query) {
    const clause = {};
    if (query.fullNameSearch) clause['fullName'] = query.fullNameSearch;
    if (query.type) clause['type'] = query.type;
    if (query.minAge) clause['age'] = { [Op.gte]: [query.minAge] };
    if (query.maxAge) clause['age'] = { [Op.lte]: [query.maxAge] };
    const users = await this.userDB.findAll({
      where: clause,
      limit: query.limit || 10,
    });

    return users;
  }
}
