import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../utils/loadingSlice";

const Testing = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.loading.isLoading);
  try {
    if (isLoading) return;
    dispatch(setLoading(true));
    console.log(isLoading);
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoading(false));
    console.log(isLoading);
  }

  return <div>Testing</div>;
};

export default Testing;
