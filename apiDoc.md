# Obras API – Documentación Técnica

## Índice

* [Authentication (Login)](#authentication-login)
* [Architects (Registration)](#architects-registration)
* [Plan Limits](#plan-limits)
* [Categories](#categories)
* [Constructions (Projects)](#constructions-projects)
* [Construction Workers](#construction-workers)
* [Deposits (Storage Locations)](#deposits-storage-locations)
* [Elements (Inventory Items)](#elements-inventory-items)
* [Element Moves (Transferring Items)](#element-moves-transferring-items)
* [Notes](#notes)
* [Missing Items](#missing-items)
* [Events History (Activity Log)](#events-history-activity-log)

---

## Authentication (Login)

El módulo **Auth** provee un endpoint para iniciar sesión como arquitecto. El cliente debe enviar las credenciales y recibirá un token de autenticación (por ejemplo, JWT) para futuras peticiones. El login soporta autenticación tanto por email como por nombre de usuario (name del arquitecto).

* **POST `/auth/login`** – Autentica un arquitecto. Recibe un JSON con credenciales:

  ```json
  { "emailOrName": "user@example.com", "password": "secret" }
  ```

  Si es exitoso, retorna un token de autenticación (por ejemplo JWT) y posiblemente información del usuario. Ese token debe enviarse en el header `Authorization: Bearer <token>` en los endpoints protegidos.

  *Ejemplo en Angular:*

  ```ts
  interface LoginPayload { emailOrName: string; password: string; }
  this.http.post(`${API_URL}/auth/login`, { emailOrName, password })
    .subscribe(response => {
      // Guardar response.token para futuras requests autenticadas
    });
  ```

**Notas de uso:** Después de loguearte, guardá el token (ej: en `localStorage`) y agregalo en los headers de cada request que requiera autenticación (como crear proyectos, elementos, etc).

---

## Architects (Registration)

El módulo **Architect** permite registrar nuevos arquitectos (alta de usuario).

* **POST `/architect`** – Crea un nuevo arquitecto. Recibe un JSON con los datos:

  ```json
  { "name": "Architect Name", "email": "user@example.com", "password": "secret", "payment_level": 1 }
  ```

  Campos:

  * `name`: nombre del arquitecto (también se usa como username)
  * `email`: email único.
  * `password`: contraseña (la API la guarda hasheada)
  * `payment_level`: *(Opcional)* ID del plan elegido.

  Retorna los datos del arquitecto creado (id, name, email). No retorna el password. Si el email ya existe, devuelve un error de conflicto.

  *Ejemplo en Angular:*

  ```ts
  const newArchitect = { name: 'Alice', email: 'alice@example.com', password: '123456', payment_level: 1 };
  this.http.post(`${API_URL}/architect`, newArchitect)
    .subscribe(response => { /* manejar el registro exitoso */ });
  ```

**Notas de uso:** Después de registrarte, podés loguearte por `/auth/login`. El campo `payment_level` corresponde a un plan (ver **Plan Limits** más abajo). Se puede omitir o completar según los planes disponibles.

---

## Plan Limits

El módulo **PlanLimit** te da información sobre los distintos planes y límites de uso disponibles para los arquitectos. Normalmente, se usa para mostrar opciones de plan en el registro o panel de usuario.

* **GET `/plan-limit`** – Devuelve todos los planes disponibles. Retorna un array de objetos plan (cada uno con `id`, nombre, y otros datos como límites de uso):

  ```json
  [
    { "id": 1, "name": "Free", "maxProjects": 3, ... },
    { "id": 2, "name": "Pro", "maxProjects": 10, ... }
  ]
  ```

  *Ejemplo en Angular:*

  ```ts
  this.http.get<Plan[]>(`${API_URL}/plan-limit`)
    .subscribe(plans => {
      // e.g., plans[0].name === 'Free'
    });
  ```

**Notas de uso:** Usá este endpoint para llenar el combo de planes (por ejemplo, en el registro). El campo `payment_level` de architect corresponde al id de uno de estos planes.

---

## Categories

El módulo **Category** define las categorías de elementos de inventario (ej: materiales o equipos). Normalmente vienen precargadas y no se pueden modificar por la API.

* **GET `/category`** – Lista todas las categorías disponibles. Devuelve un array de objetos Category, ordenado por nombre. Cada categoría tiene un `id` y un `name` (ej: `"Concrete"`, `"Electrical"`).

  *Ejemplo en Angular:*

  ```ts
  this.http.get<Category[]>(`${API_URL}/category`)
    .subscribe(categories => {
      // e.g., categories[0].name
    });
  ```

No hay endpoints para crear/editar categorías por la API. Usá este endpoint para llenar combos o etiquetas de categoría en el front.

---

## Constructions (Projects)

El módulo **Construction** maneja las obras (proyectos) asociadas a cada arquitecto.

Base path: **`/architect/{architectId}/construction`**

* **POST** `/architect/{architectId}/construction` – Crea una nueva obra para el arquitecto indicado. Recibe un JSON con los datos del proyecto, ejemplo:

  ```json
  { "name": "Project Alpha", "address": "123 Main St", "start_date": "2025-07-01" }
  ```

  (Los campos reales dependen de `CreateConstructionDto`). Retorna el objeto creado con su `id` y detalles.

* **GET** `/architect/{architectId}/construction` – Devuelve todas las obras del arquitecto. Retorna un array de objetos Construction.

* **PUT** `/architect/{architectId}/construction/{id}` – Actualiza los datos de una obra existente. Recibe un body igual al de creación. Devuelve la obra actualizada.

* **DELETE** `/architect/{architectId}/construction/{id}` – Elimina una obra por su ID. Devuelve estado 200 OK.

*Ejemplo en Angular:*

```ts
// Crear obra
this.http.post<Construction>(`${API_URL}/architect/${archId}/construction`, newProject)
  .subscribe(project => console.log('Created:', project));

// Listar obras
this.http.get<Construction[]>(`${API_URL}/architect/${archId}/construction`)
  .subscribe(list => { /* usar la lista de obras */ });
```

**Notas de uso:** `architectId` debe coincidir con el arquitecto autenticado. Normalmente el backend valida que sólo puedas manejar tus propias obras. Después de crear/editar, recargá la lista en el front.

---

## Construction Workers

El módulo **ConstructionWorker** maneja los obreros/trabajadores de cada arquitecto.

Base path: **`/architect/{architectId}/construction-worker`**

* **POST** `/architect/{architectId}/construction-worker` – Agrega un nuevo trabajador. Recibe un JSON (ejemplo: nombre, rol, contacto):

  ```json
  { "name": "John Doe", "role": "Electrician", "contact": "555-1234" }
  ```

  Retorna los datos del trabajador creado.

* **GET** `/architect/{architectId}/construction-worker` – Lista todos los trabajadores del arquitecto.

* **GET** `/architect/{architectId}/construction-worker/{id}` – Devuelve detalles de un trabajador.

* **PUT** `/architect/{architectId}/construction-worker/{id}` – Actualiza los datos de un trabajador.

* **DELETE** `/architect/{architectId}/construction-worker/{id}` – Elimina un trabajador.

*Ejemplo en Angular:*

```ts
// Listar trabajadores
this.http.get<Worker[]>(`${API_URL}/architect/${archId}/construction-worker`)
  .subscribe(workers => { /* usar lista */ });

// Crear trabajador
this.http.post<Worker>(`${API_URL}/architect/${archId}/construction-worker`, { name: 'Jane' })
  .subscribe(worker => console.log('Worker created:', worker));
```

**Notas de uso:** Los trabajadores se usan para registrar quién mueve un elemento (ver **Element Moves**) o asignar tareas. En la UI, permití seleccionar un trabajador para registrar una acción.

---

## Deposits (Storage Locations)

El módulo **Deposit** maneja los depósitos del arquitecto (ej: galpones, almacenes).

Base path: **`/architect/{architectId}/deposit`**

* **POST** `/architect/{architectId}/deposit` – Crea un nuevo depósito. Recibe un JSON con el nombre:

  ```json
  { "name": "Main Warehouse" }
  ```

  Devuelve el depósito creado.

* **GET** `/architect/{architectId}/deposit` – Lista todos los depósitos del arquitecto.

* **PUT** `/architect/{architectId}/deposit/{id}` – Actualiza el nombre de un depósito.

* **DELETE** `/architect/{architectId}/deposit/{id}` – Elimina un depósito.

*Ejemplo en Angular:*

```ts
// Crear depósito
this.http.post<Deposit>(`${API_URL}/architect/${archId}/deposit`, { name: 'New Depot' })
  .subscribe(deposit => console.log('Deposit created:', deposit));

// Listar depósitos
this.http.get<Deposit[]>(`${API_URL}/architect/${archId}/deposit`)
  .subscribe(deposits => { /* mostrar depósitos */ });
```

**Notas de uso:** Los depósitos se usan junto con los **Elements**. Un elemento puede estar en un depósito o en una obra. Para saber qué hay en cada depósito, tenés que cruzar los elementos y su ubicación (ver **Element Moves**).

---

## Elements (Inventory Items)

El módulo **Element** gestiona los ítems de inventario (materiales, equipos) del arquitecto.

Base path: **`/architect/{architectId}/element`**

* **POST** `/architect/{architectId}/element` – Crea un nuevo elemento. Recibe un JSON, por ejemplo:

  ```json
  {
    "name": "Cement Bag",
    "brand": "ACME Corp",
    "provider": "BuildSupply Co.",
    "buy_date": "2025-06-21",
    "categoryId": 3
  }
  ```

  Devuelve el elemento creado con su `id`.

* **GET** `/architect/{architectId}/element` – Lista todos los elementos del arquitecto.

* **PUT** `/architect/{architectId}/element/{id}` – Actualiza los datos de un elemento.

* **DELETE** `/architect/{architectId}/element/{id}` – Elimina un elemento del inventario.

*Ejemplo en Angular:*

```ts
// Crear elemento
const newItem = { name: 'Wood Plank', brand: 'TimberCo', provider: 'Local Supplier', buy_date: '2025-07-10', categoryId: 1 };
this.http.post<Element>(`${API_URL}/architect/${archId}/element`, newItem)
  .subscribe(element => console.log('Element created with ID', element.id));

// Listar elementos
this.http.get<Element[]>(`${API_URL}/architect/${archId}/element`)
  .subscribe(items => { /* mostrar inventario */ });
```

**Notas de uso:** Cuando creás un elemento, puede que no tenga ubicación asignada (depende del back). Para moverlo a depósito u obra, usá **Element Moves**. Para saber la ubicación de cada elemento, consultá los movimientos.

---

## Element Moves (Transferring Items)

El endpoint **ElementMove** sirve para transferir un elemento entre depósitos y obras. Es clave para la gestión de inventario.

* **POST** `/element-move` – Mueve un elemento de un lugar a otro. No está bajo architect porque se pasan los IDs en el body. Recibe un JSON (`MoveElementDto`):

  ```json
  {
    "elementId": 42,
    "fromType": "DEPOSIT",
    "fromId": 5,
    "toType": "CONSTRUCTION",
    "toId": 7,
    "movedBy": 10,
    "movedByType": "worker"
  }
  ```

  Explicación de campos:

  * `elementId`: ID del elemento.
  * `fromType`: Tipo de origen ("DEPOSIT" o "CONSTRUCTION").
  * `fromId`: ID del origen.
  * `toType`: Tipo de destino ("DEPOSIT" o "CONSTRUCTION").
  * `toId`: ID del destino.
  * `movedBy`: ID de la persona que mueve.
  * `movedByType`: "architect" o "worker".

  Devuelve el resultado de la operación (puede ser un log o el elemento actualizado).

  *Ejemplo en Angular:*

  ```ts
  const movePayload = {
    elementId: 42,
    fromType: 'DEPOSIT', fromId: 5,
    toType: 'CONSTRUCTION', toId: 7,
    movedBy: selectedWorkerId, movedByType: 'worker'
  };
  this.http.post(`${API_URL}/element-move`, movePayload)
    .subscribe(res => console.log('Move recorded', res));
  ```

**Notas de uso:** Usá este endpoint cuando realmente se traslada algo físico. Por ejemplo, si un elemento está en depósito #5 y lo vas a usar en obra #7, llamá al endpoint con los datos correctos. `movedBy` es el ID del arquitecto o del trabajador que realiza la acción.

Para saber la ubicación actual de un elemento, usá el último movimiento registrado o consultá el historial (si lo necesitas podés sumar un endpoint propio para ese log).

---

## Notes

El módulo **Note** permite crear y gestionar notas. Pueden ser notas generales o asociadas a proyectos o elementos.

Base path: **`/architect/{architectId}/note`**

* **POST** `/architect/{architectId}/note` – Crea una nota. Recibe un JSON, por ejemplo:

  ```json
  { "content": "Remember to order more cement.", "relatedProjectId": 7 }
  ```

  Devuelve la nota creada (con id, contenido, fecha, etc).

* **GET** `/architect/{architectId}/note` – Lista todas las notas del arquitecto.

* **PUT** `/architect/{architectId}/note/{id}` – Actualiza una nota.

* **DELETE** `/architect/{architectId}/note/{id}` – Elimina una nota.

*Ejemplo en Angular:*

```ts
// Crear nota
this.http.post<Note>(`${API_URL}/architect/${archId}/note`, { content: 'Site meeting on Monday' })
  .subscribe(note => console.log('Note created:', note));

// Listar notas
this.http.get<Note[]>(`${API_URL}/architect/${archId}/note`)
  .subscribe(notes => { /* mostrar notas */ });
```

**Notas de uso:** Usá notas para guardar info relevante o recordatorios. Si podés asociarlas a proyectos o elementos, pasá esos IDs en el JSON.

---

## Missing Items

El módulo **Missing** sirve para marcar elementos que se perdieron o no aparecen.

Base path: **`/architect/{architectId}/missing`**

* **POST** `/architect/{architectId}/missing` – Marca un elemento como perdido. Recibe un JSON:

  ```json
  { "elementId": 42, "notes": "Item not found during inventory check" }
  ```

  Devuelve el registro creado.

* **GET** `/architect/{architectId}/missing` – Lista todos los elementos marcados como faltantes.

* **DELETE** `/architect/{architectId}/missing/{id}` – Elimina un registro de faltante (cuando el item aparece o fue un error).

*Ejemplo en Angular:*

```ts
// Reportar elemento perdido
this.http.post(`${API_URL}/architect/${archId}/missing`, { elementId: 42, notes: 'Lost on site' })
  .subscribe(res => console.log('Missing item reported'));

// Listar elementos perdidos
this.http.get<Missing[]>(`${API_URL}/architect/${archId}/missing`)
  .subscribe(missingList => { /* mostrar faltantes */ });
```

**Notas de uso:** Al marcar un elemento como perdido, puede dejar de estar disponible para movimientos y se puede mostrar destacado en la UI. Cuando lo encuentres, eliminá el registro y vuelve a estar disponible.

---

## Events History (Activity Log)

El módulo **EventsHistory** te da un log de acciones importantes (creaciones, actualizaciones, movimientos, etc) para auditar y hacer seguimiento.

Base path: **`/architect/{architectId}/events-history`**

* **GET** `/architect/{architectId}/events-history` – Lista el historial de eventos del arquitecto. Devuelve un array ordenado (usualmente de más nuevo a más viejo).
