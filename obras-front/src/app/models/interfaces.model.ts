
export class Note {
    constructor(
      public title: string,
      public text: string,
      public type: 'worker' | 'element' | 'material'
    ) {}
  }
  
  export class Missing {
    constructor(
      public title: string,
      public text: string,
      public work: number // workId
    ) {}
  }
  
  export class Material {
    constructor(
      public name: string,
      public provider: string,
      public buy_date: string,
      public notes_related: number[] = []
    ) {}
  }
  
  export class Element {
    constructor(
      public name: string,
      public brand: string,
      public buy_date: string,
      public photo: string,
      public type: 'tool' | 'security_element',
      public notes_related: number[] = []
    ) {}
  }
  
  export class Deposit {
    constructor(
      public elements: Element[] = [],
      public materials: Material[] = []
    ) {}
  }
  
  export class Work {
    constructor(
      public id: number,
      public title: string,
      public desc: string,
      public date_created: string,
      public workers_related: number[] = [],
      public elements_related: number[] = [],
      public materials_related: number[] = [],
      public missing_related: number[] = []
    ) {}
  }
  
  export class Worker {
    constructor(
      public name: string,
      public password: string,
      public works_related: number[] = [],
      public notes_related: number[] = []
    ) {}
  }
  
  export class Architect {
    constructor(
      public name: string,
      public password: string,
      public email: string,
      public payment_level: number,
      public workers: Worker[] = [],
      public works: Work[] = [],
      public deposit: Deposit = new Deposit(),
      public notes: Note[] = [],
      public missings: Missing[] = []
    ) {}
  }
  