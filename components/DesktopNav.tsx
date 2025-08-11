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
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import headerNavLinks from "@/data/headerNavLinks"

export function DektopNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {headerNavLinks.map((link) => (
                    <NavigationMenuItem key={link.title}>
                        <Link href={link.href} passHref legacyBehavior>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {link.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
