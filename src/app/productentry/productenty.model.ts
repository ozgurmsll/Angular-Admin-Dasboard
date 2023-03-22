export interface productentry {
  id: string;
  name: string;
  date: Date;
  depo: string;
  kategori: string;
  price: number;
  adetkg: number;
  productName: string;
  total: number;
  pName: string;
  marka: string;
  tarih: Date;
  direction: string;
  description: string;
  categoryId: string;
  no: number;
  [key: string]: any;
}

export interface Product {
  id: any;
  name: string;

  categoryId: string;
}
export interface ProductTotal {
  id: string;
  name: string;

  adetkg: number;
  depo: string;
}

