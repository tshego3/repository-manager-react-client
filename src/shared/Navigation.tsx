import * as React from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
// import { ToolbarExp } from './ToolbarExp';
import { TableExp } from './TableExp';

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "100vh",
  },

  content: {
    margin: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    flex: "1",

    gridRowGap: tokens.spacingVerticalXXL,
  },
});

type DrawerType = Required<DrawerProps>["type"];

export const Navigation = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>("inline");

  const onMediaQueryChange = React.useCallback(
    ({ matches }: { matches: boolean }) => setType(matches ? "overlay" : "inline"),
    [setType]
  );

  React.useEffect(() => {
    const match = window.matchMedia("(max-width: 720px)");

    if (match.matches) {
      setType("overlay");
    }

    match.addEventListener("change", onMediaQueryChange);

    return () => match.removeEventListener("change", onMediaQueryChange);
  }, [onMediaQueryChange]);

  return (
    <div className={styles.root}>
      <Drawer
        type={type}
        separator
        position="start"
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Responsive Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>

      <div className={styles.content}>
        <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          Toggle
        </Button>

        {/* <ToolbarExp /> */}

        <TableExp />
      </div>
    </div>
  );
};
