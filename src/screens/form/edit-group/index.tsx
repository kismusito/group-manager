import { Button, FormGroup, FormHelperText, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGroupResolver } from "./validations";
import { useAppDispatch } from "store";
import { updateGroup } from "modules/group/actions";
import { EditGroupInputs } from "./types/create-group-form.types";

type Props = {
  id: string;
  name: string;
  description: string;
};

export const EditGroupForm = ({
  description,
  id,
  name,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditGroupInputs>({
    resolver: yupResolver(createGroupResolver),
  });

  const handleCreateGroup = handleSubmit((data) => {
    dispatch(updateGroup(data));
  });

  return (
    <form onSubmit={handleCreateGroup}>
      <input type="hidden" {...register("id")} defaultValue={id} />
      <FormGroup style={{ marginBottom: 10 }}>
        <TextField
          type="text"
          label="Group name"
          {...register("name")}
          defaultValue={name}
        />
        {errors.name && (
          <FormHelperText error>{errors.name?.message}</FormHelperText>
        )}
      </FormGroup>
      <FormGroup style={{ marginBottom: 10 }}>
        <TextField
          type="text"
          label="Group description"
          {...register("description")}
          defaultValue={description}
          multiline
        />
        {errors.description && (
          <FormHelperText error>{errors.description?.message}</FormHelperText>
        )}
      </FormGroup>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={Object.keys(errors).length > 0}
      >
        Edit group
      </Button>
    </form>
  );
};
