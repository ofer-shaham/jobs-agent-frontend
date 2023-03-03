/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericRecord } from '@/lib/types/types';

import { useEffect, useState } from 'react';
/**
 * Help to integrate the stage with session.
 */
function useStateSession<V extends GenericRecord<any>>({ id, values }: { id: string; values: V }) {
  const getSession = () => {
    const session = JSON.parse(window.sessionStorage.getItem(id) || '{}');
    return session;
  };
  const [state, setState] = useState<V>(getSession() || values);
  useEffect(() => {
    return () => {
      window.sessionStorage.setItem(id, JSON.stringify(state));
    };
    // }
  }, [state, id]);

  return [state, setState] as const;
}

export default useStateSession;
