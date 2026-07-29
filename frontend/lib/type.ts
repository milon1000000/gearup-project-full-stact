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
