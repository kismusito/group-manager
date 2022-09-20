import { IconButton, Tooltip } from "@mui/material";

type Props = {
  icon: JSX.Element;
  title: string;
  action?: () => void;
};

export const GroupActionButton = ({
  icon,
  title,
  action,
}: Props): JSX.Element => {
  const handleButtonAction = () => {
    if (action) {
      action();
    }
  };

  return (
    <Tooltip title={title}>
      <IconButton onClick={handleButtonAction}>{icon}</IconButton>
    </Tooltip>
  );
};
