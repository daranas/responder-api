import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(createProjectDto: CreateProjectDto) {
    try {
      const projects = await this.knex.table('projects').insert({
        name: createProjectDto.name,
      });

      return { projects };
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
