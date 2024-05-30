import * as React from "react";
import {
    HomeFilled
} from "@fluentui/react-icons";
import { Toolbar, ToolbarButton } from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";

export const ToolbarExp = (props: Partial<ToolbarProps>) => (
  <Toolbar aria-label="Vertical Button" {...props}>
    <ToolbarButton vertical appearance="primary" icon={<HomeFilled />}>
      Home
    </ToolbarButton>
  </Toolbar>
);