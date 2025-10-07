export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  cost: number
  stock: number
  minStock: number
  status: "active" | "inactive" | "out_of_stock"
  description: string
  images: string[]
  variants?: ProductVariant[]
  supplier: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  attributes: Record<string, string>
}

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
}

export interface Sale {
  id: string
  orderNumber: string
  client: {
    id: string
    name: string
    email: string
  }
  items: SaleItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "unpaid" | "partial" | "paid" | "refunded"
  paymentMethod: "cash" | "card" | "transfer" | "check"
  shippingAddress: string
  notes: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface SaleItem {
  id: string
  productId: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  address: string
  city: string
  postalCode: string
  country: string
  segment: "vip" | "regular" | "new" | "inactive"
  totalPurchases: number
  totalSpent: number
  lastPurchase: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface ClientInteraction {
  id: string
  clientId: string
  type: "email" | "phone" | "meeting" | "note"
  subject: string
  description: string
  date: string
  createdBy: string
}

export interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  category: string
  paymentTerms: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  status: "active" | "inactive"
  notes: string
  createdAt: string
  updatedAt: string
}

export interface SupplyOrder {
  id: string
  orderNumber: string
  supplier: {
    id: string
    name: string
  }
  items: SupplyOrderItem[]
  subtotal: number
  tax: number
  total: number
  status: "pending" | "confirmed" | "shipped" | "received" | "cancelled"
  paymentStatus: "unpaid" | "partial" | "paid"
  expectedDelivery: string
  actualDelivery?: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface SupplyOrderItem {
  id: string
  productName: string
  sku: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Transaction {
  id: string
  type: "revenue" | "expense"
  category: string
  amount: number
  account: string
  description: string
  reference?: string
  date: string
  createdAt: string
  createdBy: string
}

export interface FinancialAccount {
  id: string
  name: string
  type: "bank" | "cash" | "credit"
  balance: number
  currency: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "sales" | "viewer"
  status: "active" | "inactive"
  phone: string
  avatar?: string
  permissions: UserPermissions
  lastLogin: string
  createdAt: string
  updatedAt: string
}

export interface UserPermissions {
  products: {
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
  }
  sales: {
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
  }
  clients: {
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
  }
  suppliers: {
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
  }
  finances: {
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
  }
  reports: {
    view: boolean
    export: boolean
  }
  settings: {
    view: boolean
    edit: boolean
  }
  users: {
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
  }
}

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: string
  module: string
  details: string
  ipAddress: string
  timestamp: string
}

export interface Notification {
  id: string
  type: "info" | "warning" | "error" | "success"
  title: string
  message: string
  module: string
  link?: string
  read: boolean
  createdAt: string
}

export const mockCategories: Category[] = [
  { id: "1", name: "Électronique", description: "Appareils électroniques", productCount: 45 },
  { id: "2", name: "Vêtements", description: "Vêtements et accessoires", productCount: 128 },
  { id: "3", name: "Maison", description: "Articles pour la maison", productCount: 67 },
  { id: "4", name: "Sports", description: "Équipement sportif", productCount: 34 },
  { id: "5", name: "Livres", description: "Livres et magazines", productCount: 89 },
]

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone XPro 12",
    sku: "ELEC-001",
    category: "Électronique",
    price: 899.99,
    cost: 650.0,
    stock: 45,
    minStock: 10,
    status: "active",
    description: "Smartphone haut de gamme avec écran OLED 6.5 pouces",
    images: ["/modern-smartphone.png"],
    supplier: "TechSupply Co.",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-20",
    createdBy: "admin@example.com",
    variants: [
      {
        id: "1-1",
        name: "128GB Noir",
        sku: "ELEC-001-BK-128",
        price: 899.99,
        stock: 25,
        attributes: { color: "Noir", storage: "128GB" },
      },
      {
        id: "1-2",
        name: "256GB Blanc",
        sku: "ELEC-001-WH-256",
        price: 999.99,
        stock: 20,
        attributes: { color: "Blanc", storage: "256GB" },
      },
    ],
  },
  {
    id: "2",
    name: "T-shirt Premium Coton",
    sku: "VET-045",
    category: "Vêtements",
    price: 29.99,
    cost: 12.0,
    stock: 156,
    minStock: 50,
    status: "active",
    description: "T-shirt en coton bio de haute qualité",
    images: ["/plain-white-tshirt.png"],
    supplier: "Fashion Wholesale",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-18",
    createdBy: "admin@example.com",
  },
  {
    id: "3",
    name: "Casque Audio Sans Fil",
    sku: "ELEC-023",
    category: "Électronique",
    price: 149.99,
    cost: 85.0,
    stock: 8,
    minStock: 15,
    status: "active",
    description: "Casque Bluetooth avec réduction de bruit active",
    images: ["/diverse-people-listening-headphones.png"],
    supplier: "TechSupply Co.",
    createdAt: "2024-01-20",
    updatedAt: "2024-03-22",
    createdBy: "admin@example.com",
  },
  {
    id: "4",
    name: "Lampe de Bureau LED",
    sku: "MAIS-012",
    category: "Maison",
    price: 45.99,
    cost: 22.0,
    stock: 0,
    minStock: 20,
    status: "out_of_stock",
    description: "Lampe LED réglable avec port USB",
    images: ["/modern-desk-lamp.png"],
    supplier: "Home Essentials",
    createdAt: "2024-02-10",
    updatedAt: "2024-03-21",
    createdBy: "admin@example.com",
  },
  {
    id: "5",
    name: "Ballon de Football Pro",
    sku: "SPORT-008",
    category: "Sports",
    price: 34.99,
    cost: 18.0,
    stock: 67,
    minStock: 25,
    status: "active",
    description: "Ballon de football professionnel taille 5",
    images: ["/classic-soccer-ball.png"],
    supplier: "Sports Direct",
    createdAt: "2024-01-25",
    updatedAt: "2024-03-19",
    createdBy: "admin@example.com",
  },
]

