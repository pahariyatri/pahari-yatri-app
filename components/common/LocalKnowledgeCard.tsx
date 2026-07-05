import { Info, Sparkles } from "lucide-react";

interface LocalKnowledgeCardProps {
    title: string;
    children: React.ReactNode;
    variant?: "default" | "highlight" | "quote";
    icon?: React.ReactNode;
}

export default function LocalKnowledgeCard({
    title,
    children,
    variant = "default",
    icon
}: LocalKnowledgeCardProps) {
    const variants = {
        default: {
            container: "bg-gradient-to-br from-primary/5 via-transparent to-transparent",
            icon: "text-primary",
            title: "text-foreground"
        },
        highlight: {
            container: "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20",
            icon: "text-primary",
            title: "text-primary"
        },
        quote: {
            container: "bg-muted/30 border-muted",
            icon: "text-muted-foreground",
            title: "text-muted-foreground"
        }
    };

    const style = variants[variant];

    return (
        <div
            className={`relative group overflow-hidden rounded-3xl border ${style.container} p-8 my-12 backdrop-blur-sm`}
            data-rag-chunk="true"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity" aria-hidden="true">
                <Sparkles className={`w-12 h-12 ${style.icon}`} />
            </div>
            <h3 className={`text-2xl font-brandSerif mb-6 flex items-center gap-3 ${style.title}`}>
                <span className={`w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center`}>
                    {icon || <Info className={`w-4 h-4 ${style.icon}`} />}
                </span>
                {title}
            </h3>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                {children}
            </div>
        </div>
    );
}
