export interface Report {
    id?: number,
    reason: string,
    reporterId: number,
    reporterEmail?: string,
    reporteeId: number,
    reporteeEmail?: string,
}