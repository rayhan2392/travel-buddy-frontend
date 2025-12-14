import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TypographyProps {
    children: ReactNode;
    className?: string;
}

export function Display({ children, className }: TypographyProps) {
    return <h1 className={cn("text-display", className)}>{children}</h1>;
}

export function H1({ children, className }: TypographyProps) {
    return <h1 className={cn("text-h1", className)}>{children}</h1>;
}

export function H2({ children, className }: TypographyProps) {
    return <h2 className={cn("text-h2", className)}>{children}</h2>;
}

export function H3({ children, className }: TypographyProps) {
    return <h3 className={cn("text-h3", className)}>{children}</h3>;
}

export function H4({ children, className }: TypographyProps) {
    return <h4 className={cn("text-h4", className)}>{children}</h4>;
}

export function H5({ children, className }: TypographyProps) {
    return <h5 className={cn("text-h5", className)}>{children}</h5>;
}

export function H6({ children, className }: TypographyProps) {
    return <h6 className={cn("text-h6", className)}>{children}</h6>;
}

export function BodyLarge({ children, className }: TypographyProps) {
    return <p className={cn("text-body-lg", className)}>{children}</p>;
}

export function Body({ children, className }: TypographyProps) {
    return <p className={cn("text-body", className)}>{children}</p>;
}

export function BodySmall({ children, className }: TypographyProps) {
    return <p className={cn("text-body-sm", className)}>{children}</p>;
}

export function Caption({ children, className }: TypographyProps) {
    return <p className={cn("text-caption", className)}>{children}</p>;
}

export function GradientText({ children, className }: TypographyProps) {
    return <span className={cn("text-gradient-primary", className)}>{children}</span>;
}
