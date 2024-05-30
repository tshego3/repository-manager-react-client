import * as React from "react";
import { useState, useEffect } from 'react';
import {
  EditRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
  useArrowNavigationGroup,
  useFocusableGroup,
} from "@fluentui/react-components";
import axios from 'axios';
import { SearchBoxExp } from "./SearchBoxExp";

type NoteItem = {
  _id: string;
  note: string;
};

const columns = [
  { columnKey: "id", label: "ID" },
  { columnKey: "note", label: "Note" },
];

export const TableExp = () => {
  const [data, setData] = useState<NoteItem[]>([]);

  useEffect(() => {
    const apiUrl = 'https://repository-manager-server.netlify.app/api/notes';

    const fetchData = async () => {
      try {
        const response = await axios.get<NoteItem[]>(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });

  return (
    <React.Fragment>
      <SearchBoxExp />
      <Table
        {...keyboardNavAttr}
        role="grid"
        aria-label="Table with grid keyboard navigation"
      >
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
            <TableHeaderCell />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell tabIndex={0} role="gridcell" width="100">
                {item.note}
              </TableCell>
              <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
                <TableCellLayout>
                  <Button icon={<EditRegular />} aria-label="Edit" />
                  <Button icon={<DeleteRegular />} aria-label="Delete" />
                </TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
