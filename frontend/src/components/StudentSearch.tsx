import React, { useState } from 'react';
import type { Student } from '../types/student';

interface StudentSearchProps {
  onSearch: (query: string, type: 'id' | 'matricula') => Promise<Student>;
  loading: boolean;
}

export const StudentSearch: React.FC<StudentSearchProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'id' | 'matricula'>('matricula');
  const [result, setResult] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setError(null);
    setResult(null);

    try {
      const student = await onSearch(query.trim(), searchType);
      setResult(student);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na busca');
    }
  };

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Buscar Estudante</h3>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'end', marginBottom: '1rem' }}>
        <div>
          <label>Buscar por:</label>
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value as 'id' | 'matricula')}
            style={{ padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="matricula">Matrícula</option>
            <option value="id">ID</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label>{searchType === 'matricula' ? 'Matrícula:' : 'ID:'}</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchType === 'matricula' ? 'Digite a matrícula' : 'Digite o ID'}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || !query.trim()}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ 
          padding: '1rem', 
          border: '1px solid #28a745', 
          borderRadius: '8px',
          backgroundColor: '#f8fff9'
        }}>
          <h4>Estudante Encontrado:</h4>
          <div><strong>Nome:</strong> {result.nome}</div>
          <div><strong>Matrícula:</strong> {result.matricula}</div>
          <div><strong>Idade:</strong> {result.idade} anos</div>
          {result.email && <div><strong>Email:</strong> {result.email}</div>}
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
            <strong>ID:</strong> {result.id}
          </div>
        </div>
      )}
    </div>
  );
};