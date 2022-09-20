import { Typography } from "@mui/material";
import ReactLoading from "react-loading";
import { WrapperLoading } from "screens/styled/wrapper-center";

type Props = {
  title: string;
};

export const Loading = ({ title }: Props): JSX.Element => {
  return (
    <WrapperLoading>
      <ReactLoading type="bubbles" color="#1975D1" height={80} width={100} />
      <Typography variant="subtitle1">{title}</Typography>
    </WrapperLoading>
  );
};
