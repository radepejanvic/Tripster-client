import { UserStatus, UserType } from "../../user-registration/model/user.model";

export interface PersonUpdate {
    email: string;
    //Ovo je razlika u odnosu na model za create
    id: number;
    password: string;
    userType: UserType;
    status: UserStatus;

    name: string;
    surname: string
    phone: string;
    
    adressId?: number;

    country: string;
    city: string;
    zipCode: string;
    street: string;
    number: string;
    
}