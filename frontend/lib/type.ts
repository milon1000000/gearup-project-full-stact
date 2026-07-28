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
