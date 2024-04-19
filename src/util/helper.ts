import { MockResponse } from "./interfaces";
import { apiUrlSandbox } from '../util/global';


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

export const fetchAccountData = (link: string, reqPath:string , setData: (data: any) => void, setLoading: (b: boolean) => void) =>{
    fetch(`${apiUrlSandbox}/${reqPath}?link=${link}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Bad response')
      }
      return response.json()
    }).then(data => {
      setData(data);
      setLoading(false)
    }).catch(error => {
      console.log("Faulty data from fetch")
    })
  }