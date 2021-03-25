import { useSelector  } from 'react-redux';
import { IAppState } from "@emmpair/interfaces";


export function pollContract(): IAppState['contract'] {
  return useSelector((state: IAppState) => state.contract)
};