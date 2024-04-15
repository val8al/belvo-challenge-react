export interface MockResponse {
    ok: boolean;
    status: number;
    json: () => Promise<any>;
}
export interface BaseComponentProps {
    link: string
}
export interface LoginComponentProps {
    setLink: (link: string) => void;
}