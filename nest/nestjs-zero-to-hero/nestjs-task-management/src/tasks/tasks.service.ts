import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import * as uuid from "uuid/v1"
import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto"
import { TaskRepository } from "./task.repository"
import { InjectRepository } from "@nestjs/typeorm"
import { Task } from "./task.entity"
import { TaskStatus } from "./task-status-enum"

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}

	async getTasks(filterDto: GetTasksFilterDto) {
		return await this.taskRepository.getTasks(filterDto)
	}

	async getTaskById(id: number): Promise<Task> {
		const found = await this.taskRepository.findOne(id)
		if (!found) throw new NotFoundException(`Task with ID "${id}" not found.`)
		return found
	}

	async createTask(creteTaskDto: CreateTaskDto): Promise<Task> {
		return this.taskRepository.createTask(creteTaskDto)
	}

	async deleteTask(id: number): Promise<void> {
		const result = await this.taskRepository.delete(id)
		if (result.affected === 0) throw new NotFoundException(`Task ID ${id} not found.`)
	}

	async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
		const task = await this.getTaskById(id)
		task.status = status
		await task.save()
		return task
	}
}
