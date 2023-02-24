import { ReturnTypeUseAuthProfileExist } from '@/hooks/useAuth';
import React, { createContext, PropsWithChildren, useContext } from 'react';

export const context = createContext({} as ReturnTypeUseAuthProfileExist);
function AuthContext(props: { authData: ReturnTypeUseAuthProfileExist } & PropsWithChildren) {
  return <context.Provider value={props.authData}>{props.children}</context.Provider>;
}

export function useAuthContext() {
  return useContext(context);
}

export default AuthContext;
