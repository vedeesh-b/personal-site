import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ImageCarousel: usage in MDX:
// <ImageCarousel images={["/media/img1.png", "/media/img2.png"]} />
function ImageCarousel({ images }: { images: string[] }) {
  return (
    <Carousel className="w-full my-6">
      <CarouselContent>
        {images.map((src, i) => (
          <CarouselItem key={i}>
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-full rounded-lg object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

// Callout: usage in MDX:
// <Callout label="New">Some highlighted info</Callout>
function Callout({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-muted/50 p-4 my-4">
      {label && <Badge variant="secondary">{label}</Badge>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// InfoHover: usage in MDX:
// <InfoHover trigger="Steven Bartlett">Author of Diary of a CEO</InfoHover>
function InfoHover({
  trigger,
  children,
}: {
  trigger: string;
  children: React.ReactNode;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer underline decoration-dotted underline-offset-4">
          {trigger}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 text-sm">{children}</HoverCardContent>
    </HoverCard>
  );
}

// TooltipText: usage in MDX:
// <TooltipText tip="Daily Active Users">DAU</TooltipText>
function TooltipText({
  tip,
  children,
}: {
  tip: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dotted border-foreground/50">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent>{tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mdxComponents: Record<string, React.ComponentType<any>> = {
  // Custom components available in .mdx content
  ImageCarousel,
  Callout,
  InfoHover,
  TooltipText,
  Badge,
  // Override default HTML elements with styled versions
  h1: ({ children }) => (
    <h1 className="scroll-mt-20 text-3xl font-semibold tracking-tight mt-10 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="scroll-mt-20 text-2xl font-semibold tracking-tight mt-8 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="scroll-mt-20 text-xl font-medium mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="leading-7 text-foreground/90 mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-1.5 text-foreground/90">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-1.5 text-foreground/90">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground my-4">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-4 mt-4 overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground transition-colors"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-border" />,
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="rounded-lg w-full my-6 object-cover"
    />
  ),
};
