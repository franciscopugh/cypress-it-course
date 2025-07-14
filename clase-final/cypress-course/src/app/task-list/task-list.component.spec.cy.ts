import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';

const mockService = {
  getTasks: () => Promise.resolve({ data: [] }),
  addTask: () => Promise.resolve(),
  updateTask: () => Promise.resolve(),
  deleteTask: () => Promise.resolve()
};

describe('TaskListComponent', () => {
  it('should render', () => {
    cy.mount(TaskListComponent, {
      providers: [{ provide: TaskService, useValue: mockService }],
    });
    cy.contains('Mis Tareas');
  });
});
