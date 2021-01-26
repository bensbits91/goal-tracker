import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { colors } from './definitions';

const mcc = 'color:darkorange;';

export interface ListMenuProps {
    handler: any;
    // mode: string;
}
// export interface ListMenuState {}

class ListMenu extends React.Component<ListMenuProps, {}> {
    constructor(props: ListMenuProps) {
        super(props);
        // this.state = {};
    }

    public render() {

        // const { mode } = this.props;

        const items_list: ICommandBarItemProps[] = [
            {
                key: 'new',
                button_id: 'new',
                text: 'New',
                iconProps: { iconName: 'Add' },
            },
            {
                key: 'import',
                button_id: 'import',
                text: 'Import',
                iconProps: { iconName: 'Upload' },
            },
            {
                key: 'export',
                button_id: 'export',
                text: 'Export',
                iconProps: { iconName: 'Download' },
            },
            {
                key: 'print',
                button_id: 'print',
                text: 'Print',
                iconProps: { iconName: 'Print' },
            },
            {
                key: 'share',
                button_id: 'share',
                text: 'Share',
                iconProps: { iconName: 'Share' },
            },
        ];

        // const items_display: ICommandBarItemProps[] = [
        //     {
        //         key: 'home',
        //         button_id: 'home',
        //         text: 'Home',
        //         iconProps: { iconName: 'Home' },
        //     },
        //     {
        //         key: 'edit',
        //         button_id: 'edit',
        //         text: 'Edit',
        //         iconProps: { iconName: 'PageHeaderEdit' },
        //     },
        //     {
        //         key: 'signatures',
        //         button_id: 'signatures',
        //         text: 'Signatures',
        //         iconProps: { iconName: 'InsertSignatureLine' },
        //     },
        // ];

        // const items_edit: ICommandBarItemProps[] = [
        //     {
        //         key: 'save',
        //         button_id: 'save',
        //         text: 'Save',
        //         iconProps: { iconName: 'SaveAll' },
        //     },
        //     {
        //         key: 'signatures',
        //         button_id: 'signatures',
        //         text: 'Signatures',
        //         iconProps: { iconName: 'InsertSignatureLine' },
        //     },
        //     {
        //         key: 'cancel',
        //         button_id: 'cancel',
        //         text: 'Cancel',
        //         iconProps: { iconName: 'Cancel' },
        //     }
        // ];

        // const items_new: ICommandBarItemProps[] = [
        //     {
        //         key: 'save',
        //         button_id: 'save',
        //         text: 'Save',
        //         iconProps: { iconName: 'SaveAll' },
        //     },
        //     {
        //         key: 'cancel',
        //         button_id: 'cancel',
        //         text: 'Cancel',
        //         iconProps: { iconName: 'Cancel' },
        //     }
        // ];

        const top_menu_farItems: ICommandBarItemProps[] = [
            {
                key: 'size',
                button_id: 'size',
                text: 'Toggle compact mode',
                ariaLabel: 'Toggle compact mode', // This needs an ariaLabel since it's icon-only
                iconOnly: true,
                iconProps: { iconName: 'SizeLegacy' },
            },
            {
                key: 'mode',
                button_id: 'mode',
                text: 'Toggle dark mode',
                ariaLabel: 'Toggle dark mode',
                iconOnly: true,
                iconProps: { iconName: 'ClearNight' },
            },
            {
                key: 'layout',
                button_id: 'layout',
                text: 'Change layout',
                ariaLabel: 'Change layout',
                iconOnly: true,
                iconProps: { iconName: 'Tiles' },
            },
            {
                key: 'info',
                button_id: 'info',
                text: 'Info',
                ariaLabel: 'Info',
                iconOnly: true,
                iconProps: { iconName: 'Info' },
            }
        ];

        const { handler } = this.props;
        const itemStyles = {
            // root: { backgroundColor: colors.black.b3 },
            root: { border: 'none' },
            // rootHovered: { backgroundColor: colors.black.b5 },
            icon: { color: colors.green },
            iconHovered: { color: colors.orange },
            // label: { color: colors.black.b9 },
            // labelHovered: { color: colors.gray.c },
        };

        const styles_commandBar = {
            secondarySet: { paddingTop: 12 }
        };

        const CustomButton: React.FunctionComponent<IButtonProps> = (props: any) => {
            return (
                <CommandBarButton
                    {...props}
                    onClick={e => handler(/* e,  */props.button_id)}
                    styles={{
                        ...props.styles,
                        ...itemStyles
                    }}
                />
            );
        };

        // const styles_commandBar = dark ? { root: { backgroundColor: colors.black.b3 } } : {};

        return (
            <CommandBar
                items={items_list}
                // overflowItems={top_menu_overflowItems}
                // overflowButtonProps={overflowProps}
                farItems={top_menu_farItems}
                // ariaLabel='Use left and right arrow keys to navigate between commands'
                styles={styles_commandBar}
                buttonAs={CustomButton}
            />
        );
    }
}

export default ListMenu;