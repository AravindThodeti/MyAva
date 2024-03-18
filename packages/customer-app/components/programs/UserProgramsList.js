import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserPrograms } from "@/actions/api.action";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import NextIcon from "@material-ui/icons/NavigateNext";
import CenterCircularProgress from "@ava/common/lib/components/CenterCircularProgress";
import * as constant from "@/constants/index";
import { PROGRAM_STATUS } from "@ava/common";

export default function UserProgramList() {
  const dispatch = useDispatch();
  const userPrograms = useSelector(
    (state) => state.userProgramReducer.programs
  );

  const getLink = (program) => {
    if (program.status == PROGRAM_STATUS.PENDING) {
      return {
        href: constant.URL_USER_PROGRAM_PROFILE_FORMAT,
        as: constant.URL_USER_PROGRAM_PROFILE(program.id),
      };
    } else if (program.status == PROGRAM_STATUS.PROFILE_COMPLETED) {
      return {
        href: constant.URL_USER_PROGRAM_PENDING_FORMAT,
        as: constant.URL_USER_PROGRAM_PENDING(program.id),
      };
    }
    return {
      href: constant.URL_USER_PROGRAM_DETAIL_FORMAT,
      as: constant.URL_USER_PROGRAM_DETAIL(program.id),
    };
  };

  React.useEffect(() => {
    if (userPrograms === undefined) {
      dispatch(getUserPrograms());
    }
  }, [userPrograms]);

  if (userPrograms) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List>
            {userPrograms.map((program) => (
              <ListItem key={program.id}>
                <ListItemText
                  primary={program.plan.program.name}
                  secondary={program.plan.name}
                />
                <ListItemSecondaryAction>
                  <Link
                    passHref={true}
                    href={getLink(program).href}
                    as={getLink(program).as}
                  >
                    <IconButton edge="end" aria-label="next">
                      <NextIcon />
                    </IconButton>
                  </Link>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    );
  }
  return <CenterCircularProgress />;
}
