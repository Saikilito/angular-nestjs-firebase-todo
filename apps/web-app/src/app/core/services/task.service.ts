import { Injectable } from '@angular/core';

import { Domain } from '@product-domain/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {
    console.info('::: Init Task Service :::');
  }

  async getAllTask(): Promise<Domain.Task[]> {
    return [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description task 1',
        checked: true,
        createdAt: new Date(),
        deletedAt: null,
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description task 2',
        checked: false,
        createdAt: new Date(),
        deletedAt: null,
      },
      {
        id: '3',
        title: 'Task 3',
        description: 'Description task 3',
        checked: false,
        createdAt: new Date(),
        deletedAt: null,
      },
    ];
  }
}