export const mockSales: Sale[] = [
  {
    id: "1",
    orderNumber: "CMD-2024-001",
    client: {
      id: "1",
      name: "Marie Dubois",
      email: "marie.dubois@example.com",
    },
    items: [
      {
        id: "1",
        productId: "1",
        productName: "Smartphone XPro 12",
        sku: "ELEC-001",
        quantity: 1,
        unitPrice: 899.99,
        total: 899.99,
      },
      {
        id: "2",
        productId: "3",
        productName: "Casque Audio Sans Fil",
        sku: "ELEC-023",
        quantity: 1,
        unitPrice: 149.99,
        total: 149.99,
      },
    ],
    subtotal: 1049.98,
    tax: 209.99,
    discount: 50.0,
    total: 1209.97,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "card",
    shippingAddress: "15 Rue de la Paix, 75002 Paris",
    notes: "Livraison express demandée",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-20",
    createdBy: "admin@example.com",
  },
  {
    id: "2",
    orderNumber: "CMD-2024-002",
    client: {
      id: "2",
      name: "Jean Martin",
      email: "jean.martin@example.com",
    },
    items: [
      {
        id: "3",
        productId: "2",
        productName: "T-shirt Premium Coton",
        sku: "VET-045",
        quantity: 3,
        unitPrice: 29.99,
        total: 89.97,
      },
    ],
    subtotal: 89.97,
    tax: 17.99,
    discount: 0,
    total: 107.96,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "transfer",
    shippingAddress: "42 Avenue des Champs-Élysées, 75008 Paris",
    notes: "",
    createdAt: "2024-03-18",
    updatedAt: "2024-03-19",
    createdBy: "admin@example.com",
  },
  {
    id: "3",
    orderNumber: "CMD-2024-003",
    client: {
      id: "3",
      name: "Sophie Laurent",
      email: "sophie.laurent@example.com",
    },
    items: [
      {
        id: "4",
        productId: "5",
        productName: "Ballon de Football Pro",
        sku: "SPORT-008",
        quantity: 2,
        unitPrice: 34.99,
        total: 69.98,
      },
    ],
    subtotal: 69.98,
    tax: 13.99,
    discount: 0,
    total: 83.97,
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "cash",
    shippingAddress: "8 Boulevard Saint-Germain, 75005 Paris",
    notes: "Client préfère payer à la livraison",
    createdAt: "2024-03-22",
    updatedAt: "2024-03-22",
    createdBy: "admin@example.com",
  },
  {
    id: "4",
    orderNumber: "CMD-2024-004",
    client: {
      id: "4",
      name: "Pierre Durand",
      email: "pierre.durand@example.com",
    },
    items: [
      {
        id: "5",
        productId: "1",
        productName: "Smartphone XPro 12",
        sku: "ELEC-001",
        quantity: 2,
        unitPrice: 899.99,
        total: 1799.98,
      },
    ],
    subtotal: 1799.98,
    tax: 359.99,
    discount: 100.0,
    total: 2059.97,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "card",
    shippingAddress: "23 Rue du Faubourg Saint-Honoré, 75008 Paris",
    notes: "Commande entreprise",
    createdAt: "2024-03-20",
    updatedAt: "2024-03-21",
    createdBy: "admin@example.com",
  },
]

