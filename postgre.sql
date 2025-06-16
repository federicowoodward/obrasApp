# Generar SQL completo con timestamps automáticos y triggers para todas las tablas indicadas.
tables = [
    "architect", "worker", "work", "work_worker", "deposit",
    "element", "material", "work_element", "work_material",
    "note", "missing"
]

sql_parts = []

# Función para timestamps automáticos
sql_parts.append("""
-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';
""")

# Tabla architect
sql_parts.append("""
CREATE TABLE architect (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    payment_level INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_architect_updated_at
BEFORE UPDATE ON architect
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
""")

# Tabla worker
sql_parts.append("""
CREATE TABLE worker (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    architect_id INTEGER REFERENCES architect(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_worker_updated_at
BEFORE UPDATE ON worker
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
""")

# Tabla work
sql_parts.append("""
CREATE TABLE work (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    architect_id INTEGER REFERENCES architect(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_work_updated_at
BEFORE UPDATE ON work
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
""")

# Tabla work_worker
sql_parts.append("""
CREATE TABLE work_worker (
    work_id INTEGER REFERENCES work(id) ON DELETE CASCADE,
    worker_id INTEGER REFERENCES worker(id) ON DELETE CASCADE,
    PRIMARY KEY (work_id, worker_id)
);
""")

# Tabla deposit
sql_parts.append("""
CREATE TABLE deposit (
    id SERIAL PRIMARY KEY,
    architect_id INTEGER UNIQUE REFERENCES architect(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_deposit_updated_at
BEFORE UPDATE ON deposit
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
""")

# Tabla element
sql_parts.append("""
CREATE TABLE element (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT,
    buy_date DATE,
    photo BYTEA,
    type TEXT CHECK (type IN ('tool', 'security_element')),
    deposit_id INTEGER REFERENCES deposit(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_element_updated_at
BEFORE UPDATE ON element
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
""")

# Tabla material
sql_parts.append("""
CREATE TABLE material (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    provider TEXT,
    buy_date DATE,
    deposit_id INTEGER REFERENCES deposit(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_material_updated_at
BEFORE UPDATE ON material
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
""")

# Tabla work_element
sql_parts.append("""
CREATE TABLE work_element (
    work_id INTEGER REFERENCES work(id) ON DELETE CASCADE,
    element_id INTEGER REFERENCES element(id) ON DELETE CASCADE,
    PRIMARY KEY (work_id, element_id)
);
""")

# Tabla work_material
sql_parts.append("""
CREATE TABLE work_material (
    work_id INTEGER REFERENCES work(id) ON DELETE CASCADE,
    material_id INTEGER REFERENCES material(id) ON DELETE CASCADE,
    PRIMARY KEY (work_id, material_id)
);
""")

# Tabla note
sql_parts.append("""
CREATE TABLE note (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    type TEXT CHECK (type IN ('worker', 'element', 'material')),
    architect_id INTEGER REFERENCES architect(id) ON DELETE CASCADE,
    worker_id INTEGER REFERENCES worker(id),
    element_id INTEGER REFERENCES element(id),
    material_id INTEGER REFERENCES material(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (
        (type = 'worker' AND worker_id IS NOT NULL AND element_id IS NULL AND material_id IS NULL) OR
        (type = 'element' AND element_id IS NOT NULL AND worker_id IS NULL AND material_id IS NULL) OR
        (type = 'material' AND material_id IS NOT NULL AND worker_id IS NULL AND element_id IS NULL)
    )
);
CREATE TRIGGER update_note_updated_at
BEFORE UPDATE ON note
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
""")

# Tabla missing
sql_parts.append("""
CREATE TABLE missing (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    architect_id INTEGER REFERENCES architect(id) ON DELETE CASCADE,
    work_id INTEGER REFERENCES work(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_missing_updated_at
BEFORE UPDATE ON missing
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
""")

full_sql = "\n".join(sql_parts)
full_sql[:1500]  # Show a preview
