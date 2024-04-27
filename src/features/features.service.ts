import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll() {
    const features = await this.knex.table('features').orderBy('id', 'desc');
    return features;
  }

  async findFeatureName(name?: string) {
    try {
      const featureName = await this.knex
        .table('features')
        .where('name', name)
        .first();
      return featureName;
    } catch (error) {
      throw error || new InternalServerErrorException();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} feature`;
  }

  async create(createFeatureDto: CreateFeatureDto) {
    try {
      const findName = await this.findFeatureName(CreateFeatureDto.name);
      if (findName) {
        throw new BadRequestException('Project name is already exist');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const features = await this.knex.table('features').insert({
        name: createFeatureDto.name,
      });

      return {
        status: 200,
        message: 'Project is successfully created',
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto) {
    try {
      const features = await this.knex
        .table('features')
        .where('id', id)
        .update({
          name: updateFeatureDto.name,
        });

      return { features };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} feature`;
  }
}