export const mockClients: Client[] = [
  {
    id: "1",
    name: "Marie Dubois",
    email: "marie.dubois@example.com",
    phone: "+33 6 12 34 56 78",
    company: "Tech Solutions SARL",
    address: "15 Rue de la Paix",
    city: "Paris",
    postalCode: "75002",
    country: "France",
    segment: "vip",
    totalPurchases: 12,
    totalSpent: 8450.5,
    lastPurchase: "2024-03-15",
    notes: "Cliente fidèle, préfère les produits haut de gamme",
    createdAt: "2023-06-10",
    updatedAt: "2024-03-15",
  },
  {
    id: "2",
    name: "Jean Martin",
    email: "jean.martin@example.com",
    phone: "+33 6 23 45 67 89",
    company: "",
    address: "42 Avenue des Champs-Élysées",
    city: "Paris",
    postalCode: "75008",
    country: "France",
    segment: "regular",
    totalPurchases: 5,
    totalSpent: 1250.75,
    lastPurchase: "2024-03-18",
    notes: "",
    createdAt: "2023-11-20",
    updatedAt: "2024-03-18",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    email: "sophie.laurent@example.com",
    phone: "+33 6 34 56 78 90",
    company: "Laurent & Associés",
    address: "8 Boulevard Saint-Germain",
    city: "Paris",
    postalCode: "75005",
    country: "France",
    segment: "regular",
    totalPurchases: 3,
    totalSpent: 450.25,
    lastPurchase: "2024-03-22",
    notes: "Intéressée par les promotions",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-22",
  },
  {
    id: "4",
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    phone: "+33 6 45 67 89 01",
    company: "Durand Enterprises",
    address: "23 Rue du Faubourg Saint-Honoré",
    city: "Paris",
    postalCode: "75008",
    country: "France",
    segment: "vip",
    totalPurchases: 18,
    totalSpent: 15200.0,
    lastPurchase: "2024-03-20",
    notes: "Commandes régulières pour l'entreprise",
    createdAt: "2023-03-05",
    updatedAt: "2024-03-20",
  },
  {
    id: "5",
    name: "Isabelle Moreau",
    email: "isabelle.moreau@example.com",
    phone: "+33 6 56 78 90 12",
    company: "",
    address: "67 Rue de Rivoli",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    segment: "new",
    totalPurchases: 1,
    totalSpent: 89.99,
    lastPurchase: "2024-03-23",
    notes: "Nouveau client",
    createdAt: "2024-03-23",
    updatedAt: "2024-03-23",
  },
  {
    id: "6",
    name: "Thomas Bernard",
    email: "thomas.bernard@example.com",
    phone: "+33 6 67 89 01 23",
    company: "",
    address: "91 Avenue Montaigne",
    city: "Paris",
    postalCode: "75008",
    country: "France",
    segment: "inactive",
    totalPurchases: 2,
    totalSpent: 320.5,
    lastPurchase: "2023-08-12",
    notes: "Pas d'achat depuis 6 mois",
    createdAt: "2023-05-18",
    updatedAt: "2023-08-12",
  },
]

export const mockClientInteractions: ClientInteraction[] = [
  {
    id: "1",
    clientId: "1",
    type: "email",
    subject: "Demande de devis",
    description: "Client a demandé un devis pour 10 smartphones",
    date: "2024-03-10",
    createdBy: "admin@example.com",
  },
  {
    id: "2",
    clientId: "1",
    type: "phone",
    subject: "Suivi de commande",
    description: "Appel pour vérifier le statut de la livraison",
    date: "2024-03-14",
    createdBy: "admin@example.com",
  },
  {
    id: "3",
    clientId: "4",
    type: "meeting",
    subject: "Réunion partenariat",
    description: "Discussion sur un partenariat à long terme",
    date: "2024-03-18",
    createdBy: "admin@example.com",
  },
]

