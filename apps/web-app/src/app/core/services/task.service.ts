import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Domain } from '@product-domain/task';
import { envConfig } from '../../../config';

type Task = Domain.Task;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private uri = `${envConfig.SERVER_URL}/tasks`;

  constructor(private readonly httpService: HttpClient) {}

  getAllTask() {
    return this.httpService.get<{ tasks: Task[] }>(
      this.uri + '?sort=createdAt:desc'
    );
  }

  createTask(task: Domain.TaskCreateInput) {
    return this.httpService.post<{ task: Task }>(this.uri, task);
  }

  updateTask(id: string, partial: Domain.TaskUpdateInput) {
    return this.httpService.patch<{ success: boolean }>(
      `${this.uri}/${id}`,
      partial
    );
  }

  deleteTask(id: string) {
    return this.httpService.delete<{ success: boolean }>(`${this.uri}/${id}`);
  }
}
