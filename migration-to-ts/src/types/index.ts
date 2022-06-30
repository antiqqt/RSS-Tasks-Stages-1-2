export enum HTTPMethod {
    CONNECT = 'CONNECT',
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE',
}

interface SourcesOptions {
    apiKey?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface SourcesResponse {
    status: 'ok' | 'error';
    sources: Source[];
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

interface EverythingOptions {
    apiKey?: string;
    q?: string;
    searchIn?: string;
    sources?: string;
    domains?: string;
    excludeDomains?: string;
    from?: string;
    to?: string;
    language?: string;
    sortBy?: string;
    pageSize?: number;
    page?: number;
}

export interface EverythingResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: number;
}

export type RequestOptions = SourcesOptions | EverythingOptions;
export type ServerResponse = SourcesResponse | EverythingResponse;
