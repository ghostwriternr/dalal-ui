export interface History {
    id: string;
    payload: string;
    success: boolean;
    metadata: string;
    transformed_payload: string;
    created_at: string;
    updated_at: string;
}

export type HistoryResponse = [History]