"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import headerNavLinks from "@/data/headerNavLinks"

export function DektopNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {headerNavLinks.map((link) => (
                    <NavigationMenuItem key={link.title}>
                        {link.submenu ? (
                            <>
                                <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    {link.title == 'Packages' ? (
                                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                        href="/"
                                                    >
                                                        <div className="mb-2 mt-4 text-lg font-medium">
                                                            Pahari Yatri 
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                        Embark on a Spiritual Journey to Shrikhand, Manimahesh, and Kinnaur Kailash.
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            {link.submenu.map((sublink) => (
                                                <ListItem
                                                    key={sublink.title}
                                                    title={sublink.title}
                                                    href={sublink.href}
                                                >
                                                    {sublink.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    ) : (
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {link.submenu.map((sublink) => (
                                                <ListItem
                                                    key={sublink.title}
                                                    title={sublink.title}
                                                    href={sublink.href}
                                                >
                                                    {sublink.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    )}


                                </NavigationMenuContent>
                            </>
                        ) : (
                            <Link href={link.href} passHref legacyBehavior>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {link.title}
                                </NavigationMenuLink>
                            </Link>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
