export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
    links: PaginationLink[];
    // add other pagination props if needed
}