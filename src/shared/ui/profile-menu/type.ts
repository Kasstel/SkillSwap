export interface IProfileMenuItem {
  id: string;
  title: string;
  icon: string;
  path?: string;
}

export interface IProfileMenuProps {
  profileMenuItems: IProfileMenuItem[];
  onSelectItem?: (id: string) => void;
}

export interface IProfileMenuItemProps {
  item: IProfileMenuItem;
  isActive: boolean;
  onClickItem?: (is: string) => void;
}
