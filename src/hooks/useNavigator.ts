import { TAppDispatch } from "@emmpair/types";
import { useSelector, useDispatch  } from 'react-redux';
import { useCallback } from 'react';
import { push } from 'connected-react-router'
import { TRootState } from "@emmpair/reducers/types";
// import useRouter from "use-react-router";

// export type TUseNavigator = (
//   url: string,
//   replace?: boolean,
//   preserveQs?: boolean
// ) => void;

// function useNavigator():TUseNavigator {
//   const { location:{ search }, history } = useRouter();
//   return (
//     url: string,
//     replace: boolean = false,
//     preserveQs: boolean = false
//   ) => {
//     const targetUrl = preserveQs
//       ? url + search
//       : url;

//     if (replace) {
//       history.replace(targetUrl);
//     } else {
//       history.push(targetUrl);
//     }

//     window.scrollTo({ behavior: "smooth", top: 0 });
//   };
// }

export function pollRouter(): TRootState['router'] {
  return useSelector((state: TRootState) => state.router)
}

export default function useNavigator(): (path: string) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((path: string) => dispatch(push(path)), [dispatch])
}
