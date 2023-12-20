export interface TokenDTO {
    token :string;
    registrationStatus:RegistrationStatus;
}

export enum RegistrationStatus {
    SUCCESS,
    USER_NAME_EXIST
}