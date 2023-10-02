import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const createTable = async (db) => {
  const query = `CREATE TABLE IF NOT EXISTS employees (
    id data_type PRIMARY KEY,
    email data_type TEXT NOT NULL,
    firstName data_type TEXT NOT NULL,
    lastName data_type TEXT NOT NULL,
    salaryEUR INTEGER,
    localCurrency TEXT NOT NULL,
    startDate TEXT NOT NULL,
    isActive INTEGER
  )`;
  return db.run(query);
};

let _db;
const getConnection = async () => {
  if (!_db) {
    _db = await open({ filename: 'data.sqlite3', driver: sqlite3.Database });
    await createTable(_db);
  }
  return _db;
};

const closeConnection = async () => {
  if (_db) {
    await _db.close();
    _db = undefined;
  }
};

export const getAllEmployees = async () => {
  const db = await getConnection();
  const rows = await db.all('SELECT * FROM employees');
  const employees = rows.map((r) => {
    r.isActive = Boolean(r.isActive);
    return r;
  });
  await closeConnection();
  return employees;
};

export const insertEmployee = async (employee) => {
  const insertQuery = `INSERT INTO employees (
  id,
  email,
  firstName,
  lastName,
  salaryEUR,
  localCurrency,
  startDate,
  isActive
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?
  )`;
  const values = [
    employee.id,
    employee.email,
    employee.firstName,
    employee.lastName,
    employee.salaryEUR,
    employee.localCurrency,
    String(employee.startDate),
    Number(employee.isActive),
  ];
  const db = await getConnection();
  await db.run(insertQuery, values);
  await closeConnection();
};
