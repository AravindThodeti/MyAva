import * as React from "react";
import PropType from "prop-types";
import { tableIcons } from "constants/icons";
import DateFnsUtils from "@date-io/date-fns";
import { getConsultations } from "utils/ApiUtils";
import MaterialTable from "material-table";
import { Avatar, Select, MenuItem } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { useHistory } from "react-router-dom";
import { URL_CONSULTATION_GET } from "constants/index";

export default function UserConsultationList(props) {
  const userProgramId = props.userProgramId;
  let history = useHistory();
  return (
    <Box ml={0.5} mr={0.5}>
      <MaterialTable
        icons={tableIcons}
        options={{
          search: false,
          showTitle: false,
          filtering: userProgramId !== null ? false : true,
          columnsButton: userProgramId !== null ? false : true,
          sorting: true,
          thirdSortClick: false,
          align: "left",
          padding: "dense",
        }}
        onRowClick={(event, selectedRow) => {
          history.push(URL_CONSULTATION_GET(selectedRow.id));
        }}
        columns={[
          {
            title: "Id",
            field: "id",
            filtering: false,
            hidden: userProgramId !== null ? false : true,
            hiddenByColumnsButton: true,
          },
          {
            title: "Image",
            filtering: false,
            field: "customer.user.image_url",
            hidden: true,
            sorting: false,
            hiddenByColumnsButton: userProgramId !== null ? false : true,
            render: (rowData) => (
              <Avatar src={rowData.customer.user.image_url} />
            ),
          },
          {
            title: "Name",
            field: "customer.name",
            sorting: false,
            hidden: userProgramId === null ? false : true,
          },
          {
            title: "Status",
            field: "consultation_status",
            hidden: userProgramId !== null ? true : false,
            hiddenByColumnsButton: true,
            filtering: false,
          },
          {
            title: "Slot From",
            field: "slot_start",
            type: "datetime",
            hidden: userProgramId !== null ? false : true,
            hiddenByColumnsButton: true,
            defaultFilter: null,
            defaultSort: "desc",
            filterComponent: (props) => {
              const onDateInputChange = (date) =>
                props.onFilterChanged(props.columnDef.tableData.id, date);
              const pickerProps = {
                value: props.columnDef.tableData.filterValue || null,
                onChange: onDateInputChange,
                clearable: true,
                format: "dd-MM HH:mm",
              };
              return (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker {...pickerProps} />
                </MuiPickersUtilsProvider>
              );
            },
          },
          {
            title: "Slot To",
            field: "slot_end",
            type: "datetime",
            hidden: userProgramId !== null ? false : true,
            hiddenByColumnsButton: true,
            defaultFilter: null,
            filterComponent: (props) => {
              const onDateInputChange = (date) =>
                props.onFilterChanged(props.columnDef.tableData.id, date);
              const pickerProps = {
                value: props.columnDef.tableData.filterValue || null,
                onChange: onDateInputChange,
                clearable: true,
                format: "dd-MM HH:mm",
              };
              return (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker {...pickerProps} />
                </MuiPickersUtilsProvider>
              );
            },
          },
          {
            title: "Consultation Type",
            field: "user_program_id",
            type: "string",
            hidden: userProgramId === null ? false : true,
            defaultFilter: "",
            render: (row) => {
              if (row.user_program_id === null) {
                return "Direct";
              }
              return "Program";
            },
            filterComponent: (props) => {
              return (
                <Select
                  defaultValue=""
                  onChange={(event) =>
                    props.onFilterChanged(
                      props.columnDef.tableData.columnOrder,
                      event.target.value
                    )
                  }
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="is_program_consultation">
                    Program Consultation
                  </MenuItem>
                  <MenuItem value="is_direct_consultation">
                    Direct Consultation
                  </MenuItem>
                </Select>
              );
            },
          },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            const filters = query.filters;
            let orderField = null;
            const orderBy = query.orderBy;
            const orderDirection = query.orderDirection;
            const statusIndex = filters.findIndex(
              (filter) => filter.column.field === "status"
            );
            const status = statusIndex > -1 ? filters[statusIndex].value : null;
            const customerNameIndex = filters.findIndex(
              (filter) => filter.column.field === "customer.name"
            );
            const customerName =
              customerNameIndex > -1 ? filters[customerNameIndex].value : null;
            const startFromIndex = filters.findIndex(
              (filter) => filter.column.field === "slot_start"
            );
            const startFrom =
              startFromIndex > -1
                ? filters[startFromIndex].value.toISOString()
                : null;
            const endToIndex = filters.findIndex(
              (filter) => filter.column.field === "slot_end"
            );
            const endTo =
              endToIndex > -1 ? filters[endToIndex].value.toISOString() : null;

            const userProgramIndex = filters.findIndex(
              (filter) => filter.column.field === "user_program_id"
            );
            let userProgramPresent = null;
            if (userProgramIndex > -1) {
              if (
                filters[userProgramIndex].value === "is_program_consultation"
              ) {
                userProgramPresent = true;
              } else if (
                filters[userProgramIndex].value === "is_direct_consultation"
              ) {
                userProgramPresent = false;
              }
            }

            if (orderBy) {
              if (orderBy.field === "slot_end") {
                orderField = "slotEnd";
              } else if (orderBy.field === "slot_start") {
                orderField = "slotStart";
              } else if (orderBy.field === "consultation_status") {
                orderField = "consultationStatus";
              } else {
                orderField = orderBy.field;
              }
            }
            getConsultations(
              query.page,
              query.pageSize,
              orderField,
              orderDirection,
              startFrom,
              endTo,
              customerName,
              status,
              userProgramPresent,
              userProgramId
            )
              .then((res) => {
                resolve({
                  data: res.data,
                  page: res.page_number,
                  totalCount: res.total,
                });
              })
              .catch((error) => {
                reject(error);
              });
          })
        }
      />
    </Box>
  );
}

UserConsultationList.propType = {
  userProgramId: PropType.number,
};

UserConsultationList.defaultProps = {
  userProgramId: null,
};
