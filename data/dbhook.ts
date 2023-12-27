import { useEffect, useState } from 'react';
import { getCollection } from './dbget';
import { DocumentData } from './types';

const useCollection = (collection: string) => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection(collection)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [collection]);

  return { data, loading };
};

export default useCollection;
