import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Przykładowa logika uwierzytelniania
    // Sprawdzanie poprawności danych logowania, wywołanie żądania itp.
    // Jeśli uwierzytelnienie powiedzie się, ustaw użytkownika w stanie
    setUser(userData);
  };

  const logout = () => {
    // Logika wylogowania
    // Czyszczenie stanu, usuwanie tokenu itp.
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
