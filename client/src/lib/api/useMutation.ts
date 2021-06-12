import {useState, useEffect, useCallback} from 'react';
import {server} from './server';
import { async } from 'q';


interface State<TData>{
    data: TData | null;
    loading: boolean;
    error: boolean;
}

type MutationTupleType<TData, TVariables> = [
    (variables ?: TVariables | undefined) => Promise<void>,
    State<TData>
]

export const useMutation = <TData = any, TVariables = any>(query: string): MutationTupleType<TData, TVariables> => {

    const [state, setState] = useState<State<TData>>({
        data: null,
        loading: false,
        error:false
    })

    const fetch = async(variables?: TVariables) => {
        try{

            setState({
                data: null,
                loading: true,
                error:false
            })

            const {data, error} = await server.fetch<TData, TVariables>({query, variables});

            if(error && error.length){
                throw new Error(error[0].message);
            };

            setState({
                data,
                loading: false,
                error: false
            });


        }catch(err){
            setState({data: null, loading: false, error: true});
            throw console.error(err);
        }
    }

    return [fetch, state];


}
