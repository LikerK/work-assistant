import { useContext } from 'react';

import { AuthContext, BdContext } from '../contexts/index.jsx';

export const useAuth = () => useContext(AuthContext);
export const useBd = () => useContext(BdContext);
