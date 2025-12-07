export interface OperationItem {
    id: string;
    name: string;
    importance: number;
}

export interface SortInfo {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: SortInfo;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface OperationResponse {
    content: OperationItem[];

    pageable: Pageable;

    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;

    size: number;
    number: number;

    sort: SortInfo;

    numberOfElements: number;
    empty: boolean;
}