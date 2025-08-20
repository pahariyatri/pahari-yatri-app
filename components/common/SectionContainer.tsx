import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    id?: string
    className?: string
}

export default function SectionContainer({ children, id, className }: Props) {
    return (
        <section id={id} className={`mx-auto max-w-3xl px-4 sm:px-6 my-10 xl:max-w-5xl xl:px-0 ${className || ""}`}>
            {children}
        </section>
    )
}
