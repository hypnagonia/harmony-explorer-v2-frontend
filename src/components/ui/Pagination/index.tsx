import React from "react";
import { Box, Text, Select } from "grommet";
import { Filter } from "src/types";
import { FormPrevious, FormNext } from "grommet-icons";
import { formatNumber } from "../utils";

interface PaginationNavigator {
  filter: Filter;
  totalElements: number;
  onChange: (filter: Filter) => void;
  property: string;
}

export function PaginationNavigator(props: PaginationNavigator) {
  const { totalElements, filter, onChange, property } = props;
  const { filters, limit = 10 } = filter;
  const { value } = filters[0];

  const onPrevClick = () => {
    const newFilter = JSON.parse(JSON.stringify(filter)) as Filter;
    const innerFilter = newFilter.filters.find((i) => i.property === property);
    if (innerFilter) {
      innerFilter.type = 'lt';
      innerFilter.value = Math.min(+innerFilter.value + limit, totalElements);
    }

    onChange(newFilter);
  };

  const onNextClick = () => {
    const newFilter = JSON.parse(JSON.stringify(filter)) as Filter;
    const innerFilter = newFilter.filters.find((i) => i.property === property);
    if (innerFilter) {
      innerFilter.type = 'lt';
      innerFilter.value = Math.max(+innerFilter.value - limit, 0);
    }

    onChange(newFilter);
  };

  return (
    <Box>
      <Pagination
        currentPage={+((totalElements - +value) / limit).toFixed(0) + 1}
        totalPages={+(Number(totalElements) / limit).toFixed(0)}
        onPrevPageClick={onPrevClick}
        onNextPageClick={onNextClick}
      />
    </Box>
  );
}
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPageClick: () => void;
  onNextPageClick: () => void;
}

function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onPrevPageClick, onNextPageClick } = props;
  return (
    <Box direction="row" gap="small">
      <FormPrevious onClick={onPrevPageClick} style={{ cursor: "pointer" }} />
      <Text style={{ fontWeight: "bold" }}>{formatNumber(+currentPage)}</Text>
      <Text style={{ fontWeight: 300 }}>/</Text>
      <Text style={{ fontWeight: 300 }}>{formatNumber(+totalPages)}</Text>
      <FormNext onClick={onNextPageClick} style={{ cursor: "pointer" }} />
    </Box>
  );
}

interface ElementsPerPage {
  filter: Filter;
  onChange: (filter: Filter) => void;
  options?: number[];
}

const defaultOptions: string[] = ["10", "25", "50", "100"];

export function PaginationRecordsPerPage(props: ElementsPerPage) {
  const { filter, options = defaultOptions, onChange } = props;
  const { limit = 10 } = filter;

  const onChangeLimit = (props: { option: number }) => {
    const newFilter = JSON.parse(JSON.stringify(filter)) as Filter;
    newFilter.limit = Number(props.option);
    onChange(newFilter);
  };

  return (
    <Box direction="row" gap="small" align="center">
      <Box style={{ width: "95px" }}>
        <Select
          options={options}
          value={limit.toString()}
          onChange={onChangeLimit}
        />
      </Box>
      <Text size="small">records per page</Text>
    </Box>
  );
}
