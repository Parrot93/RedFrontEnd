import React, { useState } from 'react';

function EditableTable() {
  const [formData, setFormData] = useState({ nome: '', email: '' });
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // null = modalità aggiunta, altrimenti è l'indice da modificare

  // Gestisce cambi nei campi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Aggiunge o aggiorna una riga
  const handleConfirm = () => {
    if (formData.nome.trim() && formData.email.trim()) {
      if (editIndex !== null) {
        // modalità modifica
        const updatedRows = [...rows];
        updatedRows[editIndex] = formData;
        setRows(updatedRows);
        setEditIndex(null);
      } else {
        // modalità aggiunta
        setRows((prev) => [...prev, formData]);
      }
      setFormData({ nome: '', email: '' }); // resetta form
    }
  };

  // Rimuove una riga
  const handleRemove = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // Modifica una riga (riempie il form)
  const handleEdit = (index) => {
    setFormData(rows[index]);
    setEditIndex(index);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{editIndex !== null ? 'Modifica Dati' : 'Inserisci Dati'}</h2>

      {/* Form */}
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <button onClick={handleConfirm}>
        {editIndex !== null ? 'Aggiorna' : 'Conferma'}
      </button>

      {/* Tabella */}
      <h3>Lista Inserimenti</h3>
      {rows.length === 0 ? (
        <p>Nessun dato inserito.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ marginTop: '10px' }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td>{row.nome}</td>
                <td>{row.email}</td>
                <td>
                  <button onClick={() => handleEdit(idx)}>Modifica</button>{' '}
                  <button onClick={() => handleRemove(idx)}>Rimuovi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EditableTable;