export const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "TechSupply Co.",
    email: "contact@techsupply.com",
    phone: "+33 1 23 45 67 89",
    address: "45 Avenue de la Technologie",
    city: "Lyon",
    postalCode: "69001",
    country: "France",
    category: "Électronique",
    paymentTerms: "Net 30",
    totalOrders: 24,
    totalSpent: 45600.0,
    lastOrder: "2024-03-18",
    status: "active",
    notes: "Fournisseur principal pour l'électronique",
    createdAt: "2023-01-10",
    updatedAt: "2024-03-18",
  },
  {
    id: "2",
    name: "Fashion Wholesale",
    email: "orders@fashionwholesale.fr",
    phone: "+33 1 34 56 78 90",
    address: "12 Rue de la Mode",
    city: "Paris",
    postalCode: "75009",
    country: "France",
    category: "Vêtements",
    paymentTerms: "Net 45",
    totalOrders: 18,
    totalSpent: 12300.0,
    lastOrder: "2024-03-20",
    status: "active",
    notes: "Bonne qualité, délais respectés",
    createdAt: "2023-03-15",
    updatedAt: "2024-03-20",
  },
  {
    id: "3",
    name: "Home Essentials",
    email: "info@homeessentials.com",
    phone: "+33 1 45 67 89 01",
    address: "78 Boulevard du Commerce",
    city: "Marseille",
    postalCode: "13001",
    country: "France",
    category: "Maison",
    paymentTerms: "Net 30",
    totalOrders: 15,
    totalSpent: 8900.0,
    lastOrder: "2024-03-10",
    status: "active",
    notes: "",
    createdAt: "2023-05-20",
    updatedAt: "2024-03-10",
  },
  {
    id: "4",
    name: "Sports Direct",
    email: "contact@sportsdirect.fr",
    phone: "+33 1 56 78 90 12",
    address: "34 Avenue du Sport",
    city: "Toulouse",
    postalCode: "31000",
    country: "France",
    category: "Sports",
    paymentTerms: "Net 60",
    totalOrders: 12,
    totalSpent: 6700.0,
    lastOrder: "2024-03-15",
    status: "active",
    notes: "Spécialiste équipement sportif",
    createdAt: "2023-07-01",
    updatedAt: "2024-03-15",
  },
  {
    id: "5",
    name: "Global Electronics Ltd",
    email: "sales@globalelectronics.com",
    phone: "+33 1 67 89 01 23",
    address: "56 Rue Internationale",
    city: "Nice",
    postalCode: "06000",
    country: "France",
    category: "Électronique",
    paymentTerms: "Net 30",
    totalOrders: 8,
    totalSpent: 18500.0,
    lastOrder: "2023-12-20",
    status: "inactive",
    notes: "Pas de commande depuis 3 mois",
    createdAt: "2023-02-10",
    updatedAt: "2023-12-20",
  },
]

