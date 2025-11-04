import type { Student, CreateStudentRequest, StudentsResponse } from '../types/student';

const API_BASE_URL = 'http://localhost:8000';

export const studentService = {
  async getAllStudents(): Promise<Student[]> {
    const response = await fetch(`${API_BASE_URL}/students`);
    if (!response.ok) throw new Error('Erro ao buscar estudantes');
    const data: StudentsResponse = await response.json();
    return data.students;
  },

  async getStudentById(id: string): Promise<Student> {
    const response = await fetch(`${API_BASE_URL}/students/${id}`);
    if (!response.ok) throw new Error('Estudante não encontrado');
    return response.json();
  },

  async getStudentByMatricula(matricula: string): Promise<Student> {
    const response = await fetch(`${API_BASE_URL}/students/matricula/${matricula}`);
    if (!response.ok) throw new Error('Estudante não encontrado');
    return response.json();
  },

  async createStudent(student: CreateStudentRequest): Promise<Student> {
    const response = await fetch(`${API_BASE_URL}/students/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error('Erro ao criar estudante');
    return response.json();
  },
};