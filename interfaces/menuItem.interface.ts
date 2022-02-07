export interface MenuItemInterface {
    name: string,
    href: string,
    type: 'main' | 'burger',
    priority?: boolean,
    place?: 'left' | 'right'
}

export interface ItemInterface {
    name: string,
    href: string
}