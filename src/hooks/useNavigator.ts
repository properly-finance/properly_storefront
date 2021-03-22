import useRouter from "use-react-router";

export type TUseNavigator = (
  url: string,
  replace?: boolean,
  preserveQs?: boolean
) => void;

function useNavigator(): TUseNavigator {
  const { location:{ search }, history } = useRouter();
  return (
    url: string,
    replace: boolean = false,
    preserveQs: boolean = false
  ) => {
    const targetUrl = preserveQs
      ? url + search
      : url;

    if (replace) {
      history.replace(targetUrl);
    } else {
      history.push(targetUrl);
    }

    window.scrollTo({ behavior: "smooth", top: 0 });
  };
}

export default useNavigator;
