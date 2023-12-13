export interface Registration {
    email: string;
    password: string;
    userType: UserType;
    status: UserStatus;

    name: string;
    surname: string
    phone: string;
    
    country: string;
    city: string;
    zipCode: string;
    street: string;
    number: string;
    
}

//Enums for userType, UserStatus
export enum UserStatus {
    NEW,
    ACTIVE,
    SUSPENDED,
    DELETED
}

export enum UserType {
    GUEST, 
    HOST,
    ADMIN
}
