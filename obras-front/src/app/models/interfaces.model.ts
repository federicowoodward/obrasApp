// interfaces.model.ts

export interface Architect {
  id: number;
  name: string;
  email: string;
  password: string;
  payment_level: PlanLimit;
  construction_workers: ConstructionWorker[];
  constructions: Construction[];
  elements: Element[];
  deposits: Deposit[];
  notes: Note[];
  missings: Missing[];
  created_at?: string;
}

export interface PlanLimit {
  id: number;
  name: string;
  max_elements: number;
  max_deposits: number;
  max_constructions: number;
  max_workers: number;
  architects?: Architect[];
  created_at?: string;
}

export interface Category {
  id: number;
  name: string;
  elements?: Element[];
  created_at?: string;
}

export interface Construction {
  id: number;
  title: string;
  description: string;
  architect: Architect;
  deposit: Deposit | null;
  elements: Element[];
  notes: Note[];
  missings: Missing[];
  snapshots: ConstructionSnapshot[];
  created_at?: string;
}

export interface ConstructionWorker {
  id: number;
  name: string;
  architect: Architect;
  elements: Element[];
  created_at?: string;
}

export interface Deposit {
  id: number;
  name: string;
  address: string;
  architect: Architect;
  elements: Element[];
  created_at?: string;
}

export interface Element {
  id: number;
  name: string;
  description: string;
  quantity: number;
  category: Category;
  architect: Architect;
  deposit: Deposit | null;
  construction: Construction | null;
  construction_worker: ConstructionWorker | null;
  moves: ElementMoveDetail[];
  element_location: ElementLocation | null;
  notes: Note[];
  missings: Missing[];
  created_at?: string;
}

export interface ElementLocation {
  id: number;
  element: Element;
  deposit: Deposit | null;
  construction: Construction | null;
  construction_worker: ConstructionWorker | null;
  created_at?: string;
}

export interface ElementMoveDetail {
  id: number;
  element: Element;
  from_deposit: Deposit | null;
  to_deposit: Deposit | null;
  from_construction: Construction | null;
  to_construction: Construction | null;
  from_construction_worker: ConstructionWorker | null;
  to_construction_worker: ConstructionWorker | null;
  quantity: number;
  architect: Architect;
  created_at?: string;
}

export interface EventsHistory {
  id: number;
  table: string;
  action: string;
  actorId: number;
  actorType: string;
  oldData: any;
  newData: any;
  created_at?: string;
}

export interface Note {
  id: number;
  title: string;
  description: string;
  element: Element | null;
  construction: Construction | null;
  architect: Architect;
  created_at?: string;
}

export interface Missing {
  id: number;
  description: string;
  element: Element | null;
  construction: Construction | null;
  architect: Architect;
  created_at?: string;
}

export interface ConstructionSnapshot {
  id: number;
  construction: Construction;
  data: any;
  created_at?: string;
}
