import { Button, FormGroup, FormHelperText, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateGroupInputs } from "./types/create-group-form.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGroupResolver } from "./validations";
import { useAppDispatch } from "store";
import { createGroup } from "modules/group/actions";

export const CreateGroupForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupInputs>({
    resolver: yupResolver(createGroupResolver),
  });

  const handleCreateGroup = handleSubmit((data) => {
    dispatch(createGroup(data));
  });

  return (
    <form onSubmit={handleCreateGroup}>
      <FormGroup style={{ marginBottom: 10 }}>
        <TextField type="text" label="Group name" {...register("name")} />
        {errors.name && (
          <FormHelperText error>{errors.name?.message}</FormHelperText>
        )}
      </FormGroup>
      <FormGroup style={{ marginBottom: 10 }}>
        <TextField
          type="text"
          label="Group description"
          {...register("description")}
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
        Create group
      </Button>
    </form>
  );
};
