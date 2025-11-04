import React from 'react';
import type { Student } from '../types/student';

interface StudentListProps {
  students: Student[];
  loading: boolean;
}

export const StudentList: React.FC<StudentListProps> = ({ students, loading }) => {
  if (loading) {
    return <div>Carregando estudantes...</div>;
  }

  if (students.length === 0) {
    return <div>Nenhum estudante encontrado.</div>;
  }

  return (
    <div>
      <h3>Lista de Estudantes ({students.length})</h3>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {students.map((student) => (
          <div 
            key={student.id} 
            style={{ 
              padding: '1rem', 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{student.nome}</div>
            <div>Matrícula: {student.matricula}</div>
            <div>Idade: {student.idade} anos</div>
            {student.email && <div>Email: {student.email}</div>}
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              ID: {student.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};