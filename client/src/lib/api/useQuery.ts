import {useState, useEffect, useCallback} from 'react';
import {server} from './server';

interface State<TData>{
    data: TData | null;
    loading: boolean;
    error: boolean;
}

interface QueryResult<TData> extends State<TData>{
    refetch: () => void;
}

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {

    const [state, setState] = useState<State<TData>>({
        data: null,
        loading: false,
        error: false
    });

    const fetch = useCallback(() => {

        const fetchApi = async () => {
            try{

                setState({
                    data: null,
                    loading: true,
                    error: false});

                const {data, error} = await server.fetch<TData>({query});

                if(error && error.length){
                    throw new Error(error[0].message);
                };

                setState({data, loading: false, error: false});

            }catch(err){
                setState({data: null, loading: false, error: true});
                throw console.error(err);
            }

        };

        fetchApi();

    }, []);


    useEffect(() => {

        fetch();

    }, [fetch]);

    return {...state, refetch: fetch};
};
