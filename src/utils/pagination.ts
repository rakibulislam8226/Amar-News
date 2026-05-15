export interface PaginationMeta {
    from: number;
    to: number;
    total: number;
    num_pages: number;
    current_page: number;
    has_previous: boolean;
    has_next: boolean;
}

export interface PaginatedResult<T> {
    data: T[];
    meta: PaginationMeta;
}

export interface PaginationOptions {
    page: number;
    limit: number;
}

export const parsePagination = (query: any): PaginationOptions => {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
    return { page, limit };
};

export const buildMeta = (total: number, page: number, limit: number): PaginationMeta => {
    const num_pages = Math.ceil(total / limit) || 1;
    const from = total === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);

    return {
        from,
        to,
        total,
        num_pages,
        current_page: page,
        has_previous: page > 1,
        has_next: page < num_pages,
    };
};
