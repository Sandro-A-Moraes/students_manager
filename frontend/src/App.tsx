import React from 'react';
import { useStudents } from './hooks/useStudents';
import { StudentForm } from './components/StudentForm';
import { StudentList } from './components/StudentList';
import { StudentSearch } from './components/StudentSearch';
import type { CreateStudentRequest } from './types/student';

const App = () => {
  const { students, loading, error, createStudent, searchStudent, fetchStudents } = useStudents();



  const handleCreateStudent = async (studentData: CreateStudentRequest) => {
    try {
      await createStudent(studentData);
    } catch (err) {
      console.error('Erro ao criar estudante:', err);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Sistema de Gerenciamento de Estudantes</h1>
        <p>By Sandro Moraes</p>
        <p>Cadastre, busque e visualize estudantes</p>

      </header>

      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffe6e6', 
          padding: '1rem', 
          borderRadius: '4px', 
          marginBottom: '1rem' 
        }}>
          {error}
          <button 
            onClick={fetchStudents}
            style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem' }}
          >
            Tentar novamente
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <StudentForm onSubmit={handleCreateStudent} loading={loading} />
          <StudentSearch onSearch={searchStudent} loading={loading} />
        </div>
        
        <div>
          <StudentList students={students} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default App;