export const mockSupplyOrders: SupplyOrder[] = [
  {
    id: "1",
    orderNumber: "PO-2024-001",
    supplier: {
      id: "1",
      name: "TechSupply Co.",
    },
    items: [
      {
        id: "1",
        productName: "Smartphone XPro 12",
        sku: "ELEC-001",
        quantity: 50,
        unitPrice: 650.0,
        total: 32500.0,
      },
      {
        id: "2",
        productName: "Casque Audio Sans Fil",
        sku: "ELEC-023",
        quantity: 30,
        unitPrice: 85.0,
        total: 2550.0,
      },
    ],
    subtotal: 35050.0,
    tax: 7010.0,
    total: 42060.0,
    status: "received",
    paymentStatus: "paid",
    expectedDelivery: "2024-03-15",
    actualDelivery: "2024-03-14",
    notes: "Livraison anticipée",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-14",
  },
  {
    id: "2",
    orderNumber: "PO-2024-002",
    supplier: {
      id: "2",
      name: "Fashion Wholesale",
    },
    items: [
      {
        id: "3",
        productName: "T-shirt Premium Coton",
        sku: "VET-045",
        quantity: 200,
        unitPrice: 12.0,
        total: 2400.0,
      },
    ],
    subtotal: 2400.0,
    tax: 480.0,
    total: 2880.0,
    status: "shipped",
    paymentStatus: "paid",
    expectedDelivery: "2024-03-25",
    notes: "",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-20",
  },
  {
    id: "3",
    orderNumber: "PO-2024-003",
    supplier: {
      id: "3",
      name: "Home Essentials",
    },
    items: [
      {
        id: "4",
        productName: "Lampe de Bureau LED",
        sku: "MAIS-012",
        quantity: 100,
        unitPrice: 22.0,
        total: 2200.0,
      },
    ],
    subtotal: 2200.0,
    tax: 440.0,
    total: 2640.0,
    status: "confirmed",
    paymentStatus: "unpaid",
    expectedDelivery: "2024-03-28",
    notes: "Urgent - stock épuisé",
    createdAt: "2024-03-18",
    updatedAt: "2024-03-19",
  },
  {
    id: "4",
    orderNumber: "PO-2024-004",
    supplier: {
      id: "4",
      name: "Sports Direct",
    },
    items: [
      {
        id: "5",
        productName: "Ballon de Football Pro",
        sku: "SPORT-008",
        quantity: 75,
        unitPrice: 18.0,
        total: 1350.0,
      },
    ],
    subtotal: 1350.0,
    tax: 270.0,
    total: 1620.0,
    status: "pending",
    paymentStatus: "unpaid",
    expectedDelivery: "2024-03-30",
    notes: "",
    createdAt: "2024-03-22",
    updatedAt: "2024-03-22",
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "revenue",
    category: "Ventes",
    amount: 1209.97,
    account: "Compte principal",
    description: "Vente CMD-2024-001 - Marie Dubois",
    reference: "CMD-2024-001",
    date: "2024-03-15",
    createdAt: "2024-03-15",
    createdBy: "admin@example.com",
  },
  {
    id: "2",
    type: "expense",
    category: "Achats fournisseurs",
    amount: 42060.0,
    account: "Compte principal",
    description: "Commande fournisseur PO-2024-001 - TechSupply Co.",
    reference: "PO-2024-001",
    date: "2024-03-14",
    createdAt: "2024-03-14",
    createdBy: "admin@example.com",
  },
  {
    id: "3",
    type: "revenue",
    category: "Ventes",
    amount: 107.96,
    account: "Compte principal",
    description: "Vente CMD-2024-002 - Jean Martin",
    reference: "CMD-2024-002",
    date: "2024-03-18",
    createdAt: "2024-03-18",
    createdBy: "admin@example.com",
  },
  {
    id: "4",
    type: "expense",
    category: "Loyer",
    amount: 2500.0,
    account: "Compte principal",
    description: "Loyer mensuel mars 2024",
    date: "2024-03-01",
    createdAt: "2024-03-01",
    createdBy: "admin@example.com",
  },
  {
    id: "5",
    type: "expense",
    category: "Salaires",
    amount: 8500.0,
    account: "Compte principal",
    description: "Salaires mars 2024",
    date: "2024-03-01",
    createdAt: "2024-03-01",
    createdBy: "admin@example.com",
  },
  {
    id: "6",
    type: "expense",
    category: "Marketing",
    amount: 1200.0,
    account: "Compte principal",
    description: "Campagne publicitaire Facebook",
    date: "2024-03-10",
    createdAt: "2024-03-10",
    createdBy: "admin@example.com",
  },
  {
    id: "7",
    type: "revenue",
    category: "Ventes",
    amount: 2059.97,
    account: "Compte principal",
    description: "Vente CMD-2024-004 - Pierre Durand",
    reference: "CMD-2024-004",
    date: "2024-03-20",
    createdAt: "2024-03-20",
    createdBy: "admin@example.com",
  },
  {
    id: "8",
    type: "expense",
    category: "Utilities",
    amount: 450.0,
    account: "Compte principal",
    description: "Électricité et eau mars 2024",
    date: "2024-03-05",
    createdAt: "2024-03-05",
    createdBy: "admin@example.com",
  },
  {
    id: "9",
    type: "expense",
    category: "Achats fournisseurs",
    amount: 2880.0,
    account: "Compte principal",
    description: "Commande fournisseur PO-2024-002 - Fashion Wholesale",
    reference: "PO-2024-002",
    date: "2024-03-20",
    createdAt: "2024-03-20",
    createdBy: "admin@example.com",
  },
  {
    id: "10",
    type: "revenue",
    category: "Ventes",
    amount: 83.97,
    account: "Caisse",
    description: "Vente CMD-2024-003 - Sophie Laurent",
    reference: "CMD-2024-003",
    date: "2024-03-22",
    createdAt: "2024-03-22",
    createdBy: "admin@example.com",
  },
]

