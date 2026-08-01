import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    profileImage: string | null;

    role: "CUSTOMER" | "PROVIDER" | "ADMIN";

    status: "ACTIVE" | "SUSPENDED";

    createdAt: string;
    updatedAt: string;
  };
};

export type NavbarProps = {
  user: IUser;
};

export type ICategoryResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string | null;
        userId: string;
      };
    };
  };
};

export type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};


export type ICreateGearResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    image: string;
    brand: string;
    condition: string;
    pricePerDay: number;
    stock: number;
    available: boolean;
    providerId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    category: {
      id: string;
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
    provider: {
      id: string;
      name: string;
      email: string;
    };
  };
};

export type IGearItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  brand: string;
  condition: string;
  pricePerDay: number;
  stock: number;
  available: boolean;
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  provider: {
    id: string;
    name: string;
    email: string;
  };
};

export type IMyGearResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: IGearItem[];
};

export type GearFormDialogProps = {
  categoryId: string;
};



export type ICreateRentalPayload = {
  gearItemId: string;
  quantity: number;
  startDate: string;
  endDate: string;
};



export type IGetRentalResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    quantity: number;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status:
      | "PENDING"
      | "CONFIRMED"
      | "PAID"
      | "PICKED_UP"
      | "RETURNED"
      | "CANCELLED";
    customerId: string;
    gearItemId: string;
    createdAt: string;
    updatedAt: string;

    customer: {
      id: string;
      name: string;
      email: string;
      role?: "CUSTOMER" | "PROVIDER" | "ADMIN";
      status?: "ACTIVE" | "SUSPENDED";
    };

    gearItem: {
      id: string;
      name: string;
      description: string;
      image: string;
      brand: string;
      condition: string;
      pricePerDay: number;
      available: boolean;
      providerId: string;
      categoryId: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

// ---- Shared dynamic data types (public pages, dashboards) ----

export type ICategory = {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type IReview = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt?: string;
  customerId?: string;
  gearItemId?: string;
  customer?: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
  gearItem?: {
    id?: string;
    name?: string;
    image?: string | null;
  } | null;
};