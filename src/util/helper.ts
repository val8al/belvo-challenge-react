interface MockResponse {
    ok: boolean;
    status: number;
    json: () => Promise<any>;
}

export function mockAuthWithTimeout<T>(data: T, timeout: number): Promise<MockResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response: MockResponse = {
                ok: true,
                status: 200,
                json: () => Promise.resolve(data)
            };
            resolve(response);
        }, timeout);
    });
}