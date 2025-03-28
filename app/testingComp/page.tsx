"use client";
import { GoogleReviewCard } from "@/presentation/molecules/review-card/review-card";
import { Footer } from "@/presentation/organisms/layout/footer";
import { ReviewCardUser } from "@/presentation/molecules/review-card-user/review-card-user";
import { HoverCardWGC } from "@/presentation/molecules/hover-card-wgc/hover-card-wgc";
import { HoverCardImage } from "@/presentation/molecules/hover-card-image/hover-card-image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/presentation/atoms/button/button";
import { toast } from "sonner";

export default function TestingComp() {
  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 2000));

  return (
    <div className="w-screen h-screen flex-row items-center">
      <div className="flex flex-col items-center justify-center gap-10">
        <GoogleReviewCard />
        <ReviewCardUser />
        <HoverCardWGC
          icon="iconos_2/Vector.png"
          title="Default Title"
          content="Default Content"
          link="#"
        />
        <HoverCardImage
          image="/fotos-prueba/joe.jpg"
          title="Default Image"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam risus nec elit luctus, sed vehicula magna suscipit. Donec et sem a"
          date="2023-01-01"
          tag="DefaultTag"
        />
      </div>
      <Footer />

      <p> revisar documentacion https://sonner.emilkowal.ski/styling </p>
      <p> ir a layout.tsx o buscar el nombre markus para editar el color red </p>
      <p> revisar documentacion https://ui.shadcn.com/docs/components/sonner </p>
      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle>Notificaciones Toast</CardTitle>
          <CardDescription>Diferentes tipos de notificaciones emergentes</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Button variant="outline" onClick={() => toast("Event has been created")}>
            Normal
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
              })
            }
          >
            Con descripción
          </Button>
          <Button variant="outline" onClick={() => toast.success("Event has been created")}>
            Éxito
          </Button>
          <Button variant="outline" onClick={() => toast.info("Event has been created")}>
            Información
          </Button>
          <Button variant="outline" onClick={() => toast.warning("Event has been created")}>
            Advertencia
          </Button>
          <Button variant="outline" onClick={() => toast.error("Event has been created")}>
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(promise, {
                loading: "Cargando...",
                success: (data: any) => {
                  return `${data.name} toast has been added`;
                },
                error: "Error",
              })
            }
          >
            Promesa
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                action: {
                  label: "Deshacer",
                  onClick: () => alert("Acción de deshacer"),
                },
              })
            }
          >
            Con acción
          </Button>
          <Button
            variant="outline"
            onClick={() => toast(<div>A custom toast with default styling</div>)}
          >
            Custom
          </Button>
        </CardContent>
      </Card>
  
    </div>
  );
}
