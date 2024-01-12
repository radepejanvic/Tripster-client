import { PersonUpdate } from "src/app/feature-modules/user-account-update/model/user-update.model";

export interface Notification {
    id: number;
    title: string;
    text: string;
    timeStamp: string;
    userId: number;
    user?: PersonUpdate
}