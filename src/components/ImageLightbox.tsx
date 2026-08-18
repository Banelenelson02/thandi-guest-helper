import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

/**
 * Wraps a set of images so clicking any of them opens a large,
 * swipeable lightbox view. Used for the Pool and Rondavel photo
 * grids (and anywhere else showing a small set of real photos).
 */
export function ImageLightbox({
                                  images,
                                  altPrefix,
                                  children,
                              }: {
    images: string[];
    altPrefix: string;
    children: (openAt: (index: number) => void) => React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [api, setApi] = useState<CarouselApi>();

    function openAt(index: number) {
        setOpen(true);
        setTimeout(() => api?.scrollTo(index), 0);
    }

    return (
        <>
            {children(openAt)}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl w-[92vw] p-0 bg-bg2 border-gold/30 overflow-hidden">
                    <DialogTitle className="sr-only">{altPrefix} photos</DialogTitle>
                    <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
                        <CarouselContent>
                            {images.map((img, i) => (
                                <CarouselItem key={i}>
                                    <div className="w-full h-[70vh] flex items-center justify-center bg-bg4">
                                        <img
                                            src={img}
                                            alt={`${altPrefix} — photo ${i + 1}`}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 bg-bg4/90 border-gold/40 text-gold hover:bg-bg4" />
                        <CarouselNext className="right-4 bg-bg4/90 border-gold/40 text-gold hover:bg-bg4" />
                    </Carousel>
                    <div className="p-4 text-center border-t border-border">
                        <span className="font-display text-lg text-gold">{altPrefix}</span>
                        <span className="text-[0.65rem] text-muted-foreground tracking-[0.15em] uppercase ml-3">
              {images.length} photo{images.length > 1 ? "s" : ""}
            </span>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}