export const mockFinancialAccounts: FinancialAccount[] = [
  {
    id: "1",
    name: "Compte principal",
    type: "bank",
    balance: 45230.5,
    currency: "EUR",
  },
  {
    id: "2",
    name: "Caisse",
    type: "cash",
    balance: 1250.0,
    currency: "EUR",
  },
  {
    id: "3",
    name: "Carte de crédit",
    type: "credit",
    balance: -3500.0,
    currency: "EUR",
  },
]

export const defaultPermissions: Record<string, UserPermissions> = {
  admin: {
    products: { view: true, create: true, edit: true, delete: true },
    sales: { view: true, create: true, edit: true, delete: true },
    clients: { view: true, create: true, edit: true, delete: true },
    suppliers: { view: true, create: true, edit: true, delete: true },
    finances: { view: true, create: true, edit: true, delete: true },
    reports: { view: true, export: true },
    settings: { view: true, edit: true },
    users: { view: true, create: true, edit: true, delete: true },
  },
  manager: {
    products: { view: true, create: true, edit: true, delete: false },
    sales: { view: true, create: true, edit: true, delete: false },
    clients: { view: true, create: true, edit: true, delete: false },
    suppliers: { view: true, create: true, edit: true, delete: false },
    finances: { view: true, create: true, edit: true, delete: false },
    reports: { view: true, export: true },
    settings: { view: true, edit: false },
    users: { view: true, create: false, edit: false, delete: false },
  },
  sales: {
    products: { view: true, create: false, edit: false, delete: false },
    sales: { view: true, create: true, edit: true, delete: false },
    clients: { view: true, create: true, edit: true, delete: false },
    suppliers: { view: false, create: false, edit: false, delete: false },
    finances: { view: false, create: false, edit: false, delete: false },
    reports: { view: true, export: false },
    settings: { view: false, edit: false },
    users: { view: false, create: false, edit: false, delete: false },
  },
  viewer: {
    products: { view: true, create: false, edit: false, delete: false },
    sales: { view: true, create: false, edit: false, delete: false },
    clients: { view: true, create: false, edit: false, delete: false },
    suppliers: { view: true, create: false, edit: false, delete: false },
    finances: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, export: false },
    settings: { view: false, edit: false },
    users: { view: false, create: false, edit: false, delete: false },
  },
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin Principal",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    phone: "+33 6 12 34 56 78",
    permissions: defaultPermissions.admin,
    lastLogin: "2024-03-23T10:30:00",
    createdAt: "2023-01-01",
    updatedAt: "2024-03-23",
  },
  {
    id: "2",
    name: "Claire Rousseau",
    email: "claire.rousseau@example.com",
    role: "manager",
    status: "active",
    phone: "+33 6 23 45 67 89",
    permissions: defaultPermissions.manager,
    lastLogin: "2024-03-23T09:15:00",
    createdAt: "2023-03-15",
    updatedAt: "2024-03-23",
  },
  {
    id: "3",
    name: "Lucas Petit",
    email: "lucas.petit@example.com",
    role: "sales",
    status: "active",
    phone: "+33 6 34 56 78 90",
    permissions: defaultPermissions.sales,
    lastLogin: "2024-03-22T16:45:00",
    createdAt: "2023-06-20",
    updatedAt: "2024-03-22",
  },
  {
    id: "4",
    name: "Emma Leroy",
    email: "emma.leroy@example.com",
    role: "sales",
    status: "active",
    phone: "+33 6 45 67 89 01",
    permissions: defaultPermissions.sales,
    lastLogin: "2024-03-23T08:00:00",
    createdAt: "2023-09-10",
    updatedAt: "2024-03-23",
  },
  {
    id: "5",
    name: "Antoine Mercier",
    email: "antoine.mercier@example.com",
    role: "viewer",
    status: "inactive",
    phone: "+33 6 56 78 90 12",
    permissions: defaultPermissions.viewer,
    lastLogin: "2024-02-15T14:20:00",
    createdAt: "2023-11-05",
    updatedAt: "2024-02-15",
  },
]

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    userId: "1",
    userName: "Admin Principal",
    action: "Création",
    module: "Produits",
    details: "Ajout du produit 'Smartphone XPro 12'",
    ipAddress: "192.168.1.100",
    timestamp: "2024-03-23T10:30:00",
  },
  {
    id: "2",
    userId: "2",
    userName: "Claire Rousseau",
    action: "Modification",
    module: "Ventes",
    details: "Mise à jour de la commande CMD-2024-001",
    ipAddress: "192.168.1.101",
    timestamp: "2024-03-23T09:15:00",
  },
  {
    id: "3",
    userId: "3",
    userName: "Lucas Petit",
    action: "Création",
    module: "Clients",
    details: "Ajout du client 'Marie Dubois'",
    ipAddress: "192.168.1.102",
    timestamp: "2024-03-22T16:45:00",
  },
  {
    id: "4",
    userId: "1",
    userName: "Admin Principal",
    action: "Suppression",
    module: "Produits",
    details: "Suppression du produit 'Ancien modèle'",
    ipAddress: "192.168.1.100",
    timestamp: "2024-03-22T14:20:00",
  },
  {
    id: "5",
    userId: "4",
    userName: "Emma Leroy",
    action: "Création",
    module: "Ventes",
    details: "Création de la commande CMD-2024-003",
    ipAddress: "192.168.1.103",
    timestamp: "2024-03-22T11:30:00",
  },
  {
    id: "6",
    userId: "2",
    userName: "Claire Rousseau",
    action: "Modification",
    module: "Fournisseurs",
    details: "Mise à jour des informations de TechSupply Co.",
    ipAddress: "192.168.1.101",
    timestamp: "2024-03-21T15:45:00",
  },
  {
    id: "7",
    userId: "1",
    userName: "Admin Principal",
    action: "Création",
    module: "Utilisateurs",
    details: "Ajout de l'utilisateur 'Emma Leroy'",
    ipAddress: "192.168.1.100",
    timestamp: "2024-03-20T10:00:00",
  },
  {
    id: "8",
    userId: "3",
    userName: "Lucas Petit",
    action: "Consultation",
    module: "Rapports",
    details: "Export du rapport des ventes mensuelles",
    ipAddress: "192.168.1.102",
    timestamp: "2024-03-20T09:30:00",
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    title: "Stock faible",
    message: "Le produit 'Casque Audio Sans Fil' a un stock de 8 unités (minimum: 15)",
    module: "Produits",
    link: "/products",
    read: false,
    createdAt: "2024-03-23T10:00:00",
  },
  {
    id: "2",
    type: "error",
    title: "Rupture de stock",
    message: "Le produit 'Lampe de Bureau LED' est en rupture de stock",
    module: "Produits",
    link: "/products",
    read: false,
    createdAt: "2024-03-23T09:30:00",
  },
  {
    id: "3",
    type: "warning",
    title: "Paiement en retard",
    message: "La commande CMD-2024-003 n'est toujours pas payée",
    module: "Ventes",
    link: "/sales",
    read: false,
    createdAt: "2024-03-23T08:00:00",
  },
  {
    id: "4",
    type: "info",
    title: "Commande fournisseur en attente",
    message: "La commande PO-2024-003 attend confirmation",
    module: "Fournisseurs",
    link: "/suppliers",
    read: true,
    createdAt: "2024-03-22T16:00:00",
  },
  {
    id: "5",
    type: "success",
    title: "Livraison reçue",
    message: "La commande PO-2024-001 a été livrée avec succès",
    module: "Fournisseurs",
    link: "/suppliers",
    read: true,
    createdAt: "2024-03-22T14:00:00",
  },
  {
    id: "6",
    type: "info",
    title: "Nouveau client VIP",
    message: "Pierre Durand a atteint le statut VIP avec 15 000€ de dépenses",
    module: "Clients",
    link: "/clients",
    read: true,
    createdAt: "2024-03-21T12:00:00",
  },
]
