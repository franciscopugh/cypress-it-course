import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from './environments/environment';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private supabase: SupabaseClient;

  constructor() {
    // Se crea el cliente con los datos del environment
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Obtener tareas
  async getTasks() {
    return await this.supabase.from('tasks').select('*').order('id', { ascending: true });
  }

  // Agregar nueva tarea
  async addTask(title: string) {
    return await this.supabase.from('tasks').insert([{ title, completed: false }]);
  }

  // Actualizar tarea
  async updateTask(task: Task) {
    return await this.supabase.from('tasks').update(task).eq('id', task.id);
  }

  // Eliminar tarea
  async deleteTask(id: string) {
    return await this.supabase.from('tasks').delete().eq('id', id);
  }
}