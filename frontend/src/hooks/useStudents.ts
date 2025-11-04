import { useState, useEffect } from 'react';
import type { Student, CreateStudentRequest } from '../types/student';
import { studentService } from '../services/studentService';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async (student: CreateStudentRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newStudent = await studentService.createStudent(student);
      setStudents(prev => [...prev, newStudent]);
      return newStudent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar estudante');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchStudent = async (query: string, type: 'id' | 'matricula') => {
    setLoading(true);
    setError(null);
    try {
      const student = type === 'id' 
        ? await studentService.getStudentById(query)
        : await studentService.getStudentByMatricula(query);
      return student;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Estudante não encontrado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    error,
    fetchStudents,
    createStudent,
    searchStudent,
  };
};