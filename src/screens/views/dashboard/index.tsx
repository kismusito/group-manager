import { getGroups } from "modules/group/actions";
import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";

import {
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { getGroupsItems, isGroupsLoading } from "modules/group/selectors";
import { GroupItem } from "screens/ui/group-item";
import { openModal } from "modules/modal/actions";
import { MODAL_COMPONENT_KEY } from "modules/modal/types/modal-components";
import { Add } from "@mui/icons-material";
import { Navbar } from "screens/ui/navbar";
import { Loading } from "screens/ui/loading";

export const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(getGroupsItems);
  const isLoading = useAppSelector(isGroupsLoading);

  const handleCreateGroup = () => {
    dispatch(
      openModal({
        component: MODAL_COMPONENT_KEY.CREATE_GROUP,
        title: "Create group",
        props: {},
      })
    );
  };

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return (
    <Fragment>
      <Navbar />
      <Container>
        <Grid container justifyContent="center" style={{ marginBottom: 10 }}>
          <Grid item xs={10}>
            <h2 style={{ margin: 0 }}>Groups</h2>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleCreateGroup} fullWidth>
              <p style={{ margin: 0, paddingTop: 2 }}>Create group</p>
              <Add />
            </Button>
          </Grid>
        </Grid>
        {isLoading && <Loading title="Loading groups..." />}
        {!isLoading && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups?.map((group) => (
                  <GroupItem key={group.id} group={group} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Fragment>
  );
};
