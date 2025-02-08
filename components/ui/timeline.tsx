"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineProps {
  title?: string
  description?: string
  items: {
    title: string
    content: React.ReactNode
  }[]
}

export const Timeline = ({ title, description, items }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-background md:px-6 h-full overflow-y-auto"
      ref={containerRef}
    >
      {(title || description) && (
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-10">
          {title && (
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-sm md:text-base max-w-sm">
              {description}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-8 md:pt-24 md:gap-8"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-muted border border-border" />
            </div>
            <h3 className="hidden md:block text-base md:pl-20 md:text-xl font-medium text-muted-foreground">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-6 w-full">
              <h3 className="md:hidden block text-base mb-2 text-left font-medium text-muted-foreground">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-muted to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-primary to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
