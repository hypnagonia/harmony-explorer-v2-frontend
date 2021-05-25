import React from "react";
import styled from "styled-components";

export interface IDropdownProps<T = {}> {
  defaultValue?: T;
  value?: T;
  className?: string;
  keyField: keyof T;
  renderValue: (dataItem: T) => JSX.Element;
  renderItem: (dataItem: T) => JSX.Element;
  items: T[];
  isOpen?: boolean;
  searchable?: boolean | ((dataItem: T) => boolean);
  group?: {
    groupBy: keyof T;
    renderGroupItem: () => JSX.Element;
  }[];
  onToggle?: (isOpen: boolean) => void;
  onClickItem?: (dataItem: T) => void;
}

const DropdownWrapper = styled.div`
  width: 100%;
  height: 24px;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 8px;
  margin: 5px;
  position: relative;
`;

const Value = styled.div`
  width: 100%;
`;

const DataList = styled.div`
  position: absolute;
  max-height: 300px;
  overflow: auto;
  width: 100%;
  top: 35px;
  background: #fff;
  border-radius: 2px;
`;

const DataItem = styled.div`
  min-height: 20px;
  padding: 5px;
  cursor: pointer;
`;

export class Dropdown<T = {}> extends React.Component<
  IDropdownProps<T>,
  { isOpen: boolean }
> {
  public element!: HTMLDivElement;

  public initValue: T = this.props.defaultValue || this.props.items[0];

  private get selectedValue() {
    return this.props.value || this.initValue;
  }

  public state = {
    isOpen: this.props.isOpen || false,
  };

  componentDidMount() {
    document.body.addEventListener("click", this.handleClickBody as any);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleClickBody as any);
  }

  handleClickBody = (e: React.MouseEvent<HTMLElement>) => {
    if (!(this.element && this.element.contains(e.target as Node))) {
      this.setState({ ...this.state, isOpen: false });
    }
  };

  onClickItem = (item: T, evt: React.MouseEvent<HTMLDivElement>) => {
    this.initValue = item;

    if (this.props.onClickItem) {
      this.props.onClickItem(item);
    }

    this.setState({ ...this.state, isOpen: false });
  };

  render() {
    return (
      <DropdownWrapper
        className={this.props.className}
        ref={(element) => (this.element = element as HTMLDivElement)}
      >
        <Value
          onClick={() => {
            this.setState({ ...this.state, isOpen: !this.state.isOpen });
          }}
        >
          {this.props.renderValue(this.selectedValue)}
        </Value>
        {this.state.isOpen ? (
          <DataList>
            {this.props.items.map((item) => (
              <DataItem
                key={`${item[this.props.keyField]}`}
                onClick={(evt) => this.onClickItem(item, evt)}
              >
                {this.props.renderItem(item)}
              </DataItem>
            ))}
          </DataList>
        ) : null}
      </DropdownWrapper>
    );
  }
}
