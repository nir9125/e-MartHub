import { Role } from "./role";

export class Register{
    firstName?: string;
    lastName?: string;
    mailId!: string;
    password?: string;
    mobileNo?: string;
    role?: Role;
}