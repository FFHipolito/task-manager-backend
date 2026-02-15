import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Priority, Status } from '@prisma/client';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    try {
      this.logger.log(`Buscando todas as tarefas do usuário: ${userId}`);
      
      const tasks = await this.prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      this.logger.log(`Encontradas ${tasks.length} tarefas`);
      return tasks;
    } catch (error) {
      this.logger.error('Erro ao buscar tarefas:', error);
      throw new BadRequestException('Erro ao buscar tarefas');
    }
  }

  async findOne(id: string, userId: string) {
    try {
      this.logger.log(`Buscando tarefa: ${id} para usuário: ${userId}`);

      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException('Tarefa não encontrada');
      }

      if (task.userId !== userId) {
        throw new NotFoundException('Tarefa não encontrada');
      }

      return task;
    } catch (error) {
      this.logger.error(`Erro ao buscar tarefa ${id}:`, error);
      throw error;
    }
  }

  async create(userId: string, createTaskDto: CreateTaskDto) {
    this.logger.log(`=== CRIANDO NOVA TAREFA ===`);
    this.logger.log(`Usuário: ${userId}`);
    this.logger.log('Dados recebidos:', createTaskDto);

    try {
      if (!createTaskDto.title || createTaskDto.title.trim() === '') {
        throw new BadRequestException('O título da tarefa é obrigatório');
      }

      let status: Status;
      switch (createTaskDto.status) {
        case Status.PENDING:
          status = Status.PENDING;
          break;
        case Status.IN_PROGRESS:
          status = Status.IN_PROGRESS;
          break;
        case Status.COMPLETED:
          status = Status.COMPLETED;
          break;
        case Status.ARCHIVED:
          status = Status.ARCHIVED;
          break;
        default:
          status = Status.PENDING;
      }

      let priority: Priority;
      switch (createTaskDto.priority) {
        case Priority.LOW:
          priority = Priority.LOW;
          break;
        case Priority.MEDIUM:
          priority = Priority.MEDIUM;
          break;
        case Priority.HIGH:
          priority = Priority.HIGH;
          break;
        case Priority.URGENT:
          priority = Priority.URGENT;
          break;
        default:
          priority = Priority.MEDIUM;
      }

      const taskData = {
        title: createTaskDto.title.trim(),
        description: createTaskDto.description || null,
        status: status,
        priority: priority,
        dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
        userId: userId,
      };

      this.logger.log('Dados processados para o Prisma:', {
        ...taskData,
        dueDate: taskData.dueDate?.toISOString() || null,
      });

      const task = await this.prisma.task.create({
        data: taskData,
      });

      this.logger.log(`✅ Tarefa criada com sucesso! ID: ${task.id}`);
      this.logger.log('====================================');

      return task;
      
    } catch (error) {
      const err = error as any;
      this.logger.error('❌ Erro ao criar tarefa:', {
        message: err.message,
        code: err.code,
        meta: err.meta,
        stack: err.stack,
      });

      if (err.code === 'P2002') {
        throw new BadRequestException('Já existe uma tarefa com esses dados');
      }
      if (err.code === 'P2003') {
        throw new BadRequestException('Usuário não encontrado');
      }
      if (err.code === 'P2012') {
        throw new BadRequestException('Campo obrigatório não fornecido');
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      if (err.message?.includes('dueDate') && err.message?.includes('invalid')) {
        throw new BadRequestException('Data de vencimento inválida');
      }

      throw new BadRequestException('Erro ao criar tarefa: ' + err.message);
    }
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    this.logger.log(`=== ATUALIZANDO TAREFA ===`);
    this.logger.log(`ID: ${id}, Usuário: ${userId}`);
    this.logger.log('Dados para atualização:', updateTaskDto);

    try {
      await this.findOne(id, userId);

      const updateData: any = {};

      if (updateTaskDto.title !== undefined) {
        updateData.title = updateTaskDto.title.trim();
      }

      if (updateTaskDto.description !== undefined) {
        updateData.description = updateTaskDto.description || null;
      }

      if (updateTaskDto.status !== undefined) {
        updateData.status = updateTaskDto.status;
      }

      if (updateTaskDto.priority !== undefined) {
        updateData.priority = updateTaskDto.priority;
      }

      if (updateTaskDto.dueDate !== undefined) {
        updateData.dueDate = updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : null;
      }

      this.logger.log('Dados processados para atualização:', updateData);

      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: updateData,
      });

      this.logger.log(`✅ Tarefa ${id} atualizada com sucesso!`);
      this.logger.log('====================================');

      return updatedTask;
    } catch (error) {
      this.logger.error(`❌ Erro ao atualizar tarefa ${id}:`, error);
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    this.logger.log(`=== REMOVENDO TAREFA ===`);
    this.logger.log(`ID: ${id}, Usuário: ${userId}`);

    try {
      await this.findOne(id, userId);

      const deletedTask = await this.prisma.task.delete({
        where: { id },
      });

      this.logger.log(`✅ Tarefa ${id} removida com sucesso!`);
      this.logger.log('====================================');

      return deletedTask;
    } catch (error) {
      this.logger.error(`❌ Erro ao remover tarefa ${id}:`, error);
      throw error;
    }
  }
}