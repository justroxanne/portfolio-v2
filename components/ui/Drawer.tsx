import {
  Root,
  Portal,
  Overlay,
  Content,
  Close,
  Trigger,
  Description,
  Title,
} from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./Drawer.module.css";

export const Drawer = ({
  onOpenChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof Root> & {
  className?: string;
}) => {
  return <Root onOpenChange={onOpenChange} {...props} />;
};

export const DrawerContent = forwardRef<
  React.ComponentRef<typeof Content>,
  React.ComponentProps<typeof Content> & {
    animationOrigin?: "right" | "left";
  }
>(function DrawerContent(
  { animationOrigin = "right", className, ...props },
  ref,
) {
  return (
    <Portal>
      <Overlay className={styles.overlay} />
      <Content
        className={cn(styles.content, className)}
        data-animation-origin={animationOrigin}
        ref={ref}
        {...props}
      />
    </Portal>
  );
});

export const DrawerTrigger = Trigger;
export const DrawerDescription = Description;
export const DrawerTitle = Title;
export const DrawerClose = Close;
