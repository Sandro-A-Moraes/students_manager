import React, { useState } from 'react';
import type { CreateStudentRequest } from '../types/student';

interface StudentFormProps {
  onSubmit: (student: CreateStudentRequest) => Promise<void>;
  loading: boolean;
}

export const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<CreateStudentRequest>({
    nome: '',
    idade: 0,
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || formData.idade <= 0) return;
    
    const studentData = {
      ...formData,
      email: formData.email || undefined,
    };
    
    await onSubmit(studentData);
    setFormData({ nome: '', idade: 0, email: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Cadastrar Novo Estudante</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Nome:</label>
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Idade:</label>
        <input
          type="number"
          value={formData.idade || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, idade: parseInt(e.target.value) || 0 }))}
          required
          min="1"
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Email (opcional):</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading || !formData.nome || formData.idade <= 0}
        style={{ 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
};