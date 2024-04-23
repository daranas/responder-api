import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll() {
    const projects = await this.knex.table('projects');
    return projects;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async findProjectName(name?: string) {
    try {
      const projectName = await this.knex
        .table('projects')
        .where('name', name)
        .first();
      return projectName;
    } catch (error) {
      throw error || new InternalServerErrorException();
    }
  }

  async create(createProjectDto: CreateProjectDto) {
    try {
      const findName = await this.findProjectName(createProjectDto.name);
      if (findName) {
        throw new BadRequestException('Project name is already exist');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const projects = await this.knex.table('projects').insert({
        name: createProjectDto.name,
      });

      return {
        status: 200,
        message: 'Project is successfully created',
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const projects = await this.knex
        .table('projects')
        .where('id', id)
        .update({
          name: updateProjectDto.name,
        });

      return { projects };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
