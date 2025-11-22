"use client"

import * as React from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import headerNavLinks from "@/data/headerNavLinks"

export function DesktopNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {headerNavLinks.map((link) => (
                    <NavigationMenuItem key={link.title}>
                        <Link
                            href={link.href}
                            className={navigationMenuTriggerStyle()}
                        >
                            {link.title}
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
