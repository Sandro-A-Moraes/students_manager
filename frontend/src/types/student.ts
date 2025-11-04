export interface Student {
  id: string;
  matricula: string;
  nome: string;
  idade: number;
  email?: string;
}

export interface CreateStudentRequest {
  nome: string;
  idade: number;
  email?: string;
}

export interface StudentsResponse {
  students: Student[];
}