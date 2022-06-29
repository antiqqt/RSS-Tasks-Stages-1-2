export interface SourcesRequest {
    apiKey?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface SourcesResponse {
    status: 'ok' | 'error';
    sources: Source[];
}

interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
