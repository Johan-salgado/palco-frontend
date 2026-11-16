CREATE TABLE IF NOT EXISTS pais (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS departamento (
    id SERIAL PRIMARY KEY,
    id_pais INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,

    CONSTRAINT uq_departamento_nombre UNIQUE (id_pais, nombre),
    CONSTRAINT fk_departamento_pais FOREIGN KEY (id_pais) REFERENCES pais(id)
);

CREATE TABLE IF NOT EXISTS ciudad (
    id SERIAL PRIMARY KEY,
    id_departamento INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,

    CONSTRAINT uq_ciudad_nombre UNIQUE (id_departamento, nombre),
    CONSTRAINT fk_ciudad_departamento FOREIGN KEY (id_departamento) REFERENCES departamento(id)
);

CREATE TABLE IF NOT EXISTS persona (
    identificacion VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    clave VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    id_ciudad INTEGER NOT NULL,
    rol VARCHAR(20) NOT NULL,

    CONSTRAINT chk_rol_persona CHECK (rol IN ('cliente', 'agente', 'administrador')),
    CONSTRAINT fk_persona_ciudad FOREIGN KEY (id_ciudad) REFERENCES ciudad(id)
);

CREATE TABLE IF NOT EXISTS telefono (
    id SERIAL PRIMARY KEY,
    identificacion VARCHAR(20) NOT NULL,
    numero VARCHAR(20) NOT NULL,

    CONSTRAINT fk_telefono_persona FOREIGN KEY (identificacion) REFERENCES persona(identificacion) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cliente (
    identificacion VARCHAR(20) PRIMARY KEY,
    puntos INTEGER DEFAULT 0,
    publicidad BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_cliente_persona FOREIGN KEY (identificacion) REFERENCES persona(identificacion) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS agente (
    identificacion VARCHAR(20) PRIMARY KEY,
    comision INTEGER DEFAULT 0,
    experiencia VARCHAR(200),

    CONSTRAINT fk_agente_persona FOREIGN KEY (identificacion) REFERENCES persona(identificacion) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS administrador (
    identificacion VARCHAR(20) PRIMARY KEY,
    salario INTEGER DEFAULT 0,
    horario VARCHAR(100),

    CONSTRAINT fk_administrador_persona FOREIGN KEY (identificacion) REFERENCES persona(identificacion) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS evento (
    codigo SERIAL PRIMARY KEY,
    id_agente VARCHAR(20) NOT NULL,
    id_ciudad INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    teatro VARCHAR(100) NOT NULL,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    capacidad INTEGER NOT NULL,
    precio INTEGER NOT NULL,
    observaciones TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'Programado',
    causa_cancelacion TEXT,

    CONSTRAINT chk_estado_evento CHECK (estado IN ('Programado', 'En Boletería', 'En Vivo', 'Finalizado', 'Cancelado')),
    CONSTRAINT fk_evento_agente FOREIGN KEY (id_agente) REFERENCES agente(identificacion),
    CONSTRAINT fk_evento_ciudad FOREIGN KEY (id_ciudad) REFERENCES ciudad(id)
);

CREATE TABLE IF NOT EXISTS reserva (
    id SERIAL PRIMARY KEY,
    id_cliente VARCHAR(20) NOT NULL,
    codigo_evento INTEGER NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT (NOW() AT TIME ZONE 'America/Bogota'),
    entradas INTEGER NOT NULL,
    total INTEGER NOT NULL,
    observaciones TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'Reservada',
    causa_cancelacion TEXT,

    CONSTRAINT chk_estado_reserva CHECK (estado IN ('Reservada', 'Confirmada', 'Cancelada')),
    CONSTRAINT fk_reserva_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(identificacion) ON DELETE CASCADE,
    CONSTRAINT fk_reserva_evento FOREIGN KEY (codigo_evento) REFERENCES evento(codigo) ON DELETE CASCADE
);
